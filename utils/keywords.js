const MonkeyLearn = require('monkeylearn');
require('dotenv').config();

var generateKeywords = (data, callback) => {
    const ml = new MonkeyLearn (process.env.ML_APIKEY);
    let model_id = process.env.KEYWORD_MODEL_ID;
    console.log ('Inside GK');
    ml.extractors.extract(model_id, data)
        .then(res => {
            // console.log(res.body);
            let extractedArray = res.body[0].extractions;
            let len = extractedArray.length;
            let keywords = [];

            for (let i=0; i<len; i++) {
                keywords.push (extractedArray[i].parsed_value);
                console.log(extractedArray[i].parsed_value);
            }

            callback (keywords);
            
        })
        .catch (err => {
            callback (undefined, data);
        });
}

// generateKeywords ("Independence Day is annually celebrated on 15 August, as a national holiday in India commemorating the nation's independence from the United Kingdom on 15 August 1947, the UK Parliament passed the Indian Independence Act 1947 transferring legislative sovereignty to the Indian Constituent Assembly");
module.exports = {generateKeywords};
