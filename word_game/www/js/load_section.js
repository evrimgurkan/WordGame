$(document).ready(function(){

    initTimers(90);
    updateStep(1,40);
    var descriptionArea = $('#descriptionArea');
    var leftButton      = $('#leftButton');
    var rightButton     = $('#rightButton');
    var questionArea    = $('#questionArea');
    var timerContainer  = $('#timerContainer');
    var stepContainer   = $('#stepContainer');

    var currentQuestionNumber = 1;

    var s_id = 1;

    $.ajax({
        url: 'http://localhost/word_game_web_service.php?s_id=' + s_id,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data, status){

            descriptionArea.append('Aşağıdaki Soruları Cevaplayın Layn!');
            leftButton.append('Sayısal');
            rightButton.append('Sözel');

            var questionNumberId = 'Q_TEXT' + (currentQuestionNumber - 1);
            questionArea.append('Ziraat Mühendisliği');
            //timerContainer.append(90);

            var step = currentQuestionNumber + "/" + data['Q_COUNT'];

            //stepContainer.append('3/40');

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