package es.roboticafacil.facilino;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by leoaran on 30/01/2018.
 */

public class WebAppInterface {
    private MainActivity activity;

    /** Instantiate the interface and set the context */
    WebAppInterface(MainActivity a) {
        activity = a;
    }

    @JavascriptInterface void showToast(String s)
    {
        Toast.makeText(activity,s,Toast.LENGTH_LONG).show();
    }

    @JavascriptInterface
    public void showHideUndo(boolean state){
        if (activity!=null)
            activity.showHideUndo(state);
    }

    @JavascriptInterface
    public void showHideRedo(boolean state){
        if (activity!=null)
            activity.showHideRedo(state);
    }
}
