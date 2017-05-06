TEMPLATE = aux

linux {
  first.commands = lupdate /home/username/Descargas/facilino/facilino.pro && lrelease /home/username/Descargas/facilino/facilino.pro
  QT += webkitwidgets
  QMAKE_EXTRA_TARGETS += first
}

win32 {
  first.commands = lupdate $$PWD/../facilino.pro && lrelease $$PWD/../facilino.pro
  QMAKE_EXTRA_TARGETS += first
}


QMAKE_CLEAN += *.qm
