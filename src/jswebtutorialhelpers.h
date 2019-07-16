#ifndef JSWEBTUTORIALHELPERS_H
#define JSWEBTUTORIALHELPERS_H

#include <QObject>

class JsWebTutorialHelpers : public QObject
{
    Q_OBJECT
public:
    explicit JsWebTutorialHelpers(QObject *parent = 0);
    Q_INVOKABLE void pageClicked(QString url);
    Q_INVOKABLE void fileDownloaded(QString file);

signals:
    void clicked(QString url);
    void downloaded(QString file);

public slots:
};

#endif // JSWEBTUTORIALHELPERS_H
