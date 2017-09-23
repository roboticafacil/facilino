TEMPLATE = subdirs
SUBDIRS = ts src
TRANSLATIONS = \
    ts/facilino_ca-es.ts \
    ts/facilino_es-es.ts

macx {
    deploy.commands = macdeployqt $${OUT_PWD}/facilino.app
    QMAKE_EXTRA_TARGETS += deploy
}

win32 {
    RC_ICONS = facilino.ico
    deploy.commands = windeployqt --release $${OUT_PWD}/src/facilino.exe
    QMAKE_EXTRA_TARGETS += deploy
}

win64 {
    RC_ICONS = facilino.ico
    deploy.commands = windeployqt --release $${OUT_PWD}/src/facilino.exe
    QMAKE_EXTRA_TARGETS += deploy
}
