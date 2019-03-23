const path = require('path');
var app = require('express')();
const bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

const { generateKeywords } = require ('./utils/keywords');
const { getSimilarKeywords } = require ('./utils/similarKeywords');
const { getSummary } = require ('./utils/summary');

const publicPath = path.join(__dirname, '/public');
const port = process.env.PORT || 3000;
app.use(bodyParser());

app.get('/', (req, res) => {
    res.sendFile(publicPath + '/index.html');
});

app.post ('/getKeywords', (req, res) => {
    let data = [req.body.data];
    generateKeywords (data, (keywords, err) => {
        if (!data) {
            res.status (500).send (err);
        }

        res.send (keywords);    
    });
});

app.post ('/getSimilarKeywords', (req, res) => {
    let  data = req.body.data;
    getSimilarKeywords (data, (result, err) => {
        if (!result) {
            res.status (500).send (err);
        }
        res.send (result);
    });
});

app.post ('/getSummary', (req, res) => {
    let text = [req.body.text];

    getSummary (text, (phrase, err) => {
        if (!phrase) {
            res.status (500).send (err);
        }

        res.send (phrase);
    });
});

io.on('connection', function(socket){
    console.log(`A new user connected ${socket.id}`);

    socket.emit ('check', "Did it connect?");

    socket.on ('appStarted', (message) => {
        console.log ('Received Message: ' + message);
    });

    socket.on ('getText', (text, callback) => {
        console.log (text);
        let toBeProcessed = [text];
        getSummary (toBeProcessed, (phrase, err) => {
            if (!phrase) {
                phrase = text;
            }

            generateKeywords (toBeProcessed, (keywords, err) => {
                let reqParam = keywords.join (" ");
                let URI = "http://104.208.162.211/get-images?query=" + reqParam;
                request (URI, (err, resp, mainResp) => {
                    let mResp = JSON.parse (mainResp);
                    let images = mResp["images"];
                    let imageList = [];
                    console.log (JSON.stringify(mainResp, null, 4));
                    for (let i=0; i<images.length; i++) {
                        let thisObj = {
                            imageURL: images[i][1],
                            desc: phrase
                        }
                        imageList.push (thisObj);
                    }
                    
                    socket.emit ('addImage', JSON.stringify(imageList));
                });
                
            });
        });
        
        // socket.emit ('addImage', text+"FINAL");
        // callback();
    });
});



http.listen (port, () => {
    console.log (`Server is up at port ${port}`);
});


