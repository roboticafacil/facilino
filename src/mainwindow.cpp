#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "aboutdialog.h"

#include <QApplication>
#include <QDebug>
#include <QDir>
#include <QFile>
#include <QFileDialog>
#include <QFontDatabase>
#include <QMessageBox>
#include <QKeyEvent>
#include <QtSerialPort/QSerialPortInfo>
#include <QScrollBar>
#include <QSettings>
#include <QSizePolicy>
#include <QStandardPaths>
#include <QThread>
#include <QTimer>
#include <QWebEnginePage>
#include <QEventLoop>
#include <QUrlQuery>
#include <QSignalMapper>
#include <QtWebChannel/QWebChannel>
#include <QUndoStack>
#include <QDomDocument>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    this->alert=false;
    signalMapper = new QSignalMapper(this);
    ui->setupUi(this);
    // Align last toolbar action to the right
    QWidget *empty = new QWidget(this);
    empty->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Preferred);
    ui->mainToolBar->insertWidget(ui->actionMonitor, empty);

    // Align last action to the right in the monitor toolbar
    QWidget *emptyMonitor = new QWidget(this);
    emptyMonitor->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Preferred);
    ui->monitorToolBar->insertWidget(ui->actionMonitor, emptyMonitor);
    // Hide monitor toolbar
    ui->monitorToolBar->setVisible(false);
    ui->licenseLabel->setText("Checking license...");
    ui->license->setVisible(false);


    // Hide graphs widget
    ui->graphsWidget->setVisible(false);


    // Set monospaced font in the monitor
    const QFont fixedFont = QFontDatabase::systemFont(QFontDatabase::FixedFont);
    ui->consoleText->setFont(fixedFont);

    // Set environment
    settings = new SettingsStore(CONFIG_INI);
    setArduinoBoard();
    xmlFileName = "";
    this->myblocks=false; //The standard Facilino programming view
    serial = NULL;
    //QWebSettings::globalSettings()->setAttribute(QWebSettings::LocalContentCanAccessRemoteUrls, true);
    //ui->webView->settings()->setAttribute(QWebSettings::LocalContentCanAccessRemoteUrls,true);
    float zoomScale = settings->zoomScale();
    ui->webView->setZoomFactor(zoomScale);

    initCategories();
    //actionLicense();

    // Hide messages
    actionCloseMessages();
    serialPortClose();

    actionInjectWebHelper();
    // Load blockly index

    loadBlockly();
    webHelper->setSourceChangeEnable(true);
    documentHistory.clear();
    documentHistory.setUndoLimit(0);  //No limit



    // Set timer to update list of available ports
    updateSerialPorts();
    QTimer *timer = new QTimer(this);
    connect(timer, SIGNAL(timeout()), this, SLOT(updateSerialPorts()));
    timer->start(5000);
    licenseTimer = new QTimer(this);
    connect(licenseTimer, SIGNAL(timeout()), this, SLOT(checkLicense()));
    licenseTimer->start(1000);  //Initially waits 1sec for checking the license
    //checkLicense();

    //Hide MyBlocks toolbar
    this->switchToMyBlocks(false);

    ui->consoleText->document()->setMaximumBlockCount(100);
    //ui->messagesWidget->show();
    // Show/hide icon labels in the menu bar
    iconLabels();

    // Set process
    process = new QProcess();
    process->setProcessChannelMode(QProcess::MergedChannels);
    connect(process,
            SIGNAL(started()),
            this,
            SLOT(onProcessStarted()));
    connect(process,
            SIGNAL(readyReadStandardOutput()),
            this,
            SLOT(onProcessOutputUpdated()));
    connect(process,
            SIGNAL(finished(int)),
            this,
            SLOT(onProcessFinished(int)));

    // Show opened file name in status bar
    connect(statusBar(),
            SIGNAL(messageChanged(QString)),
            this,
            SLOT(onStatusMessageChanged(QString)));
    ui->actionUndo->setEnabled(false);
    ui->actionRedo->setEnabled(false);
    connect(&documentHistory,SIGNAL(canUndoChanged(bool)),this,SLOT(onUndoChanged(bool)));
    connect(&documentHistory,SIGNAL(canRedoChanged(bool)),this,SLOT(onRedoChanged(bool)));
    // Filter events to capture backspace key
    ui->webView->installEventFilter(this);
}

MainWindow::~MainWindow() {
    delete webHelper;
    delete serial;
    delete settings;
    delete process;
    delete ui;
}

void MainWindow::arduinoExec(const QString &action) {
    QStringList arguments;

    // Check if temp path exists
    QDir dir(settings->tmpDirName());
    if (dir.exists() == false) {
        dir.mkdir(settings->tmpDirName());
    }

    // Check if tmp file exists
    QFile tmpFile(settings->tmpFileName());
    if (tmpFile.exists()) {
        tmpFile.remove();
    }
    tmpFile.open(QIODevice::WriteOnly);

    // Read code
    QString codeString = evaluateJavaScript("Blockly.Arduino.workspaceToCode();");

    // Write code to tmp file
    tmpFile.write(codeString.toLocal8Bit());
    tmpFile.close();

    // Verify code
    arguments << action;
    // Board parameter
    if (ui->boardBox->count() > 0) {
        arguments << "--board" << ui->boardBox->currentText();
    }
    // Port parameter
    if (ui->serialPortBox->count() > 0) {
        arguments << "--port" << ui->serialPortBox->currentText();
    }
    //arguments << "--pref editor.external=false ";
    arguments << settings->tmpFileName();
    process->start(settings->arduinoIdePath(), arguments);

    // Show messages
    ui->messagesWidget->show();
}

void MainWindow::actionAbout() {
    // Open About dialog
    AboutDialog aboutDialog(this);
    aboutDialog.exec();
}

void MainWindow::actionCode() {
    // Show/hide code
    QString jsLanguage = QString("toogleCode();");
	evaluateJavaScript(jsLanguage);
}

void MainWindow::actionDoc() {
    // Show/hide code
    QString jsLanguage = QString("toogleDoc();");
	evaluateJavaScript(jsLanguage);
}

void MainWindow::actionExamples() {
    // Check whether source was changed
    if (checkSourceChanged() == QMessageBox::Cancel) {
        return;
    }

    // Open an example from the examples folder
    actionOpenInclude(tr("Examples"), true, QDir::currentPath()+settings->examplesPath());
    // Void file name to prevent overwriting the original file by mistake
    setXmlFileName("");
}

