$(document).ready(function(){
    var output = $('#output');
    var s_id = 0;
    output.append("asd");
    $.ajax({
        url: 'http://localhost/word_game_web_service.php?s_id=' + s_id,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data, status){
        var counter = 0;
        $.each(data, function(key,value){ 
            var section = '<h1>'+key+'</h1>'
            + '<p>'+value+'</p><br>';
            if (key === 'ANSWERS')
            {

            }
            else if (key === 'QUESTIONS')
            {
            var id_name = 'Q_TEXT' + counter;
               section += '<p>' + value[id_name]  + '</p><br>';

            }
        
            output.append(section);
        });
        },
        error: function(){
           output.text('There was an error loading the data.');
        }
    });

});