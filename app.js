var express = require('express'),
    fs = require('fs'),
    sleep = require('sleep'),
    ImageTypes = require('./ImageTypes');

var app = express(),
    PORT = 3000;

app.configure(function() {
    app.use(express.static('public'))
    app.use(express.bodyParser());
    app.set('view engine', 'dot' );
    app.engine('dot', require('express-dot').__express );
});


app.get('/', function(req, res) {
    res.render('form', { layout: false });
});

app.get('/plupload1', function(req, res) {
    res.render('plupload1', { layout: false });
});

app.get('/plupload2', function(req, res) {
    res.render('plupload2', { layout: false });
});

app.post('/upload', function(req, res){
    saveFile(req.files.imageData.path, ImageTypes[req.files.imageData.type]);

    sleep.sleep(2);

    res.setHeader('Content-Type', 'text/plain');
    res.render('success', { layout: false});
});


function saveFile(path, extension) {
    var fileData = fs.readFileSync(path),
        savePath = getSavePath(extension);

    console.log("Saving in " + savePath);
    fs.writeFileSync(savePath, fileData);
    console.log("...done.");
}

function getSavePath(extension) {
    return (__dirname + '/uploads/' + new Date().getTime() + '.' + extension);
}

app.listen(PORT);
console.log('Plupload test server Listening on port ' + PORT);
