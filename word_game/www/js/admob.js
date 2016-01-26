var ADMOB = {

    //var _self = this;

    admobID : {},

    _adShownCallback : null,
    _adClosedCallback: null,
    _adClickedCallback : null,
    _adBannerClickedCallback : null,
    _adLoadedCallback: null,

    initAdvIDs : function () {
        if( /(android)/i.test(navigator.userAgent) ) {
            ADMOB.admobID = { // for Android
                banner: 'ca-app-pub-9021522995312246/1620365215',
                interstitial: 'ca-app-pub-9021522995312246/3097098412'
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            ADMOB.admobID = { // for iOS
                banner: 'ca-app-pub-9021522995312246/1759966013',
                interstitial: 'ca-app-pub-9021522995312246/3236699216'
            };
        } else {
            ADMOB.admobID = { // for Windows Phone
                banner: 'ca-app-pub-9021522995312246/6190165615',
                interstitial: 'ca-app-pub-9021522995312246/7666898815'
            };
        }
    },

    initAdvOptions : function(){
        var defaultOptions = {
            adSize: 'SMART_BANNER',
            // width: integer, // valid when set adSize 'CUSTOM'
            // height: integer, // valid when set adSize 'CUSTOM'
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
            bgColor: '#1A2631', // color name, or '#RRGGBB'
            // x: integer,		// valid when set position to 0 / POS_XY
            // y: integer,		// valid when set position to 0 / POS_XY
            isTesting: true // set to true, to receiving test ad for testing purpose
            // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show

        };

        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }

        AdMob.setOptions( defaultOptions );
        ADMOB.registerAdEvents();
    },

    // optional, in case respond to events or handle error
    registerAdEvents : function() {
        // new events, with variable to differentiate: adNetwork, adType, adEvent
        document.addEventListener('onAdFailLoad', function(data){
            ADMOB.onAdFailLoad(data);
        });
        document.addEventListener('onAdLoaded', function(data){
            ADMOB.onAdLoaded(data);
        });
        document.addEventListener('onAdPresent', function(data){
            ADMOB.onAdPresent(data);
        });
        document.addEventListener('onAdLeaveApp', function(data){
            ADMOB.onAdLeaveApp(data);
        });
        document.addEventListener('onAdDismiss', function(data){
            ADMOB.onAdDismiss(data);
        });
    },

    loadAdmob : function (){
        if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
            document.addEventListener('deviceready', ADMOB.initialize, false);
        } else {
            ADMOB.initialize();
        }
    },


    initialize : function () {
        //return;
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        ADMOB.initAdvIDs();
        ADMOB.initAdvOptions();
        ADMOB.createAdvBanner();
    },

    createAdvBanner: function(iOverlap,iOffsetTopBar) {
        if (typeof iOverlap === CONSTANTS.strings.global.UNDEFINED)
        {
            iOverlap = true;
        }
        if (typeof iOffsetTopBar === CONSTANTS.strings.global.UNDEFINED)
        {
            iOffsetTopBar = false;
        }

        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }

        AdMob.createBanner( {adId:ADMOB.admobID.banner, overlap:iOverlap, offsetTopBar:iOffsetTopBar,autoShow : true} );
    },

    showAdvBanner : function(){

    },

    hideAdvBanner : function(){
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        AdMob.hideBanner();
    },

    removeAdvBanner : function () {
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        AdMob.removeBanner();
    },

    createAdvBannerBySize : function(inputWidth,inputHeight) {
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        AdMob.createBanner( {adId:ADMOB.admobID.banner, width:inputWidth, height:inputHeight} );
    },

    prepareFullScreenAdv : function(autoshow, successCallback, errorCallback) {
        //return;
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }

        if (typeof successCallback === CONSTANTS.strings.global.UNDEFINED &&
            typeof errorCallback === CONSTANTS.strings.global.UNDEFINED )
        {
            window.AdMob.prepareInterstitial({adId:ADMOB.admobID.interstitial, autoShow:autoshow});
        }
        else
        {

            window.AdMob.prepareInterstitial({adId:ADMOB.admobID.interstitial, autoShow:autoshow}, successCallback, errorCallback);
        }

    },

    showFullScreenAdv : function(){
        //return;
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        //ADMOB.prepareFullScreenAdv(false);
        AdMob.showInterstitial();
    },

    hideFullScreenAdv : function(){

    },

    isFullScreenAdvReady : function(callback) {
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        AdMob.isInterstitialReady(callback);
    },


    /* EVENT FUNCTIONS*/

    //data.adNetwork, the Ad network name, like 'AdMob', 'Flurry', 'iAd', etc.
    //data.adType, 'banner' or 'interstitial'
    //data.adEvent, the event name

    //Triggered when failed to receive Ad.
    onAdFailLoad : function(data) {
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }


        //alert('error: ' + data.error +
        //    ', reason: ' + data.reason +
        //    ', adNetwork:' + data.adNetwork +
        //    ', adType:' + data.adType +
        //    ', adEvent:' + data.adEvent); // adType: 'banner', 'interstitial', etc.


        if(data.adType == 'banner'){
            //AdMob.hideBanner();
        }
        else if(data.adType == 'interstitial'){

        }
    },

    onAdLoaded : function(data) {
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        if(data.adType == 'banner'){
            //AdMob.showBanner();
        }
        else if(data.adType == 'interstitial' &&
                ADMOB._adLoadedCallback !== null)
        {
            ADMOB._adLoadedCallback();
        }
    },

    //Triggered when Ad will be showed on screen.
    onAdPresent : function(data) {
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }
        if(data.adType == 'banner'){
        }
        else if(data.adType == 'interstitial' &&
                ADMOB._adShownCallback !== null)
        {
            ADMOB._adShownCallback();
        }
    },

    //Triggered when user click the Ad, and will jump out of your App.
    onAdLeaveApp : function(data) {
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }

        if( data.adType == 'banner' &&
            ADMOB._adBannerClickedCallback !== null)
        {

            ADMOB._adBannerClickedCallback();
        }
        else if(data.adType == 'interstitial' &&
                ADMOB._adClickedCallback !== null)
        {
            ADMOB._adClickedCallback();
        }
    },

    //Triggered when dismiss the Ad and back to your App.
    onAdDismiss : function(data) {
        if (typeof AdMob === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }

        if(data.adType == 'banner'){
        }
        else if(data.adType == 'interstitial'&&
                ADMOB._adClosedCallback !== null)
        {
            ADMOB._adClosedCallback();
        }
    },

    setFullScreenAdShownCallback : function (callback) {
        ADMOB._adShownCallback = callback;
    },

    setFullScreenAdClosedCallback : function (callback) {
        ADMOB._adClosedCallback = callback;
    },

    setFullScreenAdClickedCallback : function (callback) {
        ADMOB._adClickedCallback = callback;
    },

    setBannerAdClickedCallback : function (callback) {
        ADMOB._adBannerClickedCallback = callback;
    },

    setFullScreenAdLoadedCallback : function (callback) {
        ADMOB._adLoadedCallback = callback;
    }

};
