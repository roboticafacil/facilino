#include "tutorialdialog.h"
#include "ui_tutorialdialog.h"

#include <QUrlQuery>
#include <QMessageBox>
#include <QDesktopServices>

TutorialDialog::TutorialDialog(SettingsStore *settings, QWidget *parent) : QDialog(parent), ui(new Ui::TutorialDialog)
{
    ui->setupUi(this);
    timer = new QTimer(this);
    connect(timer, SIGNAL(timeout()), this, SLOT(checkSize()));
    timer->start(1000);
    this->showMaximized();
    actionInjectWebHelper();
    QUrl url = QUrl::fromLocalFile(settings->htmlTutorialIndex());
    ui->webView->load(url);
}

TutorialDialog::~TutorialDialog()
{
    delete ui;
}

void TutorialDialog::checkSize()
{
    if ((ui->webView->size().width()!=this->size().width())&&(ui->webView->size().height()!=this->size().height()))
    ui->webView->setGeometry(0,0,this->size().width(),this->size().height());
}

void TutorialDialog::actionInjectWebHelper() {
    // Inject the webHelper object in the webview. This is used in index.html,
    // where a call is made back to webHelper.sourceChanged() function.
    webHelper = new JsWebTutorialHelpers();
    channel = new QWebChannel(ui->webView->page());
    ui->webView->page()->setWebChannel(channel);
    connect(webHelper, SIGNAL(clicked(QString)), this, SLOT(onPageClicked(QString)));
    connect(webHelper, SIGNAL(downloaded(QString)), this, SLOT(onFileDownloaded(QString)));
    channel->registerObject(QString("webHelper"), webHelper);
}

void TutorialDialog::onPageClicked(QString url) {
    QDesktopServices::openUrl(QUrl(url));
}

void TutorialDialog::onFileDownloaded(QString file) {
    //QDesktopServices::openUrl(QUrl(url));
    QMessageBox box;
    box.setText(file);
    box.exec();
}
