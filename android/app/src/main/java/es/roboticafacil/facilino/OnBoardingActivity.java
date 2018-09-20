package es.roboticafacil.facilino;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v4.view.ViewPager;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.ImageView;
import android.widget.Button;
import android.widget.Toast;
import java.util.ArrayList;

/**
 * A {@link OnBoardingActivity} that presents a set of application settings. On
 * handset devices, settings are presented as a single list. On tablets,
 * settings are split by category, with category headers shown to the left of
 * the list of settings.
 * <p>
 * See <a href="http://developer.android.com/design/patterns/settings.html">
 * Android Design: Settings</a> for design guidelines and the <a
 * href="http://developer.android.com/guide/topics/ui/settings.html">Settings
 * API Guide</a> for more information on developing a Settings UI.
 */
public class OnBoardingActivity extends AppCompatActivity {
    private final Context context = this;
    private LinearLayout pager_indicator;
    private int dotsCount;
    private ImageView[] dots;
    private SharedPreferences sharedPref;

    private ViewPager onboard_pager;

    private OnBoard_Adapter mAdapter;

    private Button btn_get_started;
    private Button btn_skip;
    int previous_pos=0;


    ArrayList<OnBoardItem> onBoardItems=new ArrayList<>();

    private boolean isTablet(Context context) {
        boolean xlarge = ((context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == 4);
        boolean large = ((context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_LARGE);
        return (xlarge || large);
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        sharedPref= PreferenceManager.getDefaultSharedPreferences(context);
        if (sharedPref.getBoolean("skip", false))
        {
            Intent myIntent = new Intent(context, MainActivity.class);
            startActivity(myIntent);
        }
        setContentView(R.layout.activity_on_boarding);

        btn_get_started = (Button) findViewById(R.id.btn_get_started);
        btn_skip = (Button) findViewById(R.id.btn_skip);
        onboard_pager = (ViewPager) findViewById(R.id.pager_introduction);
        pager_indicator = (LinearLayout) findViewById(R.id.viewPagerCountDots);

        loadData();

        mAdapter = new OnBoard_Adapter(this,onBoardItems);
        onboard_pager.setAdapter(mAdapter);
        onboard_pager.setCurrentItem(0);
        hide_animation2();

        onboard_pager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
            }

            @Override
            public void onPageSelected(int position) {

                // Change the current position intimation

                for (int i = 0; i < dotsCount; i++) {
                    dots[i].setImageDrawable(ContextCompat.getDrawable(OnBoardingActivity.this, R.drawable.non_selected_item_dot));
                }

                dots[position].setImageDrawable(ContextCompat.getDrawable(OnBoardingActivity.this, R.drawable.selected_item_dot));


                int pos=position+1;

                if(pos==dotsCount&&previous_pos==(dotsCount-1)) {
                    show_animation2();
                }
                else if(pos==(dotsCount-1)&&previous_pos==dotsCount)
                {
                    hide_animation2();
                }

                previous_pos=pos;
            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });

        btn_get_started.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent myIntent = new Intent(context, MainActivity.class);
                startActivity(myIntent);
            }
        });

        btn_skip.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SharedPreferences.Editor preferencesEditor = sharedPref.edit();
                preferencesEditor.putBoolean("skip", true);
                preferencesEditor.commit();
                Intent myIntent = new Intent(context, MainActivity.class);
                startActivity(myIntent);
            }
        });

        setUiPageViewController();

    }

    // Load data into the viewpager

    public void loadData()
    {
        int[] header = {R.string.ob_header1, R.string.ob_header2, R.string.ob_header3, R.string.ob_header4, R.string.ob_header5, R.string.ob_header6, R.string.ob_header7, R.string.ob_header8};
        int[] desc = {R.string.ob_desc1, R.string.ob_desc2, R.string.ob_desc3, R.string.ob_desc4, R.string.ob_desc5, R.string.ob_desc6, R.string.ob_desc7, R.string.ob_desc8};
        int[] imageId = {R.drawable.facilino_splash, R.drawable.multiplatform, R.drawable.arduino_uno, R.drawable.categories, R.drawable.multilanguage, R.drawable.arduino_logo, R.drawable.example, R.drawable.unlock};
        int[] imagePhoneId = {R.drawable.facilino_splash2, R.drawable.multiplatform2, R.drawable.arduino_uno2, R.drawable.categories2, R.drawable.multilanguage2, R.drawable.arduino_logo2, R.drawable.example2, R.drawable.unlock2};

        for(int i=0;i<imageId.length;i++)
        {
            OnBoardItem item=new OnBoardItem();
            if (isTablet(context))
              item.setImageID(imageId[i]);
            else
                item.setImageID(imagePhoneId[i]);
            item.setTitle(getResources().getString(header[i]));
            item.setDescription(getResources().getString(desc[i]));

            onBoardItems.add(item);
        }
    }

    // Button bottomUp animation

    public void show_animation()
    {
        Animation show = AnimationUtils.loadAnimation(this, R.anim.slide_up_anim);

        btn_get_started.startAnimation(show);

        show.setAnimationListener(new Animation.AnimationListener() {

            @Override
            public void onAnimationStart(Animation animation) {
                btn_get_started.setVisibility(View.VISIBLE);
            }

            @Override
            public void onAnimationRepeat(Animation animation) {
            }

            @Override
            public void onAnimationEnd(Animation animation) {

                btn_get_started.clearAnimation();

            }

        });


    }

    public void show_animation2()
    {
        final Animation show = AnimationUtils.loadAnimation(this, R.anim.slide_up_anim);
        Animation hide = AnimationUtils.loadAnimation(this, R.anim.slide_down_anim);

        btn_skip.startAnimation(hide);

        hide.setAnimationListener(new Animation.AnimationListener() {

            @Override
            public void onAnimationStart(Animation animation) {
            }

            @Override
            public void onAnimationRepeat(Animation animation) {
            }

            @Override
            public void onAnimationEnd(Animation animation) {

                btn_skip.clearAnimation();
                btn_skip.setVisibility(View.GONE);
                btn_get_started.startAnimation(show);
            }

        });

        show.setAnimationListener(new Animation.AnimationListener() {

            @Override
            public void onAnimationStart(Animation animation) {
                btn_get_started.setVisibility(View.VISIBLE);
            }

            @Override
            public void onAnimationRepeat(Animation animation) {
            }

            @Override
            public void onAnimationEnd(Animation animation) {
                btn_get_started.clearAnimation();
            }
        });


    }

    // Button Topdown animation

    public void hide_animation()
    {
        Animation hide = AnimationUtils.loadAnimation(this, R.anim.slide_down_anim);

        btn_get_started.startAnimation(hide);

        hide.setAnimationListener(new Animation.AnimationListener() {

            @Override
            public void onAnimationStart(Animation animation) {

            }

            @Override
            public void onAnimationRepeat(Animation animation) {
            }

            @Override
            public void onAnimationEnd(Animation animation) {

                btn_get_started.clearAnimation();
                btn_get_started.setVisibility(View.GONE);

            }

        });


    }

    public void hide_animation2()
    {
        final Animation show = AnimationUtils.loadAnimation(this, R.anim.slide_up_anim);
        Animation hide = AnimationUtils.loadAnimation(this, R.anim.slide_down_anim);

        btn_get_started.startAnimation(hide);

        hide.setAnimationListener(new Animation.AnimationListener() {

            @Override
            public void onAnimationStart(Animation animation) {

            }

            @Override
            public void onAnimationRepeat(Animation animation) {
            }

            @Override
            public void onAnimationEnd(Animation animation) {

                btn_get_started.clearAnimation();
                btn_get_started.setVisibility(View.GONE);
                btn_skip.startAnimation(show);
            }

        });

        show.setAnimationListener(new Animation.AnimationListener() {

            @Override
            public void onAnimationStart(Animation animation) {
                btn_skip.setVisibility(View.VISIBLE);
            }

            @Override
            public void onAnimationRepeat(Animation animation) {
            }

            @Override
            public void onAnimationEnd(Animation animation) {
                btn_skip.clearAnimation();
            }
        });
    }

    // setup the
    private void setUiPageViewController() {

        dotsCount = mAdapter.getCount();
        dots = new ImageView[dotsCount];

        for (int i = 0; i < dotsCount; i++) {
            dots[i] = new ImageView(this);
            dots[i].setImageDrawable(ContextCompat.getDrawable(OnBoardingActivity.this, R.drawable.non_selected_item_dot));

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );

            params.setMargins(6, 0, 6, 0);

            pager_indicator.addView(dots[i], params);
        }

        dots[0].setImageDrawable(ContextCompat.getDrawable(OnBoardingActivity.this, R.drawable.selected_item_dot));
    }
}