void MainWindow::actionExportSketch() {
    // Export workspace as Arduino Sketch
    QString inoFileName;

    // Open file dialog
    QFileDialog fileDialog(this, tr("Save"));
    fileDialog.setFileMode(QFileDialog::AnyFile);
    fileDialog.setNameFilter(QString("Sketches %1").arg("(*.ino)"));
    fileDialog.setDefaultSuffix("ino");
    fileDialog.setLabelText(QFileDialog::Accept, tr("Export"));
    if (!fileDialog.exec()) return; // Return if cancelled
    QStringList selectedFiles = fileDialog.selectedFiles();
    // Return if no file to open
    if (selectedFiles.count() < 1) return;
    inoFileName = selectedFiles.at(0);

    int result = saveSketch(inoFileName);

    if (result == 0) {
        // Display error message
        QMessageBox msgBox(this);
        msgBox.setText(QString(tr("Couldn't open file to save content: %1.")).arg(inoFileName));
        msgBox.exec();
        return;
    }

    // Feedback
    QString message(tr("Done exporting: %1.").arg(inoFileName));
    statusBar()->showMessage(message, 2000);
}

void MainWindow::onSourceChanged() {
    if (!webHelper->isSourceChangeEnabled())
        return;
    if (sourceChanging) {
        sourceChanging = false;
        return;
    }
    QString code("Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));");
    QWebEnginePage *page = ui->webView->page();
    page->runJavaScript(code, [&](const QVariant var){
        QString xml = var.toString();
        if (documentHistory.count()>0)
        {
            if (QString::compare(lastDocument,xml)==0) return;
            //if (QString::compare(QString("<xml xmlns=\"http://www.w3.org/1999/xhtml\"></xml>"),xml)==0) return;
            if (documentHistory.index()==documentHistoryStep && (QString::compare(documentHistory.text(documentHistory.index()-1),xml)==0)){ return;}
        }
        QUndoCommand *command = new QUndoCommand(xml);
        documentHistory.push(command);
        lastDocument=xml;
        //ui->licenseLabel->setText(QString::number(documentHistory.index())+" "+QString::number(documentHistory.count()));
        //ui->textBrowser->append(QString::number(documentHistory.index())+" "+escapeCharacters(xml));
    });
}

void MainWindow::actionDocumentUndo() {
    if (documentHistory.canUndo()&&documentHistory.index()>1)
    {
        documentHistory.undo();
        documentHistoryStep=documentHistory.index();
        //ui->licenseLabel->setText(QString::number(documentHistory.index())+" "+QString::number(documentHistory.count()));
        //ui->textBrowser->append(QString::number(documentHistory.index())+" "+escapeCharacters(documentHistory.text(documentHistory.index()-1)));
        setXml(documentHistory.text(documentHistory.index()-1), true);
    }
    else
        ui->actionUndo->setEnabled(false);
}
void MainWindow::actionDocumentRedo() {
    if (documentHistory.canRedo()&&(documentHistory.index()<documentHistory.count()))
    {
        documentHistory.redo();
        documentHistoryStep=documentHistory.index();
        //ui->licenseLabel->setText(QString::number(documentHistory.index())+" "+QString::number(documentHistory.count()));
        //ui->textBrowser->append(QString::number(documentHistory.index())+" "+escapeCharacters(documentHistory.text(documentHistory.index()-1)));
        setXml(documentHistory.text(documentHistory.index()-1), true);
    }
    else
        ui->actionRedo->setEnabled(false);
}

void MainWindow::onUndoChanged(bool canUndo)
{
    ui->actionUndo->setEnabled(canUndo);
}

void MainWindow::onRedoChanged(bool canRedo)
{
    ui->actionRedo->setEnabled(canRedo);
}

void MainWindow::documentHistoryReset() {
    // Clear history of changes
    documentHistory.clear();
}

void MainWindow::actionGraph() {
    // Show/hide graph
    if (ui->consoleText->isVisible() == true) {
        // Show graph
        ui->consoleText->setVisible(false);
        ui->graphsWidget->setVisible(true);
        ui->actionGraph->setChecked(true);
    } else {
        // Hide graph
        ui->consoleText->setVisible(true);
        ui->graphsWidget->setVisible(false);
        ui->actionGraph->setChecked(false);
    }
}

void MainWindow::actionIconLabels() {
    // Change icon labels mode
    bool showIconLabels = settings->iconLabels();
    showIconLabels = !showIconLabels;
    // Update settings
    settings->setIconLabels(showIconLabels);
    // Update display
    iconLabels();
}

void MainWindow::actionInclude() {
    // Include blockly file to the current workspace
    actionOpenInclude(tr("Include file"), false);
}

void MainWindow::actionInsertLanguage() {
    // Set language in Roboblocks
    QString jsLanguage = QString("var roboblocksLanguage = '%1';").
            arg(settings->defaultLanguage());
	ui->webView->page()->runJavaScript(jsLanguage);
}

void MainWindow::actionLicense() {
    // Set license
    QString jsLanguage = QString("window.webHelper.license = '%1';").
            arg(settings->license());
    ui->webView->page()->runJavaScript(jsLanguage);
}

void MainWindow::actionMonitor() {
    // Open close monitor
    if (ui->widgetConsole->isVisible()) {
        serialPortClose();
        ui->actionMonitor->setChecked(false);
        // Show main toolbar, hide monitor toolbar
        ui->mainToolBar->setVisible(true);
        ui->monitorToolBar->setVisible(false);
    } else {
        serialPortOpen();
        ui->consoleEdit->setFocus();
        ui->actionMonitor->setChecked(true);
        // Hide main toolbar, show monitor toolbar
        ui->mainToolBar->setVisible(false);
        ui->monitorToolBar->setVisible(true);
    }
}

void MainWindow::actionMonitorSend() {
    // Send what's available in the console line edit
    if (serial == NULL) return;

    QString data = ui->consoleEdit->text();
    if (data.isEmpty()) return; // Nothing to send

    // Send data
    qint64 result = serial->write(data.toLocal8Bit());
    if (result != -1) {
        // If data was sent successfully, clear line edit
        ui->consoleText->insertHtml("&rarr;&nbsp;");
        ui->consoleText->insertPlainText(data + "\n");
        ui->consoleEdit->clear();
    }
}

void MainWindow::actionMessages() {
    // Open/hide messages window
    if (ui->messagesWidget->isVisible()) {
        actionCloseMessages();
    } else {
        actionOpenMessages();
    }
}

