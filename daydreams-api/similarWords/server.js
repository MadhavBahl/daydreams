const express = require ('express');
const bodyParser = require('body-parser');
var request = require('request');

const port = process.env.PORT || 8080;
const app = express();
app.use(bodyParser());

app.post ('/getSimilar', (req, res) => {
    let word = req.body.word;
    let URI = "https://api.datamuse.com/words?ml=" + word;

    request (URI, (err, resp, mainResp) => {
        if (err) {
            console.log (err);
            res.status(500).send (err);
        }
        mainResp = JSON.parse (mainResp);
        let sWords = [];
        let numWords = mainResp.length < 20 ? mainResp.length : 20;
        console.log (numWords);
        for (let i=0; i<numWords; i++) {
            sWords.push (mainResp[i]["word"]);
        }
        res.send (sWords);
    })

});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});