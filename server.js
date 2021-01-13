const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.get('/index.html', function(req, rsp) {
    rsp.sendFile(__dirname + "/" + "index.html");
})

app.post('/file_upload', function(req, rsp) {
    console.log("aaa")
    console.log(req.files[0])

    const des_file = __dirname + "/" + req.files[0].originalName;
    fs.readFile(req.files[0].path, function(err, data) {
        fs.writeFile(des_file, data, function(err) {
            if (err) {
                console.log(err);
            } else {
                rspText = {
                    message: 'File uploaded successful',
                    filename: req.files[0].originalName
                };
            }
            console.log(rsp);
            rsp.end(JSON.stringify(rspText));
        });
    });
})

const server = app.listen(8081, function() {
    const host = server.address().address
    const port = server.address().port

    console.log("visit http://%s:%s", host, port)
})
