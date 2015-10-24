/**
 * Created by ahmetce on 17.10.2015.
 */
var navigation = {

    // Used in back key event
    _previousPage : undefined,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    setPreviousPage : function(previousPage) {
        _previousPage = previousPage;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.onBackKeyDown, false);        // Register the event listener
        document.addEventListener("menubutton", this.onMenuKeyDown, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

    },

    onMenuKeyDown: function() {
        alert("menuye basıldı");
    },

    onBackKeyDown: function() {
        alert("back key basıldı");
        if (_previousPage !== undefined)
        {
            window.location = _previousPage;
        }
        else
        {
            alert("Çıkmak istiyor musunuz?");
        }
    },

    navigateToPage: function (buttonID) {
        switch (buttonID)
        {
            case 'offlineMode':
            {
                window.location = 'views/gameScreen.html';
                break;
            }
            case 'howToButton':
            {
                window.location = 'views/howto.html';
                break;
            }
            default :
            {
                break;
            }
        }
    },

    navigateToLogin: function (buttonID)
    {

    }

};