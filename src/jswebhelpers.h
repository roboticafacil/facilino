#ifndef JSWEBHELPERS_H
#define JSWEBHELPERS_H

#include <QObject>

class JsWebHelpers : public QObject
{
    Q_OBJECT
public:
    explicit JsWebHelpers(QObject *parent = 0);

    void resetSourceChanged();
    int sourceChanges();
    bool isSourceChanged();
    bool isSourceChangeEnabled();
    void setSourceChangeEnable(bool val);
    void setLicense(QString license);

    Q_PROPERTY(QString myLicense READ getLicense NOTIFY licChanged)
    Q_INVOKABLE QString getLicense();
    Q_INVOKABLE void sourceChanged();

private:
    int source_changes;
    bool source_changed;
    bool source_change_enabled;
    QString _license;

signals:
    void changed();
    void licChanged();

public slots:
    void licHasChanged();

};

#endif // JSWEBHELPERS_H
