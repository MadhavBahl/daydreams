const MonkeyLearn = require('monkeylearn')

const ml = new MonkeyLearn('342cde3cca0207d779ac5ecf1f4d00fe392f0e76')
let model_id = 'ex_YCya9nrn'
let data = ["Elon Musk has shared a photo of the spacesuit designed by SpaceX. This is the second image shared of the new design and the first to feature the spacesuit’s full-body look."]
ml.extractors.extract(model_id, data).then(res => {
    console.log(res.body)
})