    window.questionList             = [];
    window.currentQuestionNumber    = 1;
    window.totalQuestionNumber      = -1;

$(document).ready(function(){
    var descriptionArea = $('#descriptionArea');
    var leftButton      = document.getElementById("leftButton");
    var rightButton     = document.getElementById("rightButton");
    var questionArea    = $('#questionArea');
    var timerContainer  = $('#timerContainer');
    var stepContainer   = $('#stepContainer');

    var s_id = 0;

    $.ajax({
        url: 'http://localhost/word_game_web_service.php?s_id=' + s_id,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data, status){

            descriptionArea.append(data['S_DESC']);
            leftButton.innerHTML = data['ANSWERS'][0];
            leftButton.value = data['ANSWERS'][0];
            rightButton.innerHTML = (data['ANSWERS'][1]);
            rightButton.value = data['ANSWERS'][1];

            var questionNumberId = 'Q_TEXT' + (currentQuestionNumber);
            
            $.each(data['QUESTIONS'], function(key, value){ 
                questionList[key] = value;
            });

            questionArea.append(questionList[questionNumberId]);

            timerContainer.append(data['S_TIME']);

            totalQuestionNumber = data['Q_COUNT']
            var step = currentQuestionNumber + "/" + totalQuestionNumber;
            stepContainer.append(step);
       
        },
        error: function(){
           output.text('There was an error loading the data.');
        }
    });

});