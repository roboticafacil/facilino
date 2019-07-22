#ifndef TUTORIALDIALOG_H
#define TUTORIALDIALOG_H

#include <QWidget>
#include <QDialog>

#include <QTimer>
#include <QWebChannel>

#include "jswebtutorialhelpers.h"
#include "settingsstore.h"

namespace Ui {
class TutorialDialog;
}

class TutorialDialog : public QDialog
{
    Q_OBJECT
public:
    explicit TutorialDialog(SettingsStore *settings, QWidget *parent = nullptr);
    ~TutorialDialog();

private:
    Ui::TutorialDialog *ui;
    QTimer *timer;
    JsWebTutorialHelpers *webHelper;
    QWebChannel *channel;
    void actionInjectWebHelper();
private slots:
    void checkSize();
    void onPageClicked(QString url);
    void onFileDownloaded(QString file);
};

#endif // TUTORIALDIALOG_H
