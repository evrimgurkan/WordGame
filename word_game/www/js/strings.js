/**
 * Created by ahmetce on 28.10.2015.
 */

var CONSTANTS = {
    /**
     * USE Prefix for ;
     * Messages         : MESSAGE_
     * Message buttons  : M_BTN_
     * Cases            : CASE_
     * Links            : LINK_
     * Colors           : COLOR_
     */
    strings : {
        global : {
            UNDEFINED : 'undefined'

        },

        game : {
             COLOR_BLUE : '#3c5cff',
             COLOR_GREEN : '#6FDB6F',
             COLOR_RED : '#980F0F',

             MESSAGE_TIME_IS_UP : 'Zaman Tükendi!',
             MESSAGE_COMPLETED_QUESTIONS : 'Tebrikler, Tüm soruları cevapladınız.',
             MESSAGE_NO_DATA : 'Sorular yüklenemedi, internet bağlantınızı kontrol edin ve yeniden deneyin.',
             MESSAGE_SCORE : ' Puanınız : ',
             M_BTN_RETRY : 'Yeniden Dene',
             M_BTN_BACK : 'Geri',
             MESSAGE_QUESTIONS_LOADING : 'Sorular Yükleniyor...',
             M_BTN_REPLAY : 'Yeniden Oyna',
             M_BTN_NEXTGAME : 'Sonraki',
             MESSAGE_CONTINUE_GAME : '5 sn içinde oyun devam edecek.'
        },

        application: {
            MESSAGE_CONTINUE_GAME : '5 sn içinde oyun devam edecek.',
            LINK_WEB_SERVICE : 'http://localhost/word_game_web_service.php?s_id=',
            LEFT_BUTTON_ERROR_VALUE : ' ',
            RIGHT_BUTTON_ERROR_VALUE : ' '
        },

        connection : {
            LINK_CONNECTION_TEST : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACrElEQVR42u2Xz2sTQRSAX8VSb1K8iNqKooJH2Ux6Ksn+iPQqxZMIehJB0do/IMhmQWsvHr2KSEGk0tSLIoWIYNUKij20F2/N7iaUZnYT0kYzzhMKs0HDJiTdLcwHDwKZSd63781LBiQSSW9JZdkhzfKm1Rz9mjZp/W9YdEU3vXv4HsQZ40FtNG36q5rls//Ej4tmbSS2T15Mvp3ExOPmEMQNbBtMMEyoljcFcQN7PqyAlqNfIG7gYQ0tYNIaxA1MrJPY3wImbUqBKAXSFv0tBSIVMOkvKRDtGKWN/T6FdqRAxFNoWwpEPIXqUqBT6ALU/UVgu8GW4GD3f6f9TRDYNJTDrk7YbtiqUumHwIYoUJuHERDAS0r4CvgFECgbY+cFAR7KT+g1POmCKFDNw6WggHc3fBtVb4CAoyauBgXIG+g1Xh5mRAGah6cggBd11fK/h7lOprIs0H6uRl6KAo5O7kOv4QmPiwJ4Jqqv4FiwCtXjvD2+tRmfK6kZ/ygI2HritK0rDVGgrClJ6DWMwYC/AGuCBMYcIC2V0CzvjmbRz3j3xUjn6CfeYreUJ2wQkGD75INPX1mFfsEFrrcIYCvdhC4paWQakxajpJMr0C9YFg54i7AsClRmh9/xnr0NHcInzZStk2aLwAcGMAD9pPIazvFKVDD5rdnhJeHLX5RTyRPQHpz5o66emMc9wdlPtvA8wF7Aq2BUHh1525qEo5JtR1WeOXpickO9cJIpyuD6xJmhYiZ5ytWSl3mlnuOaf+2zDaLDXmJrSgZ/MYVEugo+gSh+FkSBa4yd5Ul87DZ5XpFl/AyIEjzYjkau8WqshU2cr13HPbgX4gJOD97n465GZlyVvC9mSKloKI2iTnbwNT+gBX54H+IaXAtxJzE3ycSAFqSAFJACUkAikXD+AHj5/wx2o5osAAAAAElFTkSuQmCC',
            MESSAGE_OFFLINE : 'Oyuna başlamak için internet bağlantısı gerekiyor, Lütfen internet bağlantınızı kontrol edin!',
            M_BTN_OKEY : 'Tamam'
        },

        navigation : {
            MESSAGE_EXIT_APPLICATION : 'Çıkmak istiyor musunuz?',
            M_BTN_EXIT_APPLICATION_CONFIRM : 'Evet',
            M_BTN_EXIT_APPLICATION_CANCEL : 'Hayır',
            CASE_START_APPLICATION : 'startGame',
            CASE_GOTO_HOWTO_PAGE : 'howToButton',
            LINK_GAME_SCREEN_PAGE : 'views/gameScreen.html',
            LINK_HOWTO_PAGE : 'views/howto.html',
            MESSAGE_NO_CONNECTION : 'Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz!',
            M_BTN_RETRY : 'Tekrar Dene'
        }
    },

    events : {
        connection : {
            OFFLINE : 'offline',
            ONLINE : 'online'
        },

        application : {
            PAUSE : 'pause',
            RESUME : 'resume'
        },

        navigation : {
            BACK_BUTTON : 'backbutton',
            MENU_BUTTON : 'menubutton'
        }

    }

};