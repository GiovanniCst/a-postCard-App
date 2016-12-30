/*jslint node:true*/
/*global console */

'use strict';

var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');

function processFormFieldsIndividual(req, res) {
    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);
        fields[field] = value;
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

///https://www.sitepoint.com/creating-and-handling-forms-in-node-js/


server.listen(1185);
console.log("server now listening on port 1185");
