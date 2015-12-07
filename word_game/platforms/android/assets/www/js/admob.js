var ADMOB = {

    //var _self = this;

    admobID : {},

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
            //bgColor: 'black', // color name, or '#RRGGBB'
            // x: integer,		// valid when set position to 0 / POS_XY
            // y: integer,		// valid when set position to 0 / POS_XY
            isTesting: true // set to true, to receiving test ad for testing purpose
            // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show

        };
        AdMob.setOptions( defaultOptions );
        ADMOB.registerAdEvents();
    },

    // optional, in case respond to events or handle error
    registerAdEvents : function() {
        // new events, with variable to differentiate: adNetwork, adType, adEvent
        document.addEventListener('onAdFailLoad', function(data){
            alert('error: ' + data.error +
                ', reason: ' + data.reason +
                ', adNetwork:' + data.adNetwork +
                ', adType:' + data.adType +
                ', adEvent:' + data.adEvent); // adType: 'banner', 'interstitial', etc.
        });
        document.addEventListener('onAdLoaded', function(data){});
        document.addEventListener('onAdPresent', function(data){});
        document.addEventListener('onAdLeaveApp', function(data){});
        document.addEventListener('onAdDismiss', function(data){});
    },

    loadAdmob : function (){
        if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
            document.addEventListener('deviceready', ADMOB.initialize, false);
        } else {
            ADMOB.initialize();
        }
    },


    initialize : function () {
        if (typeof AdMob === 'undefined')
        {
            alert('Admob is undefined');
        }
        if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

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

        AdMob.createBanner( {adId:ADMOB.admobID.banner, overlap:iOverlap, offsetTopBar:iOffsetTopBar,autoShow : true} );
    },

    showAdvBanner : function(){

    },

    hideAdvBanner : function(){
        AdMob.hideBanner();
    },

    removeAdvBanner : function () {
        AdMob.removeBanner();
    },

    createAdvBannerBySize : function(inputWidth,inputHeight) {

        AdMob.createBanner( {adId:ADMOB.admobID.banner, width:inputWidth, height:inputHeight} );
    },

    prepareFullScreenAdv : function(autoshow) {
        alert('before prepare, autoshow : ' + autoshow);
        if (typeof AdMob === 'undefined')
        {
            alert('prepareFullScreenAdv Admob is undefined');
        }
        window.AdMob.prepareInterstitial({adId:ADMOB.admobID.interstitial, autoShow:true});
        alert('after prepare fullscreen');
    },

    showFullScreenAdv : function(){
        alert('before prepare, showInterstitial: ');
        ADMOB.prepareFullScreenAdv(false);
        AdMob.showInterstitial();
        alert('after AdMob.showInterstitial();');
    },

    hideFullScreenAdv : function(){

    },

    isFullScreenAdvReady : function(callback) {
        AdMob.isInterstitialReady(callback);
    }
};