void MainWindow::actionNew() {
    // Check whether source was changed
    if (checkSourceChanged() == QMessageBox::Cancel) {
        return;
    }
    // Unset file name
    setXmlFileName("");
    // Reset source change status
    webHelper->resetSourceChanged();
    // Disable save as
    ui->actionSave_as->setEnabled(false);
    // Clear workspace
    if (!this->myblocks)
      evaluateJavaScript("resetWorkspace();");
    else
      evaluateJavaScript("BlockFactory.showStarterBlock();");
    // Reset history
    documentHistoryReset();
}

void MainWindow::actionCloseMessages() {
    // Hide messages window
    ui->messagesWidget->hide();
    ui->actionMessages->setChecked(false);
}

void MainWindow::actionOpen() {
    // Check whether source was changed
    if (checkSourceChanged() == QMessageBox::Cancel) {
        return;
    }
    // Open file
    QString directory = QStandardPaths::locate(
                QStandardPaths::DocumentsLocation,
                "",QStandardPaths::LocateDirectory);
    actionOpenInclude(tr("Open file"), true, directory);

    // Reset source changed and history
    documentHistoryReset();
    webHelper->resetSourceChanged();
}

void MainWindow::actionOpenInclude(const QString &title,
                                   bool clear,
                                   const QString &directory) {
    // Open file dialog
    QString extension;
    if (!myblocks)
        extension = QString("bly");
    else
        extension = QString("bli");
    QFileDialog fileDialog(this, title);
    fileDialog.setFileMode(QFileDialog::AnyFile);
    fileDialog.setNameFilter(QString(tr("Blockly Files %1")).
                             arg("(*."+extension+")"));
    fileDialog.setDefaultSuffix(extension);
    if (!directory.isEmpty()) fileDialog.setDirectory(directory);
    if (!fileDialog.exec()) return; // Return if cancelled
    QStringList selectedFiles = fileDialog.selectedFiles();
    // Return if no file to open
    if (selectedFiles.count() < 1) return;
    QString xmlFileName = selectedFiles.at(0);

    // Open file
    openFileToWorkspace(xmlFileName, clear);
}

void MainWindow::openFileToWorkspace(const QString &xmlFileName, bool clear) {
    // Open file
    QFile xmlFile(xmlFileName);
    if (!xmlFile.open(QIODevice::ReadOnly)) {
        // Display error message
        QMessageBox msgBox(this);
        msgBox.setText(QString(tr("Couldn't open file to read content: %1.")
                               ).arg(xmlFileName));
        msgBox.exec();
        return;
    }
    // Read content
    QByteArray content = xmlFile.readAll();
    QString xml(content);
    xmlFile.close();
    // Set XML to Workspace
    setXml(xml, clear);
    // Set XML file name
    if (clear) {
        setXmlFileName(xmlFileName);
    }
}

void MainWindow::actionOpenMessages() {
    // Open messages
    ui->messagesWidget->show();
    ui->actionMessages->setChecked(true);
}

void MainWindow::actionQuit() {
    // Check whether source was changed
    if (checkSourceChanged() == QMessageBox::Cancel) {
        return;
    }
    // Quit
    close();
}

void MainWindow::actionUpload() {
    // Upload sketch
    arduinoExec("--upload");
}

void MainWindow::actionVerify() {
    // Build sketch
    arduinoExec("--verify");
}

void MainWindow::actionSaveAndSaveAs(bool askFileName,
                                     const QString &directory) {
    // Save XML file
    QString xmlFileName;
    QString extension="";
    if (!myblocks)
        extension=QString("bly");
    else
        extension=QString("bli");

    if (this->xmlFileName.isEmpty() || askFileName == true) {
        // Open file dialog
        QFileDialog fileDialog(this, tr("Save"));
        fileDialog.setFileMode(QFileDialog::AnyFile);
        fileDialog.setNameFilter(QString("Facilino Files %1").arg("(*."+extension+")"));
        fileDialog.setDefaultSuffix(extension);
        fileDialog.setLabelText(QFileDialog::Accept, tr("Save"));
        if (!directory.isEmpty()) fileDialog.setDirectory(directory);
        if (!fileDialog.exec()) return; // Return if cancelled
        QStringList selectedFiles = fileDialog.selectedFiles();
        // Return if no file to open
        if (selectedFiles.count() < 1) return;
        xmlFileName = selectedFiles.at(0);
    } else {
        xmlFileName = this->xmlFileName;
    }
    int result = saveXml(xmlFileName);

    if (result == 0) {
        // Display error message
        QMessageBox msgBox(this);
        msgBox.setText(QString(tr("Couldn't open file to save content: %1.")
                               ).arg(xmlFileName));
        msgBox.exec();
        return;
    }
    // Set file name
    setXmlFileName(xmlFileName);
    // Feedback
    statusBar()->showMessage(tr("Done saving."), 2000);
    // Reset status changed status
    webHelper->resetSourceChanged();
}

void MainWindow::actionSave() {
    // Save XML file
    QString directory = QStandardPaths::locate(
                QStandardPaths::DocumentsLocation,
                "",
                QStandardPaths::LocateDirectory);
    actionSaveAndSaveAs(false, directory);
}

void MainWindow::actionSaveAs() {
    // Save XML file with other name
    QString directory = QStandardPaths::locate(
                QStandardPaths::DocumentsLocation,
                "",
                QStandardPaths::LocateDirectory);
    actionSaveAndSaveAs(true, directory);
}

void MainWindow::actionSettings() {
    // Open preferences dialog
    QString htmlIndex = settings->htmlIndex();
    QString defaultLanguage = settings->defaultLanguage();
    QString license = settings->license();
    // Supported list of languages
    QStringList languageList;
    languageList << "en-GB" << "es-ES" << "ca-ES" << "gl-ES" << "eu-ES" << "de-DE" << "fr-FR" << "it-IT" << "pt-PT" << "pl-PL" << "ru-RU";
    SettingsDialog settingsDialog(settings, languageList, this);
    int result = settingsDialog.exec();
    if (result && settingsDialog.changed()) {
        // Reload blockly page
        if (htmlIndex != settings->htmlIndex()
                || defaultLanguage != settings->defaultLanguage() || license!=settings->license()) {
            QMessageBox::StandardButton reply;
            xmlLoadContent = getXml();
            loadBlockly();
            ui->licenseLabel->setText(tr("Checking license..."));
            ui->license->setVisible(false);
            licenseTimer->start(1000);
            QMessageBox msg;
            msg.setText(tr("Changes successfully applied!"));
            msg.exec();
            setXml(xmlLoadContent,true);

            /*setXmlFileName("");
            // Disable save as
            ui->actionSave_as->setEnabled(false);
            // Reset source change status
            webHelper->resetSourceChanged();
            reply = QMessageBox::question(this, tr("Settings changed!"), tr("Are you sure?"),QMessageBox::Yes|QMessageBox::No);
            // Refresh workspace with new language
            if (reply == QMessageBox::Yes)
            {

            }*/
            }
        }
}

