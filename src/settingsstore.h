#ifndef SETTINGSSTORE_H
#define SETTINGSSTORE_H

#include <QHash>
#include <QObject>
#include <QSettings>
#include <QString>

#define CONFIG_INI "config.ini"

#define SIZE_LIST 15

class SettingsStore : public QObject
{
    Q_OBJECT

public:

    SettingsStore(const QString &fileName);
    ~SettingsStore();
    bool save();

    QString arduinoBoard();
    QString arduinoBoardFacilino();
    QString arduinoIdePath();
    QString defaultLanguage();
    QString examplesPath();
    QString docPath();
    QString tmpDirName();
    QString tmpFileName();
    QString htmlIndex();
    QString htmlIndexMyBlocks();
    bool iconLabels();
    float zoomScale();
    QString license();
    QStringList toolboxCategories();
    QString getLastVersion();

    static const QString index2board[SIZE_LIST];
    static const QString index2name[SIZE_LIST];
    static const qint32 index2baudrate[SIZE_LIST];
    static const QString version;
    static const QString allCommonToolboxes;
    static const QString allAdditionalToolboxes;

    void copyDefaultSettings(const QString &fileName = CONFIG_INI,
                             bool overwrite = false);
    void setArduinoBoard(const QString &value);
    void setArduinoBoardFacilino(const QString &value);
    void setArduinoIdePath(const QString &value);
    void setIconLabels(bool icon_labels);
    void setDefaultLanguage(const QString &value);
    void setExamplesPath(const QString &value);
    void setTmpDirName(const QString &value);
    void setTmpFileName(const QString &value);
    void setHtmlIndex(const QString &value);
    void setZoomScale(float value);
    void setLicense(const QString &value);
    void setToolboxCategories(const QStringList &categories);

private:
    QString platform;
    QString filename;
    QSettings *settings;

    QString relativePath(const QString &value, const QString &defaultValue);
};

#endif // SETTINGSSTORE_H
