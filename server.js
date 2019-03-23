const path = require('path');
var app = require('express')();
const bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

const { generateKeywords } = require ('./utils/keywords');

const publicPath = path.join(__dirname, '/public');
const port = process.env.PORT || 3000;
app.use(bodyParser());

app.get('/', (req, res) => {
    res.sendFile(publicPath + '/index.html');
});

app.post ('/getKeywords', (req, res) => {
    // console.log(req.body)
    // let text = req.body.data;
    // console.log (data);
    // let keywords = generateKeywords (text);
    let data = [req.body.data];
    generateKeywords (data, (keywords, err) => {
        if (!data) {
            res.status (500).send (err);
        }

        res.send (keywords);    
    });
    
});

io.on('connection', function(socket){
    console.log(`A new user connected ${socket.id}`);
});

http.listen (port, () => {
    console.log (`Server is up at port ${port}`);
});


