TEMPLATE = subdirs
SUBDIRS = ts src
TRANSLATIONS = \
    ts/facilino_ca-es.ts \
    ts/facilino_es-es.ts \
    ts/facilino_da-DK.ts \
    ts/facilino_de-DE.ts \
    ts/facilino_es-LT.ts \
    ts/facilino_eu-ES.ts \
    ts/facilino_fr-FR.ts \
    ts/facilino_gl-ES.ts \
    ts/facilino_it-IT.ts \
    ts/facilino_nb-NO.ts \
    ts/facilino_nl-NL.ts \
    ts/facilino_pl-PL.ts \
    ts/facilino_pt-PT.ts \
    ts/facilino_ru-RU.ts

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
