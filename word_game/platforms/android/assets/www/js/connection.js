/**
 * Created by ahmetce on 28.10.2015.
 */


var connection = {

    // Used in back key event

    states : {
        online : 0,
        offline : 1
    },

    _currentState : 0,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        //this.checkInternetConnection();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener(CONSTANTS.events.connection.OFFLINE, connection.onStateOffline, false);
        document.addEventListener(CONSTANTS.events.connection.ONLINE, connection.onStateOnline, false);
    },

    //When the application's network connection changes to being offline, the offline event is fired.
    onStateOffline: function() {
        _currentState : this.states.offline;
    },

    // When the application's network connection changes to being online, the online event is fired.
    onStateOnline: function() {
        _currentState : this.states.online;
    },

    checkInternetConnection : function () {

        var testLink = CONSTANTS.strings.connection.LINK_CONNECTION_TEST;
        jQuery.ajaxSetup({async:false});
        var result = "";

        $.get(testLink ,function(d){
            result = true;
        }).error(function(){
            result = false;
        });

        if (!result)
        {
            this._currentState = this.states.online;
            messageBox.showInfoDialog(CONSTANTS.strings.connection.MESSAGE_OFFLINE, // message
                            null, // callback
                            [CONSTANTS.strings.connection.M_BTN_OKEY]); // button label
        }
        else
        {
            this._currentState = this.states.online;
        }
    },

    // return offline or online
    getDeviceConnection : function (){
        return this._currentState;
    }
};