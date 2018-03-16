// Require express - gives us back a function
let express = require('express');

// gives us back an object
let app = express();
const port = process.env.PORT || 5001; // Used to direct traffic
//process.env.PORT refers to the port heroku assigns.
let bodyParser = require('body-parser');//must be done before app.post
let operations = [];

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));

app.post('/operation', (req, res) => {
    console.log(req.body);
    let operationObjectReceived = req.body;
    operationObjectReceived = operate(operationObjectReceived);
    operations.push(operationObjectReceived);
    res.sendStatus(200);
});

app.post('/clearHistory', (req, res) => {
    operations = [];
    res.sendStatus(200);
});

app.get('/operation', (req, res) => {
    res.send(operations);
});

// Start up the server
app.listen(port, () => {
    console.log('listening on port', port);
});

function operate (operationObjectInput) {
    operationObject = operationObjectInput;
    if (operationObject.operation === 'add') {
        operationObject.operationResult = (parseInt(operationObject.number1) + 
        parseInt(operationObject.number2));
        return operationObject;
    }//end if add
    else if (operationObject.operation === 'subtract') {
        operationObject.operationResult = (parseInt(operationObject.number1) - 
        parseInt(operationObject.number2));
        return operationObject;
    }//end if subtract
    else if (operationObject.operation === 'multiply') {
        operationObject.operationResult = (parseInt(operationObject.number1) * 
        parseInt(operationObject.number2));
        return operationObject;
    }//end if multiply
    else if (operationObject.operation === 'divide') {
        operationObject.operationResult = (parseInt(operationObject.number1) / 
        parseInt(operationObject.number2));
        return operationObject;
    }//end if divide
}//end operate function
