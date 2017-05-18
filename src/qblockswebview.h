#ifndef QBLOCKSWEBVIEW_H
#define QBLOCKSWEBVIEW_H

#include <QWebView>
#include <QWheelEvent>

class QBlocksWebView : public QWebView
{
public:
    QBlocksWebView(QWidget *parent = 0);

    void zoomIn();
    void zoomOut();

private:
    void wheelEvent(QWheelEvent *event);

    void init();
    void doZoom(double scale);

signals:

public slots:
};

#endif // QBLOCKSWEBVIEW_H
