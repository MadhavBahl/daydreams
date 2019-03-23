var request = require('request');

let getSimilarKeywords = (keyword, callback) => {
    let URI = "https://api.datamuse.com/words?ml=" + keyword;

    request (URI, (err, resp, mainResp) => {
        if (err) {
            console.log (err);
            callback (undefined, err);
        }
        mainResp = JSON.parse (mainResp);
        let sWords = [];
        let numWords = mainResp.length < 4 ? mainResp.length : 4;
        console.log (numWords);
        for (let i=0; i<numWords; i++) {
            sWords.push (mainResp[i]["word"]);
        }
        callback (sWords);
    });
};

module.exports = {getSimilarKeywords};