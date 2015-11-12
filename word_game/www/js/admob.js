var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-9021522995312246/3111091613',
        interstitial: 'pub-9021522995312246'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-9021522995312246',
        interstitial: 'ca-app-pub-9021522995312246'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-9021522995312246',
        interstitial: 'ca-app-pub-9021522995312246'
    };
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    initApp();
    alert('after init');
}

function initApp() {
    alert('enter init app');
    if ( ! AdMob ) { alert( 'admob plugin not ready' );  }
    alert('create banner');
    AdMob.createBanner( {
        adId: admobid.banner, 
        isTesting: true,
        overlap: false,
        offsetTopBar: false,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        bgColor: 'black'
    } );

    //AdMob.prepareInterstitial({
    //    adId: admobid.interstitial,
    //    autoShow: true
    //});
}

