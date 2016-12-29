//associa alle variabili i moduli richiesti dall' applicazione
//sarà una applicazione basata su express, quindi integriamo express;
var express = require('express');
var path = require('path');
var cloudinary = require('cloudinary');
var fs = require('fs');

cloudinary.config({
  cloud_name: 'postcards',
  api_key: '367379836234655',
  api_secret: 'ZGoPPWEG8OMoZOomJ6crjitBfzk'
});



cloudinary.uploader.upload("test_image.jpg", function(result) {
  console.log(result)
});

//creo una variabile app che rapre la nuova applicazione express. In questo
//modo app otterrà i metodi di express
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
var routes = require('./routes');


//si è precendentemente installato ejs come template engine
//(npm install ejs --save) e ora è necessario impostarlo anche come view
//engine per evitare errori
app.set('view engine', 'ejs');

//Seguono, le rotte - la logica viene definita in ./routes/index.js - vedi

//home
app.get('/', routes.home);
//pagine inesistenti
app.get('*', routes.notFound);

app.post('/upload', function(req, res){
  var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' })
    , cloudStream = cloudinary.uploader.upload_stream(function() { res.redirect('/'); });

  imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
});

//crea il server web
app.listen(process.env.PORT || 3000);
