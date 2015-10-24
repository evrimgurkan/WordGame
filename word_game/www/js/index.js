/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var Application = function (){

    this.getGameData = function (sectionId) {

        $.ajax({
            url: 'http://localhost/word_game_web_service.php?s_id=' + sectionId,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: gameData,
            error: ajaxErrorHandle
        });
    };

    var gameData = function (section_data) {

        var result_data = {};
        //result_data.gameStates = {
        //    time_is_up: 0,
        //    questions_finished: 1,
        //    new_section: 2,
        //    section_completed: 3,
        //    continue : 4,
        //    none: 5
        //};
        //
        //result_data.currentGameState =  result_data.gameStates.continue;
        //result_data.currentQuestionNo = 1;

        result_data.leftBtnValue = section_data['ANSWERS'][0];
        result_data.rightBtnValue = section_data['ANSWERS'][1];
        result_data.questionList = {};

        $.each(section_data['QUESTIONS'], function(key, value){
            result_data.questionList[key] = value;
        });
        result_data.totalQuestionCount = section_data['Q_COUNT'];
        result_data.sectionTime = section_data['S_TIME'];

        sessionStorage.setItem("gameData",JSON.stringify(result_data));
    };

    var ajaxErrorHandle = function() {

        alert('Veri yüklenirken hata oluştu!');

        var result_data = {};
        //result_data.gameStates = {
        //    time_is_up: 0,
        //    questions_finished: 1,
        //    new_section: 2,
        //    section_completed: 3,
        //    none: 4
        //};
        //
        //result_data.currentGameState =  result_data.gameStates.none;
        //result_data.currentQuestionNo = 1;

        result_data.leftBtnValue = " ";
        result_data.rightBtnValue = " ";
        result_data.questionList = {};

        result_data.totalQuestionCount = 0;
        result_data.sectionTime = 0;

        sessionStorage.setItem("gameData",JSON.stringify(result_data));
    };
};

