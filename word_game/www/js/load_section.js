$(document).ready(function(){
    var descriptionArea = $('#descriptionArea');
    var leftButton      = $('#leftButton');
    var rightButton     = $('#rightButton');
    var questionArea    = $('#questionArea');
    var timerContainer  = $('#timerContainer');
    var stepContainer   = $('#stepContainer');

    var currentQuestionNumber = 1;

    var s_id = 0;

    $.ajax({
        url: 'http://localhost/word_game_web_service.php?s_id=' + s_id,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data, status){

            descriptionArea.append(data['S_DESC']);
            leftButton.append(data['ANSWERS'][0]);
            rightButton.append(data['ANSWERS'][1]);

            var questionNumberId = 'Q_TEXT' + (currentQuestionNumber - 1);
            questionArea.append(data['QUESTIONS'][questionNumberId]);
            timerContainer.append(data['S_TIME']);

            var step = currentQuestionNumber + "/" + data['Q_COUNT'];

            stepContainer.append(step);
       
        },
        error: function(){
           output.text('There was an error loading the data.');
        }
    });

});