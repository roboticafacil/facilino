#include "jswebtutorialhelpers.h"

JsWebTutorialHelpers::JsWebTutorialHelpers(QObject *parent) : QObject(parent)
{

}

void JsWebTutorialHelpers::pageClicked(QString url) {
    emit clicked(url);
}

void JsWebTutorialHelpers::fileDownloaded(QString file) {
    emit downloaded(file);
}
