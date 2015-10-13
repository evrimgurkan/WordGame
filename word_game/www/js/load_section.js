    window.questionList             = [];
    window.currentQuestionNumber    = 1;
    window.totalQuestionNumber      = -1;

$(document).ready(function(){

    initTimers(90);
    updateStep(1,40);
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

            leftButton.innerHTML = data['ANSWERS'][0];
            leftButton.value = data['ANSWERS'][0];
            rightButton.innerHTML = (data['ANSWERS'][1]);
            rightButton.value = data['ANSWERS'][1];

            var questionNumberId = 'Q_TEXT' + (currentQuestionNumber);
            
            $.each(data['QUESTIONS'], function(key, value){ 
                questionList[key] = value;
            });

            questionArea.append(questionList[questionNumberId]);

            //timerContainer.append(data['S_TIME']);

            totalQuestionNumber = data['Q_COUNT']
            var step = currentQuestionNumber + "/" + totalQuestionNumber;
            //stepContainer.append(step);
        },
        error: function(){
           output.text('There was an error loading the data.');
        }
    });

});

function initTimers(iTme)
{
    var time = iTme;
    var initialOffset = '440';
    var i = 1;
    var timer_interval = setInterval(function() {
        $('#timer_circle').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
        document.getElementById('timerValue').innerHTML = i;

        if (i == time) {
            clearInterval(timer_interval);
        }
        i++;
    }, 1000);
}

function updateStep(currentStep,totalStep)
{
    var step_count = totalStep;
    var initialOffset = '440';
    var step = currentStep;
    //var step_interval = setInterval(function() {
        $('#step_circle').css('stroke-dashoffset', initialOffset-(step*(initialOffset/step_count)));
        document.getElementById('stepValue').innerHTML = step + '/' + step_count;

        if (step == step_count) {
            //clearInterval(step_interval);
            alert('Reached Total Step');
        }
        step++;
    //}, 1000);

}