void MainWindow::actionZoomIn() {
    // Zoom in the web view
    ui->webView->zoomIn();
}

void MainWindow::actionZoomOut() {
    // Zoom out the web view
    ui->webView->zoomOut();
}

QString MainWindow::getXml() {
    // Get XML
    QString xml = evaluateJavaScript(QString("try{Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));}catch(e){alert('Fire!');}"));
    return xml;
}

QString MainWindow::getCode() {
    // Get code
    QString xml = evaluateJavaScript(QString("Blockly.Arduino.workspaceToCode();"));
    return xml;
}

void MainWindow::setXml(const QString &xml, bool clear) {
    // Set XML
    QString escapedXml(escapeCharacters(xml));
    QString js;
    if (!myblocks)
    {
        js = QString("var data = '%1'; "
                              "var xml = Blockly.Xml.textToDom(data);"
                              "Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(),xml);"
                               "").arg(escapedXml);
        if (clear) {
            js.prepend("Blockly.mainWorkspace.clear();");
        }
    }
    else
    {
        js = QString(        "var xml = Blockly.Xml.textToDom('%1');"
                             "Blockly.Xml.domToWorkspace(xml, BlockFactory.mainWorkspace);"
                             "BlockFactory.mainWorkspace.clearUndo();").arg(escapedXml.remove(QRegExp("[\\n\\t\\r]")));
        if (clear) {
            js.prepend("BlockFactory.mainWorkspace.clear();");
        }
    }

    evaluateJavaScript(js);
    //documentHistoryStep=-1;
}

bool MainWindow::listIsEqual(const QStringList &listOne,
                             const QStringList &listTwo) {
    // Compare two string lists. Return true if equal.
    if (listOne.count() != listTwo.count()) return false;
    for (int i = 0; i < listOne.count(); i++) {
        if (listOne[i] != listTwo[i]) return false;
    }
    return true;
}

void MainWindow::loadBlockly() {
    // Load blockly index
    connect(ui->webView->page(),
            SIGNAL(loadFinished(bool)),
            this,
            SLOT(actionInsertLanguage()));
    connect(ui->webView->page(),
            SIGNAL(loadFinished(bool)),
            this,
            SLOT(actionLicense()));

    QUrl url = QUrl::fromLocalFile(settings->htmlIndex());
    QUrlQuery query(url);
    query.addQueryItem("language",settings->defaultLanguage());
    query.addQueryItem("processor","arduino-nano");
    url.setQuery(query);
    ui->webView->load(url);
    //checkLicense();  //First call to activate the license from the beginning
    // Reset history
    sourceChanging = false;
    documentHistoryStep = -1;
}

void MainWindow::setArduinoBoard() {
    // Select combo box value according to stored value in settings
    ui->boardBox->setCurrentText(settings->arduinoBoard());
}

void MainWindow::onBoardChanged() {
    // Board changed, update settings
    settings->setArduinoBoard(ui->boardBox->currentText());
}

void MainWindow::onLoadFinished(bool finished) {
    // Load content using xmlLoadContent variable
    // This is triggered by settings dialog
    if (!finished || xmlLoadContent.isEmpty()) return;
    setXml(xmlLoadContent);
    ui->webView->disconnect(SIGNAL(loadFinished(bool)));
    xmlLoadContent = "";
}

void MainWindow::onProcessFinished(int exitCode) {
    ui->textBrowser->append(tr("Finished."));
}

void MainWindow::onProcessOutputUpdated() {
    ui->textBrowser->append(QString(process->readAllStandardOutput()));
}

void MainWindow::onProcessStarted() {
    ui->textBrowser->clear();
    ui->textBrowser->append(tr("Building..."));
}

void MainWindow::onStatusMessageChanged(const QString &message) {
    // This was used to display the file name when no other message was shown
}

void MainWindow::setXmlFileName(const QString &fileName) {
    // Set file name and related widgets: Status bar message and Save as menu
    this->xmlFileName = fileName;
    if (fileName.isNull() || fileName.isEmpty()) {
        // Enable save as
        ui->actionSave_as->setEnabled(false);
        // Display file name in window title
        setWindowTitle("Facilino");
    } else {
        // Enable save as
        ui->actionSave_as->setEnabled(true);
        // Display file name in window title
        setWindowTitle("Facilino - " + this->xmlFileName);
    }
}

void MainWindow::serialPortClose() {
    // Close serial connection
    ui->webView->show();
    ui->widgetConsole->hide();
    ui->consoleText->clear();

    if (serial == NULL) return;

    serial->close();
    serial->disconnect(serial, SIGNAL(readyRead()), this, SLOT(readSerial()));
}

void MainWindow::serialPortOpen() {
    // Open serial connection
    ui->webView->hide();
    ui->widgetConsole->show();

    // No available connections, nothing to do
    if (ui->serialPortBox->currentText() == "") return;

    if (serial == NULL) {
        // Create serial connection
        serial = new QSerialPort(this);
    } else if (serial->isOpen()) {
        serial->close();
    }

    // Set default connection parameters
    serial->setPortName(ui->serialPortBox->currentText());
    serial->setBaudRate(QSerialPort::Baud9600);
    serial->setDataBits(QSerialPort::Data8);
    serial->setParity(QSerialPort::NoParity);
    serial->setStopBits(QSerialPort::OneStop);

    // Connect
    if (serial->open(QIODevice::ReadWrite)) {
        // Execute readSerial if data is available
        connect(serial, SIGNAL(readyRead()), this, SLOT(readSerial()));
    }
}

void MainWindow::iconLabels() {
    // Show/hide icon labels
    if (settings->iconLabels() == true) {
        ui->mainToolBar->setToolButtonStyle(Qt::ToolButtonTextUnderIcon);
        ui->actionShow_hide_icon_labels->setChecked(true);
    } else {
        ui->mainToolBar->setToolButtonStyle(Qt::ToolButtonIconOnly);
        ui->actionShow_hide_icon_labels->setChecked(false);
    }
}

