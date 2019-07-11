#ifndef WEBVIEW_H
#define WEBVIEW_H

#include <QObject>
#include <QWebEngineView>

class WebView : public QWebEngineView
{
public:
    WebView();
    WebView(QWidget *parent = nullptr);
};

#endif // WEBVIEW_H
