#ifndef QBLOCKSWEBVIEW_H
#define QBLOCKSWEBVIEW_H

#include <QObject>
#include <QWebEngineView>
#include <QWheelEvent>
#include <QEvent>
#include <QChildEvent>
#include <QPointer>
#ifdef QT_OLD_VERSION_5_5
    #include <QOpenGLWidget>
#endif
#include <QMessageBox>

class QBlocksWebView : public QWebEngineView
{
public:
#ifndef QT_OLD_VERSION_5_5
    QBlocksWebView();
#endif
    QBlocksWebView(QWidget *parent = 0);

#ifdef QT_OLD_VERSION_5_5
    bool event(QEvent * ev);
#endif
    void zoomIn();
    void zoomOut();

protected:
#ifdef QT_OLD_VERSION_5_5
    bool eventFilter(QObject *obj, QEvent *ev);
#else
    void wheelEvent(QWheelEvent *event);
#endif

private:
#ifdef QT_OLD_VERSION_5_5
    QPointer<QOpenGLWidget> child_;
#endif
    void init();
    void doZoom(float scale);

signals:
#ifdef QT_OLD_VERSION_5_5
    void delegateWheel(QWheelEvent *event);
#endif
};

#endif // QBLOCKSWEBVIEW_H
