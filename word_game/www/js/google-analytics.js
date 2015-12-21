var GA = {

    //var _self = this;

    analyticsID : "",

    initAnalyticIDs : function () {
        if( /(android)/i.test(navigator.userAgent) ) {
            GA.analyticsID = { // for Android
                value: 'UA-71268569-1',
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            GA.analyticsID = { // for iOS
                value: 'UA-71268569-1',
            };
        } else {
            GA.analyticsID = { // for Windows Phone
                value: 'UA-71268569-1',
            };
        }
    },

    loadAnalytics : function (){
        if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
            document.addEventListener('deviceready', GA.initialize, false);
        } else {
            GA.initialize();
        }
    },


    initialize : function () {
        if (typeof window.analytics === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        GA.initAnalyticIDs();
        GA.startTracker();
    },

    startTracker: function() {
        if (typeof  window.analytics === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        window.analytics.startTrackerWithId(GA.analyticsID.value);
    },

    // To track a Screen (PageView):
    trackView: function(screen_title) {
        if (typeof  window.analytics === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        window.analytics.trackView(screen_title);
    },

    // To track an Event:
    // Label and Value are optional, Value is numeric
    // category, action, label are string
    trackEvent: function(category, action, label, value) {
        if (typeof  window.analytics === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }

        if (typeof label === CONSTANTS.strings.global.UNDEFINED &&
            typeof value === CONSTANTS.strings.global.UNDEFINED )
        {
            window.analytics.trackEvent(category, action);
        }
        else
        {
            window.analytics.trackEvent(category, action, label, value);
        }
    },

    // To track an Exception:
    // Fatal is boolean
    trackException: function(description, isFatal) {
        if (typeof  window.analytics === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        window.analytics.trackException(description,isFatal);
    },

    // To add a Transaction (Ecommerce)
    // Revenue, Tax, and Shipping are numeric
    // ID, affiliation, currency_code are string
    addTransaction: function(ID, affiliation, revenue, tax, shipping, currency_code) {
        if (typeof  window.analytics === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        window.analytics.addTransaction(ID, affiliation, revenue, tax, shipping, currency_code);
    },

    //key, value are string
    addCustomDimension: function(key, value, success, error) {
        if (typeof  window.analytics === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        window.analytics.addCustomDimension(key, value, success, error);
    },

    // myUserId string
    setUserId: function(myUserId) {
        if (typeof  window.analytics === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        window.analytics.setUserId(myUserId);
    },

    enableVerboseDebug: function() {
        if (typeof  window.analytics === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        window.analytics.debugMode();
    },

    // To enable/disable automatic reporting of uncaught exceptions
    // enable is boolean
    enableDisableAutomaticReporting : function(enable, success, error) {
        if (typeof  window.analytics === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        window.analytics.enableUncaughtExceptionReporting(enable, success, error);
    }
};
