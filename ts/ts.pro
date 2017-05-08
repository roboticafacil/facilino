TEMPLATE = aux

linux {
  first.commands = lupdate /home/roboticafacil/src/facilino/facilino.pro && lrelease /home/roboticafacil/src/facilino/facilino.pro
  QT += webkitwidgets
  QMAKE_EXTRA_TARGETS += first
}

win32 {
  first.commands = lupdate $$PWD/../facilino.pro && lrelease $$PWD/../facilino.pro
  QMAKE_EXTRA_TARGETS += first
}


QMAKE_CLEAN += *.qm
