operations = [];

$(document).ready(readyNow);

function readyNow() {
    console.log('document ready');
    addEventHandlers();

}//end readyNow

function addEventHandlers () {

$('#addButton').on('click', addButtonOnClick);
$('#subtractButton').on('click', subtractButtonOnClick);
$('#multiplyButton').on('click', multiplyButtonOnClick);
$('#divideButton').on('click', divideButtonOnClick);
$('#clearButton').on('click', clearButtonOnClick);

}

{/* <input type ="number" placeholder="Input Number 1" id="inputNumber1">
<input type ="number" placeholder="Input Number 2" id="inputNumber2"> */}

function addButtonOnClick () {
    let inputNumber1 = $("#inputNumber1").val();
    $("#inputNumber1").val('');
    let inputNumber2 = $("#inputNumber2").val();
    $("#inputNumber2").val('');
    let operationToAdd = {number1: inputNumber1, number2: inputNumber2,};
    operationToAdd.operation = 'add';
    sendOperationToServer (operationToAdd);

}

function subtractButtonOnClick () {
    let inputNumber1 = $("#inputNumber1").val();
    $("#inputNumber1").val('');
    let inputNumber2 = $("#inputNumber2").val();
    $("#inputNumber2").val('');
    let operationToAdd = {number1: inputNumber1, number2: inputNumber2,};
    operationToAdd.operation = 'subtract';
    sendOperationToServer (operationToAdd);
}

function multiplyButtonOnClick () {
    let inputNumber1 = $("#inputNumber1").val();
    $("#inputNumber1").val('');
    let inputNumber2 = $("#inputNumber2").val();
    $("#inputNumber2").val('');
    let operationToAdd = {number1: inputNumber1, number2: inputNumber2,};
    operationToAdd.operation = 'multiply';
    sendOperationToServer (operationToAdd);
}

function divideButtonOnClick () {
    let inputNumber1 = $("#inputNumber1").val();
    $("#inputNumber1").val('');
    let inputNumber2 = $("#inputNumber2").val();
    $("#inputNumber2").val('');
    let operationToAdd = {number1: inputNumber1, number2: inputNumber2,};
    operationToAdd.operation = 'divide';
    sendOperationToServer (operationToAdd);
}

function sendOperationToServer (operationObject) {
    operationToSend = operationObject;
    $.ajax({
        type: 'POST',
        data: operationToSend,
        url: '/operation'
    }).done(function(response) {
        //our response from a post will just be '200' success.
        receiveOperationFromServer ();
        console.log('SUCCESS!');
    }).fail(function(response) {
        alert('Something went wrong...');
    })//end ajax post
}//end sendOperationToServer


function receiveOperationFromServer () {
    $.ajax({
        type: 'GET',
        url: '/operation'
    }).done(function(response){
        $('#result').empty();
        $('#result').append( 'Result: ' + 
                            response[response.length-1].operationResult);
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

function clearButtonOnClick () {
    $.ajax({
        type: 'POST',
        data: 'clear',
        url: '/clearHistory'
    }).done(function(response) {
        //our response from a post will just be '200' success.
        $('#history').empty();
        $("#inputNumber1").val('');
        $("#inputNumber2").val('');
        $('#result').empty();
        $('#result').append( 'Result: ');
    }).fail(function(response) {
        alert('Something went wrong...');
    })//end ajax post
}//end clearButtonOnClick