bool MainWindow::isCommaSeparatedNumbers(const QString data) {
    // Is data of format number,number,number?

    if (data.indexOf(",") < 0) return false; // Nope, at least two values needed

    // Separate values
    QStringList strings = dataString.split(",");
    bool allNumbers = true;
    // Check values
    foreach (QString s, strings) {
        bool ok;
        s.toLong(&ok);
        if (ok == false) {
            // This value is not an int
            allNumbers = false;
            break;
        }
    }

    return allNumbers;
}

void MainWindow::readSerial() {
    // Read serial port data and display it in the console
    QByteArray data = serial->readAll();

    // Read serial port data and display it in the console
    for (int i = 0; i < data.size(); i++) {
        int c = data.at(i);
        if (c > 13) {
            dataString.append(data.at(i));
        } else if (c == 13) {
            bool ok;
            bool display = false;
            ui->consoleText->insertPlainText(dataString + "\n");
            int value = dataString.toInt(&ok);

            // Check if values are all numbers
            QList<long> longList;

            if (isCommaSeparatedNumbers(dataString)) {
                // More than one value
                display = true;
                QStringList strings = dataString.split(",");
                foreach (QString s, strings) {
                    long value = s.toLong();
                    longList.append(value);
                }
            } else if (ok) {
                // One value
                display = true;
                longList.append(value);
            }

            // Add new graphs if needed
            if (display) {
                int diff = longList.count() - graphList.count();
                if (diff > 0 && graphList.count() <= 10) {
                    for (int n = 0; n < diff; n++) {
                        GraphWidget *gwidget = new GraphWidget();
                        gwidget->setSizePolicy(QSizePolicy::Expanding,
                                               QSizePolicy::Expanding);
                        ui->graphLayout->addWidget(gwidget);
                        graphList.append(gwidget);
                        // No more than 10 graphics
                        if (graphList.count() == 10) break;
                    }
                }

                // Display numbers
                for (int n = 0; n < graphList.count(); n++) {
                    GraphWidget *graphWidget = graphList.at(n);
                    long value = 0;
                    if (longList.count() > n) {
                        value = longList.at(n);
                    }
                    graphWidget->append(value);
                }
            }

            // Reset string
            dataString.clear();
        }
    }

    // Move scroll to the bottom
    QScrollBar *bar = ui->consoleText->verticalScrollBar();
    bar->setValue(bar->maximum());
}

QStringList MainWindow::portList() {
    // Return list of serial ports
    QStringList serialPorts;

    // Get list
    foreach (const QSerialPortInfo &info, QSerialPortInfo::availablePorts()) {
        // Add to the list
        QString portName = info.portName();
#ifdef Q_OS_LINUX
        portName.insert(0, "/dev/");
#endif
#ifdef Q_OS_OSX
        portName.insert(0, "/dev/tty.");
#endif
        serialPorts.append(portName);
    }

    return serialPorts;
}

int MainWindow::saveXml(const QString &xmlFilePath) {
    // Save XML file

    // Get XML
    QVariant xml = getXml();
    // Save XML to file
    QFile xmlFile(xmlFilePath);
    if (!xmlFile.open(QIODevice::WriteOnly)) {
        return 0;
    }
    if (xmlFile.write(xml.toByteArray()) == -1) {
        return 0;
    }
    xmlFile.close();

    // Set file name
    if (this->xmlFileName.isEmpty()) {
        this->xmlFileName = xmlFileName;
    }

    return 1;
}

int MainWindow::saveSketch(const QString &inoFilePath) {
    // Save sketch

    // Get code
    QVariant code = getCode();

    // Save code
    QFile inoFile(inoFilePath);
    if (!inoFile.open(QIODevice::WriteOnly)) {
        return 0;
    }
    if (inoFile.write(code.toByteArray()) == -1) {
        return 0;
    }
    inoFile.close();

    return 1;
}

void MainWindow::unhide() {
    this->show();
}

void MainWindow::updateSerialPorts() {
    // Update the list of available serial ports in the combo box
    QStringList ports = portList();
    if (!listIsEqual(serialPortList, ports)) {
        QString currentPort = ui->serialPortBox->currentText();
        ui->serialPortBox->clear();
        ui->serialPortBox->insertItems(0, ports);
        if (ports.indexOf(currentPort) != -1) {
            ui->serialPortBox->setCurrentText(currentPort);
        }
        serialPortList = ports;
    }
}

void MainWindow::checkLicense() {
    if (!myblocks)
    {
        if (QString::compare(settings->license(),QString(""))!=0)
        {
            QString jsLanguage = QString("checkLicense('%1');").arg(settings->license());
            QString activeLicense= evaluateJavaScript(jsLanguage);
            if ((QString::compare(activeLicense,settings->license())==0))
            {
                ui->licenseLabel->setText(tr("License Active"));
                ui->license->setVisible(true);
            }
            else
            {
                ui->licenseLabel->setText(tr("Demo version"));
                ui->license->setVisible(false);
            }
        }
        else
        {
            ui->licenseLabel->setText(tr("Demo version"));
            ui->license->setVisible(false);
        }
        if (licenseTimer->interval()<300000)
        {
            licenseTimer->start(300000);
        }
    }
}

QString MainWindow::evaluateJavaScript(const QString code) {
    // Execute JavaScript code and return
    QEventLoop loop;
    QVariant returnValue = "";
    QWebEnginePage *page = ui->webView->page();
    page->runJavaScript(code, [&](const QVariant var){returnValue = var;
        loop.quit();
    });
    loop.exec();
    return returnValue.toString();
}															 
QString MainWindow::escapeCharacters(const QString& string)
{
    QString rValue = QString(string);
    // Assign \\ to backSlash
    QString backSlash = QString(QChar(0x5c)).append(QChar(0x5c));
    /* Replace \ with \\ */
    rValue = rValue.replace('\\', backSlash);
    // Assing \" to quote.
    QString quote = QString(QChar(0x5c)).append(QChar(0x22));
    // Replace " with \"
    rValue = rValue.replace('"', quote);
    return rValue;
}

void MainWindow::actionInjectWebHelper() {
    // Inject the webHelper object in the webview. This is used in index.html,
    // where a call is made back to webHelper.sourceChanged() function.
    webHelper = new JsWebHelpers();
    webHelper->setLicense(settings->license());
    channel = new QWebChannel(ui->webView->page());
    ui->webView->page()->setWebChannel(channel);
    connect(webHelper, SIGNAL(changed()), this, SLOT(onSourceChanged()));
    channel->registerObject(QString("webHelper"), webHelper);
}

