#include "settingsstore.h"

#include <QCoreApplication>
#include <QDebug>
#include <QDir>
#include <QFileInfo>
#include <QString>
#include <QSettings>
#include <QStandardPaths>

const QString SettingsStore::index2board[SIZE_LIST] = {"ArduinoUno","ArduinoNano","ArduinoNano","ArduinoMega","ArduinoMega","ArduinoBt","ArduinoIntel","ESP8266","NodeMCU"};


SettingsStore::SettingsStore(const QString &fileName) {
    // Set platform
#ifdef Q_OS_LINUX
    platform = "linux/";
#elif defined(Q_OS_WIN)
    platform = "windows/";
#elif defined(Q_OS_MAC)
    platform = "mac/";
#endif


    // Read settings file
    settings = new QSettings(QSettings::IniFormat,
                             QSettings::UserScope,
                             "facilino",
                             "facilino");

    // If IDE path is empty, copy original settings
    if (settings->value(platform + "arduino_ide_path", "").toString() == "") {
        copyDefaultSettings(fileName);
    }
}

SettingsStore::~SettingsStore() {
    delete settings;
}


QString SettingsStore::arduinoBoard() {
    return settings->value(platform + "arduino_board",
                           "arduino:avr:uno").toString();
}

QString SettingsStore::arduinoBoardFacilino() {
    return settings->value(platform + "arduino_board_facilino","ArduinoNano").toString();
}

QString SettingsStore::arduinoIdePath() {
/*#ifdef Q_OS_LINUX
    return relativePath("arduino_ide_path", "/usr/bin/arduino");
#elif defined(Q_OS_WIN)
    return relativePath("arduino_ide_path", "C:\\Program Files (x86)\\Arduino\\arduino_debug.exe");
#elif defined(Q_OS_MAC)
    return relativePath("arduino_ide_path", "Arduino.app");
#endif*/
    return relativePath("arduino_ide_path", "C:\\Program Files (x86)\\Arduino\\arduino_debug.exe");
}

QString SettingsStore::defaultLanguage() {
    return settings->value(platform + "language", "en-GB").toString();
}

QString SettingsStore::license() {
    return settings->value(platform + "license", "").toString();
}

QString SettingsStore::examplesPath() {
    return settings->value(platform + "examples_path",
                           "./html/doc/examples/").toString();
}

QString SettingsStore::tmpDirName() {
    return relativePath("tmp_dir_name", "temp/");
}

QString SettingsStore::tmpFileName() {
    return relativePath("tmp_file_name", "./temp/temp.ino");
}

QString SettingsStore::htmlIndex() {
    return relativePath("html_index", "./html/index.html");
}

QString SettingsStore::htmlIndexMyBlocks() {
    return relativePath("html_index", "./html/index_my_blocks.html");
}

bool SettingsStore::iconLabels() {
    return settings->value(platform + "icon_labels", true).toBool();
}

float SettingsStore::zoomScale() {
    return settings->value(platform + "zoom_scale", 1.0).toFloat();
}


void SettingsStore::copyDefaultSettings(const QString &fileName,
                                        bool overwrite) {
    // Locate config.ini in standard locations
    QString settingsFile = QStandardPaths::locate(
                QStandardPaths::DataLocation,
                fileName,
                QStandardPaths::LocateFile);

    // If couldn't locate config.ini in DataLocation dirs,
    // search in the binary path.
    if (settingsFile.isEmpty()) {
        settingsFile = QDir(QCoreApplication::applicationDirPath())
                .filePath(fileName);
    }

    // Set final settings path
    QString localSettingsFile = settings->fileName();
    QString localSettingsDir = QFileInfo(localSettingsFile).absolutePath();

    // Free settings file
    delete settings;

    // Create directory if it doesn't exist
    QDir dir(localSettingsDir);
    if (!dir.exists()) {
        dir.mkpath(localSettingsDir);
    }

    // Copy settings
    if (overwrite == true) {
        // Remove if already exists
        QFile localSettings(localSettingsFile);
        if (localSettings.exists() == true) {
            localSettings.remove();
        }
    }
    QFile::copy(settingsFile, localSettingsFile);

    // Reload settings
    settings = new QSettings(QSettings::IniFormat,
                             QSettings::UserScope,
                             "facilino",
                             "facilino");
}

void SettingsStore::setArduinoBoard(const QString &value) {
    settings->setValue(platform + "arduino_board", value);
}

void SettingsStore::setArduinoBoardFacilino(const QString &value) {
    settings->setValue(platform + "arduino_board_facilino", value);
}

void SettingsStore::setArduinoIdePath(const QString &value) {
    settings->setValue(platform + "arduino_ide_path", value);
}

void SettingsStore::setTmpDirName(const QString &value) {
    settings->setValue(platform + "tmp_dir_name", value);
}

void SettingsStore::setTmpFileName(const QString &value) {
    settings->setValue(platform + "tmp_file_name", value);
}

void SettingsStore::setHtmlIndex(const QString &value) {
    settings->setValue(platform + "html_index", value);
}

void SettingsStore::setIconLabels(bool icon_labels) {
    settings->setValue(platform + "icon_labels", icon_labels);
}

void SettingsStore::setDefaultLanguage(const QString &value) {
    settings->setValue(platform + "language", value);
}

void SettingsStore::setLicense(const QString &value) {
    settings->setValue(platform + "license", value);
}

void SettingsStore::setExamplesPath(const QString &value) {
    settings->setValue(platform + "examples_path", value);
}

void SettingsStore::setZoomScale(float value) {
    settings->setValue(platform + "zoom_scale", value);
}


QString SettingsStore::relativePath(const QString &value,
                                    const QString &defaultValue) {

    QString settingsValue = settings->value(platform + value,
                                             defaultValue).toString();

    if (settingsValue.left(2) == "~/") {
        // Substitute with home dir
        return QDir::homePath() + settingsValue.remove(0,1);
    } else if (QDir::isRelativePath(settingsValue)) {
        // Append the binary path if relative
        return QDir(QCoreApplication::applicationDirPath()).
                filePath(settingsValue);
    }

    return settingsValue;
}
