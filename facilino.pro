TEMPLATE = subdirs
SUBDIRS = ts src
TRANSLATIONS = \
    ts/facilino_ca-es.ts \
    ts/facilino_es-es.ts \
    ts/facilino_eu-es.ts \
    ts/facilino_fr-fr.ts \
    ts/facilino_gl-es.ts \
    ts/facilino_it-it.ts \
    ts/facilino_pl-pl.ts \
    ts/facilino_pt-pt.ts \
    ts/facilino_ru.ts

macx {
    deploy.commands = macdeployqt $${OUT_PWD}/facilino.app
    QMAKE_EXTRA_TARGETS += deploy
}

win32 {
    deploy.commands = windeployqt --release $${OUT_PWD}/src/facilino.exe
    QMAKE_EXTRA_TARGETS += deploy
}
