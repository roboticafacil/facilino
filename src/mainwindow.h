#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include "graphwidget.h"
#include "jswebhelpers.h"
#include "settingsdialog.h"
#include "settingsstore.h"
#include "tutorialdialog.h"

#include <QMainWindow>
#include <QProcess>
#include <QtSerialPort/QSerialPort>
#include <QWebEngineView>
#include <QUndoStack>
#include <QSignalMapper>
#include <QDomDocument>
#include <QTreeWidgetItem>
#include <QListWidget>
#include <QLineEdit>

class QGamepad;

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    QProcess *process;
    SettingsStore *settings;
    QString xmlFileName;
    QString xmlLoadContent;
    QStringList serialPortList;
    QSerialPort *serial;
    QString dataString;
    QList<GraphWidget *> graphList;
    QDockWidget *docDockWidget;
    QListWidget *docList;
    QListWidget *exampleList;
    QPushButton * docSearchButton;
    QLineEdit * docLineEdit;
    //QStringList documentHistory;
    QUndoStack documentHistory;
    QUndoCommand command;
    QString lastDocument;
    JsWebHelpers *webHelper;
    QWebChannel *channel;
    QTimer *licenseTimer;
    QTimer *controllerTimer;
    bool sourceChanging;
    bool sourceChanged;
    int documentHistoryStep;
    bool alert;
    bool myblocks;
    QString currentBlock;
    QMap<QString,QString> blocksXml;
    QMap<QString,QString> categories;
    QDomDocument doc;
    QSignalMapper *signalMapper;
    bool ignoreQTreeWidgetItemEvents;
    QStringList toolboxCategories;

    void actionSaveAndSaveAs(bool askFileName, const QString &directory = "");
    void actionOpenInclude(const QString &title,
                           bool clear = true,
                           const QString &directory = "");
    void arduinoExec(const QString &action);
    void documentHistoryReset();
    QString evaluateJavaScript(const QString code);
    QString escapeCharacters(const QString& string);
    QString getXml();
    QString getCode();
    void setXml(const QString &xml, bool clear = false);
    void iconLabels();
    bool isCommaSeparatedNumbers(const QString data);
    bool listIsEqual(const QStringList &listOne, const QStringList &listTwo);
    void loadBlockly();
    void openFileToWorkspace(const QString &xmlFileName,
                             bool clear = true);
    void setArduinoBoard();
    void setXmlFileName(const QString &fileName);
    void serialPortOpen(qint32 baudrate);
    void serialPortClose();
    QStringList portList();
    int saveXml(const QString &xmlFilePath);
    int saveSketch(const QString &inoFilePath);
    int checkSourceChanged();
    void switchToMyBlocks(bool var);
    void addDOMBlock(QString new_block_name, QDomDocument new_block_doc);
    void updateDOMBlock(QString block_name, QDomDocument update_block_name_doc);
    void deleteDOMBlock(QString block_name);
    void updateXMLLibraryFromDOM();
    void updateDOMLibraryFromXML();
    void updateMyBlocks();
    void updateMyBlocksDoc(QString block_type);
    void deleteMyBlocksDoc(QString block_type);
    QString DOMNodeToString(QDomNode block_node);
    QString DOMNodeListToString(QDomNodeList nodeList);
    void updateLibraryMenu();
    void closeEvent(QCloseEvent *bar);
    void initCategories();
    void addQTreeWidgetItemToParent(QTreeWidgetItem *item, QString name, QString data);
    void toogleCategories(QString data);
    void setToolboxCategories();
    void setSearchDocWidget();
    void parseXML(const QDomElement& root, const QString& baseName, QStringList& v);
    QString noAcute(QString str);
    bool boardChanged;
    QString xmlReload;
protected:
    bool eventFilter(QObject *obj, QEvent *event);

public slots:
    void actionAbout();
    void actionCloseMessages();
    void actionCode();
    void actionDoc();
    void actionExamples();
    void actionExportSketch();
    void actionIconLabels();
    void actionInclude();
    void actionInjectWebHelper();
    void actionInsertLanguage();
    void actionLicense();
    void actionMessages();
    void actionMonitor();
    void actionMonitorSend();
    void actionNew();
    void actionOpen();
    void actionOpenMessages();
    void actionGraph();
    void actionQuit();
    void actionDocumentRedo();
    void actionDocumentUndo();
    void actionUpload();
    void actionVerify();
    void actionSave();
    void actionSaveAs();
    void actionSettings();
    void actionZoomIn();
    void actionZoomOut();
    void onBoardChanged();
    void onLoadFinished(bool finished);
    void onProcessFinished(int exitCode);
    void onProcessOutputUpdated();
    void onProcessStarted();
    void onSourceChanged();
    void onStatusMessageChanged(const QString &message);
    void readSerial();
    void unhide();
    void updateSerialPorts();
private slots:
    void on_actionMy_Blocks_triggered();
    void on_actionMonitor_triggered();
    void on_actionMy_Blocks_2_triggered();
    void mapBlock(const QString & block);
    //void on_actionblockMenuSelected_triggered();
    void on_actionNew_triggered();
    void checkLicense();
    void onUndoChanged(bool canUndo);
    void onRedoChanged(bool canUndo);
    void on_actionNew_4_triggered();
    void on_actionOpen_3_triggered();
    void on_actionSave_3_triggered();
    void on_actionQuit_2_triggered();
    void on_actionSave_as_2_triggered();
    void on_actionadd_triggered();
    void on_actionupdate_triggered();
    void on_actiondelete_triggered();
    void on_actionCopy_triggered();
    void on_actionInterrupts_triggered();
    void on_actionState_Machine_triggered();
    void on_actionArrays_triggered();
    void on_actionCurve_triggered();
    void on_actionButton_triggered();
    void on_actionBus_triggered();
    void on_actionOther_triggered();
    void on_actionLCD_triggered();
    void on_actionLED_Matrix_triggered();
    void on_actionRGB_LEDs_triggered();
    void on_actionOLED_triggered();
    void on_actionBluetooth_triggered();
    void on_actionWiFI_triggered();
    void on_actionIoT_triggered();
    void on_actionBuzzer_triggered();
    void on_actionVoice_triggered();
    void on_actionMic_triggered();
    void on_actionMusic_triggered();
    void on_actionColour_triggered();
    void on_actionDistance_triggered();
    void on_actionInfrared_triggered();
    void on_actionMotors_triggered();
    void on_actionRobot_base_triggered();
    void on_actionRobot_accessories_triggered();
    void on_actionRobot_walk_triggered();
    void on_actionController_triggered();
    void on_actionFiltering_triggered();
    void on_actionTemperature_triggered();
    void on_actionHumidity_triggered();
    void on_actionRain_triggered();
    void on_actionGas_triggered();
    void on_actionMiscellaneous_triggered();
    void on_actionHTML_triggered();
    void on_actionUser_Interface_triggered();
    void on_actionDeprecated_triggered();
    void on_treeWidget_itemChanged(QTreeWidgetItem *item, int column);
    void on_actionView_triggered();
    void updateToolboxCategories();
    void searchDoc();
    void on_actionSearchDocumentation_triggered();
    void onDocListItemClicked(QListWidgetItem* item);
    void onExampleListItemClicked(QListWidgetItem* item);
    void on_actionEEPROM_triggered();
    void on_actionLDR_triggered();
    void on_actionBLE_triggered();
    void on_actionReload_triggered();
    void on_actionactionTutorial_triggered();
};

#endif // MAINWINDOW_H
