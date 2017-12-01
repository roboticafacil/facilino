#ifndef QBLOCKSWEBVIEW_H
#define QBLOCKSWEBVIEW_H

#include <QObject>
#include <QWebEngineView>
#include <QWheelEvent>
#include <QEvent>
#include <QChildEvent>
#include <QPointer>
#include <QOpenGLWidget>
#include <QMessageBox>



class QBlocksWebView : public QWebEngineView
{
public:
    //QBlocksWebView();
    QBlocksWebView(QWidget *parent = 0);
    //void wheelEvent(QWheelEvent *event);
    bool event(QEvent * ev);
    void zoomIn();
    void zoomOut();

protected:
    bool eventFilter(QObject *obj, QEvent *ev);

private:
    QPointer<QOpenGLWidget> child_;

    void init();
    void doZoom(float scale);

signals:
    void delegateWheel(QWheelEvent *event);
public slots:
};

#endif // QBLOCKSWEBVIEW_H
