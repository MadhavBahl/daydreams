const MonkeyLearn = require('monkeylearn');

let getSummary = (text, callback) => {
    const ml = new MonkeyLearn (process.env.ML_APIKEY);
    let model_id = process.env.SUMMARY_MODEL_ID;

    ml.extractors.extract(model_id, text).then(res => {
        console.log(res.body);
        callback (res.body);
    }).catch (err => {
        callback (undefined, err);
    });
};

module.exports = {getSummary};