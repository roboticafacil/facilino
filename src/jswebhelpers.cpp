#include "jswebhelpers.h"
#include <QMessageBox>

JsWebHelpers::JsWebHelpers(QObject *parent) :
    QObject(parent)
{
    source_changed = false;
    source_changes = 0;
    source_change_enabled = false;
    connect(this, SIGNAL(licChanged()), this, SLOT(licHasChanged()));
}

void JsWebHelpers::resetSourceChanged() {
    // Reset source changed status and reset count
    source_changed = false;
    source_changes = 0;
}

bool JsWebHelpers::isSourceChanged() {
    // Return the source changed status
    return source_changed;
}

bool JsWebHelpers::isSourceChangeEnabled()
{
    return source_change_enabled;
}

void JsWebHelpers::setSourceChangeEnable(bool val)
{
    source_change_enabled=val;
}

int JsWebHelpers::sourceChanges() {
    // Number of changes to the source
    return source_changes;
}

void JsWebHelpers::sourceChanged() {
    // Callback for source changed signal, called from index.html through the
    // web brigde setup in MainWindow::onJavaScriptWindowObjectCleared()
    //QMessageBox *msg = new QMessageBox();
    //msg->setText("Source Changed");
    //msg->exec();
    if (source_change_enabled)
    {
        source_changed = true;
        source_changes++;
        // Emit signal
        emit changed();
    }
}

void JsWebHelpers::setLicense(QString license)
{
    _license=license;
}

QString JsWebHelpers::getLicense()
{
    return _license;
}

void JsWebHelpers::licHasChanged()
{
     // do anything here
}