int MainWindow::checkSourceChanged() {
    // Check whether source has changed
    if (webHelper->sourceChanges() > 1) {
        // Does the user want to save the changes?
        QMessageBox msgBox(this);
        msgBox.setText(QString(tr("There could be unsaved changes that could be "
                                  "lost. Do you want to save them before "
                                  "continuing?")));
        msgBox.setStandardButtons(QMessageBox::Save | QMessageBox::Discard |
                                  QMessageBox::Cancel);
        int result = msgBox.exec();
        if (result == QMessageBox::Save) {
            // Yes, save changes
            actionSave();
        }
        return result;
    }
    return -1;
}

void MainWindow::closeEvent(QCloseEvent *event) {
    // Check whether source was changed
    if (checkSourceChanged() == QMessageBox::Cancel) {
        event->ignore();
    } else {
        // Save zoom state
        settings->setZoomScale(ui->webView->zoomFactor());
    }
}

bool MainWindow::eventFilter(QObject *obj, QEvent *event) {
    if (obj == ui->webView) {
        if (event->type() == QEvent::KeyPress) {
            // Backspace filter to prevent a blank page.
            // Based on this code: http://ynonperek.com/qt-event-filters.html
            //
            // Specially in Mac OS X, the backspace key generates a page back event. In
            // order to disable that action, this event filter captures the key presses
            // to capture Backspace. Then, if there is a text edit field in focus, then
            // let the event to flow, but if not, it ignores it.
            QKeyEvent *keyEvent = static_cast<QKeyEvent*>(event);
            if (keyEvent->key() == Qt::Key_Backspace) {
                // Is the active element a text field?
                //QWebFrame *frame = ui->webView->page()->mainFrame();
                //QVariant code = frame->evaluateJavaScript(
                //    "document.activeElement.type");
				QVariant code = evaluateJavaScript("document.activeElement.type");
                QString type = code.toString();
                if (type == "text") {
                    // Text field: pass the event to the widget
                    return false;
                } else {
                    // No text field: ignore the event
                    return true;
                }
            } else {
                return false;
            }
        }
        // Pass the event to the widget
        return false;
    } else {
        // Pass the event on to the parent class
        return QMainWindow::eventFilter(obj, event);
    }
}

void MainWindow::on_actionMy_Blocks_triggered()
{
    QMessageBox::StandardButton reply;
    if (!this->myblocks)
    {
        reply = QMessageBox::question(this, tr("My Blocks"), tr("Are you sure you want to change to My Blocks? All changes will be lost!"),
                                QMessageBox::Yes|QMessageBox::No);
        if (reply == QMessageBox::Yes) {
            this->switchToMyBlocks(true);
            QUrl url = QUrl::fromLocalFile(settings->htmlIndexMyBlocks());
            ui->webView->load(url);
        }
        else
            ui->actionMy_Blocks->setChecked(false);
    }
    else
    {
        reply = QMessageBox::question(this, tr("My Blocks"), tr("Are you sure you want to exit from My Blocks? All changes will be lost!"),
                                    QMessageBox::Yes|QMessageBox::No);
        if (reply == QMessageBox::Yes) {
            this->switchToMyBlocks(false);
            QUrl url = QUrl::fromLocalFile(settings->htmlIndex());
            QUrlQuery query(url);
            query.addQueryItem("language",settings->defaultLanguage());
            query.addQueryItem("processor","arduino-nano");
            url.setQuery(query);
            ui->webView->load(url);
        }
        else
            ui->actionMy_Blocks->setChecked(true);

    }
}

void MainWindow::on_actionMonitor_triggered()
{

}

void MainWindow::on_actionMy_Blocks_2_triggered()
{
    this->on_actionMy_Blocks_triggered();
}

void MainWindow::on_block_triggered(const QString &block)
{
    if (checkSourceChanged() == QMessageBox::Cancel) {
        return;
    }
    setXml(blocksXml[block],true);
    setXmlFileName(block);
}

void MainWindow::switchToMyBlocks(bool var)
{
    ui->actionMy_Blocks->setChecked(var);
    ui->mainToolBar->setVisible(!var);
    ui->myBlocksToolBar->setVisible(var);
    ui->menu_FileMyBlocks->menuAction()->setVisible(var);
    ui->menuLibrary->menuAction()->setVisible(var);
    ui->menu_File->menuAction()->setVisible(!var);
    ui->menu_Edit->menuAction()->setVisible(!var);
    ui->menuView->menuAction()->setVisible(!var);
    ui->license->setVisible(!var);
    ui->licenseLabel->setVisible(!var);
    ui->boardBox->setEnabled(!var);
    ui->serialPortBox->setEnabled(!var);
    this->myblocks=var;
    if (var)
    {
        updateDOMLibraryFromXML();
        updateLibraryMenu();
    }
    else
    {
        licenseTimer->start(1000);
    }
    webHelper->resetSourceChanged();
}

void MainWindow::updateDOMLibraryFromXML()
{
    QDir dir;
    QFile xmlFile(dir.currentPath()+"/html/library.xml");
    if (!xmlFile.open(QIODevice::ReadOnly | QIODevice::Text) || !doc.setContent(&xmlFile))
        return;
    xmlFile.close();
}

/*void MainWindow::on_actionblockMenuSelected_triggered()
{
}*/

void MainWindow::on_actionNew_triggered()
{
}

void MainWindow::on_actionNew_4_triggered()
{
    actionNew();
}

void MainWindow::on_actionOpen_3_triggered()
{
    actionOpen();
}

void MainWindow::on_actionSave_3_triggered()
{
    actionSave();
}

void MainWindow::on_actionQuit_2_triggered()
{
    actionQuit();
}

void MainWindow::on_actionSave_as_2_triggered()
{
    actionSaveAs();
}

