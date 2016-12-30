/*jslint node:true*/
/*global console */

'use strict';

//Richiede i moduli
var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');


//Definisce la funzione "Processa i campi individualmente"
function processFormFieldsIndividual(req, res) {
    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);
        fields[field] = value;
    });

form.on('file', function(name, file) {
    console.log(name);
    console.log(file);
    fields[name] = file;
});

form.on('progress', function(bytesReceived, bytesExpected){
    var progress = {
        type: 'progress',
        bytesReceived: bytesReceived,
        bytesExpected : bytesExpected
    }
    console.log(progress);
});

    form.on('end', function () {
        res.writeHead(200, {
            'content-type' : 'text-plain'
        });
        res.write('received the data: \n\n');
        res.end(util.inspect({
            fields : fields
        }));
    });
    form.parse(req);
}

////Definisce la funzione "Processa tutti i campi"
function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {
            'content-type' : 'text/plain'
        });
        res.write('received the data: \n\n');
        res.end(util.inspect({
            fields : fields,
            files : files
        }));
    });
}

//Definisce la funzione "mostra il form"
function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}


var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() === 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() === 'post') {
        //processAllFieldsOfTheForm(req, res);
        processFormFieldsIndividual(req, res);
    }

});




///https://www.sitepoint.com/creating-and-handling-forms-in-node-js/


server.listen(1185);
console.log("server now listening on port 1185");
