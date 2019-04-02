#include "settingsstore.h"

#include <QCoreApplication>
#include <QDebug>
#include <QDir>
#include <QFileInfo>
#include <QString>
#include <QSettings>
#include <QStandardPaths>
#include <QtSerialPort>

const QString SettingsStore::index2board[SIZE_LIST] = {"arduino:avr:uno","arduino:avr:nano:cpu=atmega328","arduino:avr:nano:cpu=atmega328old","arduino:avr:nano:cpu=atmega168","arduino:avr:mega","arduino:avr:micro","arduino:avr:lilypad:cpu=atmega328","arduino:avr:lilypad:cpu=atmega168","arduino:avr:mini","arduino:avr:leonardo","esp8266:esp8266:generic","esp8266:esp8266:nodemcuv2","esp32:esp32:esp32","esp32:esp32:lolin32"};
//const QString SettingsStore::index2board[SIZE_LIST] = {"arduino:avr:uno","arduino:avr:nano:cpu=atmega328","arduino:avr:nano:cpu=atmega328old","arduino:avr:nano:cpu=atmega168","arduino:avr:mega","arduino:avr:micro","arduino:avr:lilypad:cpu=atmega328","arduino:avr:lilypad:cpu=atmega168","arduino:avr:mini","arduino:avr:leonardo","esp8266:esp8266:generic:CpuFrequency=80,FlashFreq=40,FlashMode=dio,UploadSpeed=115200,FlashSize=512K64,ResetMethod=ck,Debug=Disabled,DebugLevel=None____","esp8266:esp8266:nodemcuv2:CpuFrequency=80,UploadSpeed=115200,FlashSize=4M3M","esp32:esp32:esp32:PSRAM=disabled,PartitionScheme=default,CPUFreq=240,FlashMode=qio,FlashFreq=80,FlashSize=4M,UploadSpeed=921600,DebugLevel=none","esp32:esp32:lolin32:FlashFreq=80,PartitionScheme=default,UploadSpeed=921600","esp32:esp32:lolin32:FlashFreq=80,PartitionScheme=default,UploadSpeed=921600"};
const QString SettingsStore::index2name[SIZE_LIST] = {"ArduinoUno","ArduinoNano","ArduinoNano","ArduinoNano","ArduinoMega2560","ArduinoMicro","ArduinoLilyPad","ArduinoLilyPad","ArduinoMini","ArduinoLeonardo","ESP8266","NodeMCU","ESP32","WEMOS LOLIN32","WEMOS LOLIN32 SHIELD"};
const qint32 SettingsStore::index2baudrate[SIZE_LIST] = {QSerialPort::Baud9600,QSerialPort::Baud9600,QSerialPort::Baud9600,QSerialPort::Baud9600,QSerialPort::Baud9600,QSerialPort::Baud9600,QSerialPort::Baud9600,QSerialPort::Baud9600,QSerialPort::Baud9600,QSerialPort::Baud9600,QSerialPort::Baud115200,QSerialPort::Baud115200,QSerialPort::Baud115200,QSerialPort::Baud115200,QSerialPort::Baud115200};
const QString SettingsStore::version = "1.4.2";
const QString SettingsStore::allCommonToolboxes= "LANG_CATEGORY_PROCEDURES,LANG_SUBCATEGORY_CONTROL,LANG_CATEGORY_LOGIC,LANG_CATEGORY_MATH,LANG_CATEGORY_TEXT,LANG_CATEGORY_VARIABLES,LANG_SUBCATEGORY_ANALOG,LANG_SUBCATEGORY_DIGITAL,LANG_SUBCATEGORY_USB";
const QString SettingsStore::allAdditionalToolboxes = "LANG_SUBCATEGORY_INTERRUPTS,LANG_SUBCATEGORY_STATEMACHINE,LANG_SUBCATEGORY_ARRAYS,LANG_CATEGORY_CURVE,LANG_SUBCATEGORY_BUTTON,LANG_SUBCATEGORY_BUS,LANG_SUBCATEGORY_OTHER,LANG_SUBCATEGORY_LCD,LANG_SUBCATEGORY_MAX7219,LANG_SUBCATERGORY_WS2812,LANG_SUBCATEGORY_OLED,LANG_SUBCATEGORY_BLUETOOTH,LANG_SUBCATEGORY_WIFI,LANG_SUBCATEGORY_IOT,LANG_SUBCATEGORY_BUZZER,LANG_SUBCATEGORY_VOICE,LANG_SUBCATEGORY_MIC,LANG_SUBCATEGORY_MUSIC,LANG_CATEGORY_DISTANCE,LANG_SUBCATEGORY_INFRARED,LANG_SUBCATEGORY_COLOR,LANG_SUBCATEGORY_MOTORS,LANG_SUBCATEGORY_ROBOTBASE,LANG_SUBCATEGORY_ROBOTACC,LANG_SUBCATEGORY_WALK,LANG_SUBCATEGORY_SYSTEM_CONTROL,LANG_SUBCATEGORY_SYSTEM_FILTER,LANG_SUBCATEGORY_TEMPERATURE,LANG_SUBCATEGORY_HUMIDITY,LANG_SUBCATEGORY_RAIN,LANG_SUBCATEGORY_GAS,LANG_SUBCATEGORY_MISC,LANG_SUBCATEGORY_HTML,LANG_SUBCATERGORY_ESPUI,LANG_CATEGORY_DEPRECATED";


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
#ifdef Q_OS_LINUX
    return relativePath("arduino_ide_path", "/usr/bin/arduino");
#elif defined(Q_OS_WIN)
    return relativePath("arduino_ide_path", "C:\\Program Files (x86)\\Arduino\\arduino_debug.exe");
    //return relativePath("arduino_ide_path", ".\\arduino\\arduino-1.8.8\\arduino_debug.exe");
    //return "C:\\Facilino\\arduino\\arduino-1.8.8\\arduino_debug.exe";
#elif defined(Q_OS_MAC)
    return relativePath("arduino_ide_path", "Arduino.app");
#endif
    //return relativePath("arduino_ide_path", "C:\\Program Files (x86)\\Arduino\\arduino_debug.exe");
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

QString SettingsStore::docPath() {
    return settings->value(platform + "doc_path",
                           "./html/doc/").toString();
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

QStringList SettingsStore::toolboxCategories()
{
    QStringList categories = settings->value(platform+"categories"+version,allAdditionalToolboxes).toString().split(',');
    return categories;
}

void SettingsStore::setToolboxCategories(const QStringList &categories)
{
    settings->setValue(platform+"categories"+version,categories.join(","));
}