void MainWindow::on_actionadd_triggered()
{
    QMessageBox::StandardButton reply;
    reply = QMessageBox::question(this, tr("My Blocks"), tr("Are you sure you want to add this block to the library?"),
                            QMessageBox::Yes|QMessageBox::No);
    if (reply == QMessageBox::Yes) {
        QString xml = getXml();
        QDomDocument new_block_doc;
        if (new_block_doc.setContent(xml))
        {
            QDomNodeList new_block = new_block_doc.firstChild().childNodes();
            QDomNodeList items = new_block.item(0).childNodes();
            QString new_block_name;
            for (int j=0;j<items.size();j++)
            {
                QString attr_name =items.item(j).attributes().namedItem("name").nodeValue();
                if (QString::compare(attr_name,"NAME")==0)
                {
                    new_block_name = items.item(j).toElement().text();
                    break;
                }
            }
            if (blocksXml.contains(new_block_name))
            {
                QMessageBox::StandardButton reply2;
                reply2 = QMessageBox::question(this, tr("My Blocks"), tr("This block already exists in the library. Do you want to update it?"),
                                        QMessageBox::Yes|QMessageBox::No);
                if (reply2 == QMessageBox::Yes)
                {
                    updateDOMBlock(new_block_name,new_block_doc);
                    updateXMLLibraryFromDOM();
                    updateMyBlocks();
                    updateMyBlocksDoc(new_block_name);
                }
                return;
            }
            addDOMBlock(new_block_name,new_block_doc);
            updateXMLLibraryFromDOM();
            updateMyBlocks();
            updateMyBlocksDoc(new_block_name);
            updateLibraryMenu();
            setXmlFileName(new_block_name);
        }
    }
}

void MainWindow::addDOMBlock(QString new_block_name, QDomDocument new_block_doc)
{
    QDomDocument block_library_item;
    //I don't know other ways for removing the xml tag
    //QString block_str = QString("<block_library_item>%1</block_library_item>").arg(new_block_doc.toString().replace("<xml xmlns=\"http://www.w3.org/1999/xhtml\">","").replace("</xml>",""));
    QString block_str = QString("<block_library_item>%1</block_library_item>").arg(DOMNodeListToString(new_block_doc.firstChild().childNodes()));
    //ui->textBrowser->append(block_str);
    block_library_item.setContent(block_str);
    block_library_item.firstChild().toElement().setAttribute("name",new_block_name);
    //ui->textBrowser->append(block_library_item.toString());
    doc.firstChild().appendChild(block_library_item);
    //ui->textBrowser->append(doc.toString());
    blocksXml[new_block_name]=block_str;
}

QString MainWindow::DOMNodeToString(QDomNode node)
{
    QString str;
    QTextStream textStream(&str);
    node.save(textStream,QDomNode::CDATASectionNode);
    return textStream.readAll();
}

QString MainWindow::DOMNodeListToString(QDomNodeList nodeList)
{
    QString str;
    for (int i=0;i<nodeList.size();i++)
    {
        str+=DOMNodeToString(nodeList.item(i));
    }
    return str;
}

void MainWindow::updateLibraryMenu()
{
    QMap<QString,QStringList> blocks;
    blocksXml.clear();
    QDomNodeList block_library_items = doc.firstChild().childNodes();
    for (int i=0;i<block_library_items.size();i++)
    {
        QDomNode block_node = block_library_items.item(i);
        QString str = DOMNodeToString(block_node);
        QDomNode block = block_node.childNodes().item(0);  //Get the factory_base node
        QString block_name = block_node.attributes().namedItem("name").nodeValue();
        QDomNodeList items = block.childNodes();
        for (int j=0;j<items.size();j++)
        {
            QString attr_name = items.item(j).attributes().namedItem("name").nodeValue();
            if (QString::compare(attr_name,"CATEGORY")==0)
            {
                QString category_name = items.item(j).toElement().text();
                blocks[categories[category_name]].push_back(block_name);
                blocksXml[block_name].push_back(str);
                //ui->textBrowser->append(block_name+" "+escapeCharacters(textStream.readAll()));
                break;
            }
        }
    }
    //First disconnect all possible actions
    foreach(const QAction *action, ui->menuLibrary->actions())
        signalMapper->disconnect(action,SIGNAL(triggered()));
    ui->menuLibrary->clear();
    foreach (QStringList category, blocks) {
        QMenu * menu = new QMenu(blocks.key(category));
        int count=1;
        foreach (QString block, category) {
            //menu->addMenu(block);
            QAction * action = new QAction(block,menu);
            connect(action, SIGNAL(triggered()), signalMapper, SLOT(map()));
            signalMapper->setMapping(action,block);
            menu->addAction(action);
            count++;
        }
        connect(signalMapper, SIGNAL(mapped(const QString &)), this, SLOT(on_block_triggered(const QString &)));
        ui->menuLibrary->addMenu(menu);
    }
    setXmlFileName("");
}

void MainWindow::updateXMLLibraryFromDOM()
{
    QDir dir;
    QFile xmlFile(dir.currentPath()+"/html/library.xml");
    if (!xmlFile.open(QIODevice::WriteOnly | QIODevice::Text))
        return;
    QTextStream xmlStream(&xmlFile );
    xmlStream << doc.toString();
    xmlFile.close();
    //Now we update again the DOM object (some of the DOM nodes, when created or updated might not be QDomElements and attributes method does not properly work)
    updateDOMLibraryFromXML();
}

void MainWindow::updateDOMBlock(QString block_name, QDomDocument block_name_doc)
{
    QDomDocument block_library_item;
    //I don't know other ways for removing the xml tag
    //QString block_str = update_block_name.toString().replace("<xml xmlns=\"http://www.w3.org/1999/xhtml\">","").replace("</xml>","");
    QString block_str = QString("<block_library_item>%1</block_library_item>").arg(DOMNodeListToString(block_name_doc.firstChild().childNodes()));
    block_library_item.setContent(block_str);
    block_library_item.firstChild().toElement().setAttribute("name",block_name);
    QDomNodeList all_block_library_items = doc.firstChild().childNodes();
    QDomNode old_library_item;
    for (int i=0;i<all_block_library_items.size();i++)
    {
        if (QString::compare(all_block_library_items.item(i).attributes().namedItem("name").nodeValue(),block_name)==0)
        {
            old_library_item=all_block_library_items.item(i);
            break;
        }
    }
    doc.firstChild().replaceChild(block_library_item,old_library_item);
    blocksXml[block_name]=block_str;
}

