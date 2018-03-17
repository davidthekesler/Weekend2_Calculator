let activeNumber = '';
let operationToSend = {};

$(document).ready(readyNow);

function readyNow() {
    console.log('document ready');
    addEventHandlers();
}//end readyNow

function addEventHandlers () {

    $('#calculatorDiv').on('click', '.numberButton', numberButtonOnClick);
    $('#calculatorDiv').on('click', '.operatorButton', operatorButtonOnClick);
    $('#equalsButton').on('click', sendOperationToServer);
    $('#acButton').on('click', acButtonOnClick);
    $('#clearButton').on('click', clearHistoryButtonOnClick);
}//end addEventHandlers

function numberButtonOnClick (){
    $('#result').val('');
    activeNumber += $(this).val();
    console.log(activeNumber);
}// end numberButtonOnClick

function operatorButtonOnClick () {
    operationToSend.number1 = activeNumber;
    activeNumber = '';
    if ($(this).val() === 'add') {
        operationToSend.operation = 'add';
    }
    else if ($(this).val() === 'subtract') {
        operationToSend.operation = 'subtract';
    }
    else if ($(this).val() === 'multiply') {
        operationToSend.operation = 'multiply';
    }
    else {
        operationToSend.operation = 'divide';
    }
}//end operatorOnClick

function sendOperationToServer () {
    operationToSend.number2 = activeNumber;
    activeNumber = '';
    $.ajax({
        type: 'POST',
        data: operationToSend,
        url: '/operation'
    }).done(function(response) {
        operationToSend = {};
        receiveOperationFromServer ();
        console.log('SUCCESS!');
    }).fail(function(response) {
        alert('Something went wrong...');
    })//end ajax post
}//end sendOperationToServer

function acButtonOnClick () {
    $('#result').val('');
    activeNumber = '';
}//end acButtonOnClick

function clearHistoryButtonOnClick () {
    $.ajax({
        type: 'DELETE',
        url: '/clearHistory'
    }).done(function(response) {
        $('#history').empty();
        $('#result').val('');
    }).fail(function(response) {
        alert('Something went wrong...');
    })//end ajax delete
}//end clearButtonOnClick

function receiveOperationFromServer () {
    $.ajax({
        type: 'GET',
        url: '/operation'
    }).done(function(response){
        $('#result').val( response[response.length-1].operationResult);
        let responseToAppend = response;
         operationsHistoryAppend (responseToAppend);
    })//end ajax get
}//end receiveOperationFromServer

 function operationsHistoryAppend (responseIn) {
     let response = responseIn;
     $('#history').empty();
    for (let responseObject of response) {
        if (responseObject.operation === 'add') {
            $('#history').append('<li>' + responseObject.number1 + ' + ' + responseObject.number2
            + ' = ' + responseObject.operationResult + '</li>');
            }
        else if (responseObject.operation === 'subtract') {
            $('#history').append('<li>' + responseObject.number1 + ' - ' + responseObject.number2
            + ' = ' + responseObject.operationResult + '</li>');
            }
        else if (responseObject.operation === 'multiply') {
            $('#history').append('<li>' + responseObject.number1 + ' * ' + responseObject.number2
            + ' = ' + responseObject.operationResult + '</li>');
            }
        else  {
            $('#history').append('<li>' + responseObject.number1 + ' / ' + responseObject.number2
            + ' = ' + responseObject.operationResult + '</li>');
            }
    }//end for let
}//end operationsHistoryAppend