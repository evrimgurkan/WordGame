/**
 * Created by ahmetce on 13.12.2015.
 */

var SplashScreen = {

    hide : function() {
        if (typeof navigator.splashscreen === 'undefined')
        {
            return;
        }

        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 3000);
    },

    show : function() {
        if (typeof navigator.splashscreen === 'undefined')
        {
            return;
        }
        navigator.splashscreen.show();

        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 3000);
    }
};