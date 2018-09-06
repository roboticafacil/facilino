package es.roboticafacil.arduinotutorial;

import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.Window;
import android.webkit.ConsoleMessage;
import android.webkit.JsPromptResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private WebView myWebView;
    private final Activity activity = this;
    private final Context context = this;

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    myWebView.loadUrl("file:///android_asset/html/indexAndroid.html");
                    return true;
                case R.id.navigation_arduino:
                    myWebView.loadUrl("file:///android_asset/html/arduino.html");
                    return true;
                case R.id.navigation_electronics:
                    myWebView.loadUrl("file:///android_asset/html/electronics.html");
                    return true;
                case R.id.navigation_facilino:
                    myWebView.loadUrl("file:///android_asset/html/facilino_programming.html");
                    return true;
                case R.id.navigation_exercises:
                    myWebView.loadUrl("file:///android_asset/html/exercises.html");
                    return true;
                /*case R.id.navigation_about:
                    myWebView.loadUrl("file:///android_asset/html/about.html");
                    return true;
                case R.id.navigation_feedback:
                    myWebView.loadUrl("file:///android_asset/html/feedback.html");
                    return true;
                case R.id.navigation_get_facilino:
                    myWebView.loadUrl("https://roboticafacil.es/en/download");
                    return true;
                case R.id.navigation_shop:
                    myWebView.loadUrl("https://roboticafacil.es/en/shop");
                    return true;*/
            }
            return false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Window w = getWindow();
        w.setTitle(context.getString(R.string.app_name));
        setContentView(R.layout.activity_main);
        myWebView = (WebView) findViewById(R.id.webview);
        WebSettings webSettings = myWebView.getSettings();
        //webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setDomStorageEnabled(true);
        //myWebView.addJavascriptInterface(new WebAppInterface(this), "Android");
        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);

        myWebView.setWebChromeClient(new WebChromeClient() {

            public void onProgressChanged(WebView view, int progress) {
                activity.setTitle(context.getString(R.string.app_name) + " " + context.getString(R.string.loading) + "..." + progress + "%");
                activity.setProgress(progress * 100);

                if (progress == 100) {
                    activity.setTitle(context.getString(R.string.app_name));
                }
            }

            public boolean onConsoleMessage(ConsoleMessage cm) {
                Log.d("Arduino Tutorial", cm.message() + " -- From line "
                        + cm.lineNumber() + " of "
                        + cm.sourceId());
                return true;
            }

            @Override
            public boolean onJsPrompt(WebView view, String origin, String message, String defaultValue, final JsPromptResult result) {
                final EditText txtUrl = new EditText(context);
                txtUrl.setSingleLine();
                new AlertDialog.Builder(context)
                        .setTitle(R.string.app_name)
                        .setMessage(message)
                        .setView(txtUrl)
                        .setPositiveButton(android.R.string.ok,
                                new AlertDialog.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int wicht) {
                                        result.confirm(txtUrl.getText().toString());
                                    }
                                }).setCancelable(false)
                        .create()
                        .show();
                return true;
            }

            ;
        });

        myWebView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                // Handle the error
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        myWebView.loadUrl("file:///android_asset/html/indexAndroid.html");
        //myWebView.loadUrl("file:///android_asset/html/index.html?device=Android");
    }

}