void MainWindow::on_actionupdate_triggered()
{
    QMessageBox::StandardButton reply;
    reply = QMessageBox::question(this, tr("My Blocks"), tr("Are you sure you want to update this block from the library?"),
                            QMessageBox::Yes|QMessageBox::No);
    if (reply == QMessageBox::Yes) {
        QString xml = getXml();
        QDomDocument update_block_doc;
        if (update_block_doc.setContent(xml))
        {
            QDomNodeList update_block = update_block_doc.firstChild().childNodes();
            QDomNodeList items = update_block.item(0).childNodes();
            QString update_block_name;
            for (int j=0;j<items.size();j++)
            {
                QString attr_name =items.item(j).attributes().namedItem("name").nodeValue();
                if (QString::compare(attr_name,"NAME")==0)
                {
                    update_block_name = items.item(j).toElement().text();
                    break;
                }
            }
            if (!blocksXml.contains(update_block_name))
            {
                QMessageBox::StandardButton reply2;
                reply2 = QMessageBox::question(this, tr("My Blocks"), tr("This block does not exist in the library. Do you want to add it?"),
                                        QMessageBox::Yes|QMessageBox::No);
                if (reply2 == QMessageBox::Yes)
                {
                    addDOMBlock(update_block_name,update_block_doc);
                    updateXMLLibraryFromDOM();
                    updateMyBlocks();
                    updateMyBlocksDoc(update_block_name);
                    updateLibraryMenu();
                }
                return;
            }
            updateDOMBlock(update_block_name,update_block_doc);
            updateXMLLibraryFromDOM();
            updateMyBlocks();
            updateMyBlocksDoc(update_block_name);
        }
    }
}

void MainWindow::on_actiondelete_triggered()
{
    QMessageBox::StandardButton reply;
    reply = QMessageBox::question(this, tr("My Blocks"), tr("Are you sure you want to delete this block from the library?"),
                            QMessageBox::Yes|QMessageBox::No);
    if (reply == QMessageBox::Yes) {
        QString xml = getXml();
        QDomDocument delete_block_doc;
        if (delete_block_doc.setContent(xml))
        {
            QDomNodeList delete_block = delete_block_doc.firstChild().childNodes();
            QDomNodeList items = delete_block.item(0).childNodes();
            QString delete_block_name;
            for (int j=0;j<items.size();j++)
            {
                QString attr_name =items.item(j).attributes().namedItem("name").nodeValue();
                if (QString::compare(attr_name,"NAME")==0)
                {
                    delete_block_name = items.item(j).toElement().text();
                    break;
                }
            }
            if (!blocksXml.contains(delete_block_name))
            {
                QMessageBox msg;
                msg.setText(tr("This block does not exist in the library and can't be delete it."));
                msg.exec();
                return;
            }
            deleteDOMBlock(delete_block_name);
            updateXMLLibraryFromDOM();
            updateMyBlocks();
            deleteMyBlocksDoc(delete_block_name);
        }
    }
}

void MainWindow::deleteDOMBlock(QString block_name)
{
    QDomNodeList all_block_library_items = doc.firstChild().childNodes();
    QDomNode old_library_item;
    for (int i=0;i<all_block_library_items.size();i++)
    {
        if (QString::compare(all_block_library_items.item(i).attributes().namedItem("name").nodeValue(),block_name)==0)
        {
            old_library_item=all_block_library_items.item(i);
            break;
        }
    }
    doc.firstChild().removeChild(old_library_item);
    if (blocksXml.contains(block_name))
        blocksXml.erase(blocksXml.find(block_name));
    updateXMLLibraryFromDOM();
    updateLibraryMenu();
    webHelper->resetSourceChanged();
    actionNew();
}

void MainWindow::updateMyBlocks()
{
    QDir dir;
    QFile blockFile(dir.currentPath()+"/html/my_blocks.js");
    if (blockFile.open(QIODevice::WriteOnly))
    {
        QTextStream stream(&blockFile);
        QString tools_code = "var tools = new BlockExporterTools();";
        evaluateJavaScript(tools_code);
        foreach (QString block_type, blocksXml.keys())
        {
            QString code = QString("var tools = new BlockExporterTools();"
                                   "var xml = Blockly.Xml.textToDom('%1');"
                                   "var rootBlock = tools.getRootBlockFromXml_(xml);"
                                   "FactoryUtils.getBlockDefinition('%2', rootBlock,'JavaScript', tools.hiddenWorkspace)").arg(blocksXml[block_type].remove(QRegExp("[\n\t\r]")),block_type);
            QString code1 = QString("var tempBlock = FactoryUtils.getDefinedBlock('%1', tools.hiddenWorkspace);"
                               "FactoryUtils.getGeneratorStub(tempBlock, 'Arduino')").arg(block_type);
            QString block_definiton_code = evaluateJavaScript(code);
            QString block_arduino_code = evaluateJavaScript(code1);
            stream << block_definiton_code << endl << block_arduino_code << endl;
        }
        blockFile.close();
    }
}

void MainWindow::updateMyBlocksDoc(QString block_type)
{
    QDir dir;
    QFile blockFile(dir.currentPath()+QString("/html/doc/en-GB/%1.html").arg(block_type));

    if (blockFile.open(QIODevice::WriteOnly))
    {
        QTextStream stream(&blockFile);
        QString tools_code = "var tools = new BlockExporterTools();";
        evaluateJavaScript(tools_code);
        QString code = QString("var tools = new BlockExporterTools();"
                               "var xml = Blockly.Xml.textToDom('%1');"
                               "var rootBlock = tools.getRootBlockFromXml_(xml);"
                               "FactoryUtils.getBlockDefinition('%2', rootBlock,'JavaScript', tools.hiddenWorkspace)").arg(blocksXml[block_type].remove(QRegExp("[\n\t\r]")),block_type);
        QString code1 = QString("FactoryUtils.getDoc('%1')").arg(block_type);
        QString block_definiton_code = evaluateJavaScript(code);
        QString block_doc_code = evaluateJavaScript(code1);
        stream << block_doc_code << endl;
        blockFile.close();
    }
}

void MainWindow::deleteMyBlocksDoc(QString block_type)
{
    QDir dir;
    QFile blockFile(dir.currentPath()+QString("/html/doc/en-GB/%1.html").arg(block_type));
    if (blockFile.exists())
        QFile::remove(dir.currentPath()+QString("/html/doc/en-GB/%1.html").arg(block_type));
}

void MainWindow::initCategories()
{
    categories.clear();
    categories["BLOCKS"].push_back("My Blocks");
    categories["PROCEDURES"].push_back("Functions");
    categories["CONTROL"].push_back("Control");
    categories["LOGIC"].push_back("Logic");
    categories["MATH"].push_back("Math");
    categories["VARIABLES"].push_back("Variables");
    categories["TEXT"].push_back("Text");
    categories["COMMUNICATION"].push_back("Communication");
    categories["DISTANCE"].push_back("Distance");
    categories["SCREEN"].push_back("Screen");
    categories["LIGHT"].push_back("Light");
    categories["SOUND"].push_back("SOUND");
    categories["MOVEMENT"].push_back("Movement");
    categories["AMBIENT"].push_back("Ambient");
    categories["HTML"].push_back("HTML");
    categories["ADVANCED"].push_back("Basic I/O");
}
