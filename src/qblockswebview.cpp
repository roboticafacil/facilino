#include "qblockswebview.h"

#ifndef QT_OLD_VERSION_5_5
QBlocksWebView::QBlocksWebView() {
}

QBlocksWebView::QBlocksWebView(QWidget *parent): QWebEngineView(parent)
#else
QBlocksWebView::QBlocksWebView(QWidget *parent): QWebEngineView(parent), child_(nullptr)
#endif
{
}

#ifndef QT_OLD_VERSION_5_5
void QBlocksWebView::wheelEvent(QWheelEvent *event)
{
    if (event->delta()>0)
        zoomIn();
    else
        zoomOut();
    event->accept();
}
#endif


#ifdef QT_OLD_VERSION_5_5
bool QBlocksWebView::eventFilter(QObject *obj, QEvent *ev)
{
        // emit delegatePaint on paint event of the last added QOpenGLWidget child
        if (obj == child_ && ev->type() == QEvent::Wheel) {
            QWheelEvent *we = static_cast<QWheelEvent*>(ev);
            // do something with paint event
            // ...
            // or just emit signal to notify other objects
            emit delegateWheel(we);
        }
        return QWebEngineView::eventFilter(obj, ev);
}

bool QBlocksWebView::event(QEvent * ev)
{
    if (ev->type() == QEvent::ChildAdded) {
        QChildEvent *child_ev = static_cast<QChildEvent*>(ev);

        // there is also QObject child that should be ignored here;
        // use only QOpenGLWidget child
        QOpenGLWidget *w = qobject_cast<QOpenGLWidget*>(child_ev->child());
        if (w) {
            child_ = w;
            w->installEventFilter(this);
        }
    }
    return QWebEngineView::event(ev);
}

void QBlocksWebView::delegateWheel(QWheelEvent *event)
{
    // Capture mouse wheel events.
    // Zoom the WebView
    float scale = event->delta() / 120.0 / 10.0;
    doZoom(scale);
}
#endif

void QBlocksWebView::doZoom(float scale) {
    // Apply zoom (in: scale > 0, out: scale < 0)
    if ((scale > 0 && zoomFactor() < 1.5) ||
        (scale < 0 && zoomFactor() > 0.5)) {
        setZoomFactor(scale + zoomFactor());
    }
}

void QBlocksWebView::zoomIn() {
    doZoom((float)0.1);
}

void QBlocksWebView::zoomOut() {
    doZoom((float)-0.1);
}
