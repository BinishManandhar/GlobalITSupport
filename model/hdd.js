var mongoose = require('mongoose');

var modExport;

const { Schema } = mongoose;

const HDDSchema = new Schema({
    HDD: {
        type: String,
        unique: true
    }
});


HDDSchema.statics.enterHDD = function (req, res, callback) {

    this.model('HDD').create(req.body).then(result => {
        return callback(result, null);
    }).catch(err => {
        console.log(err);
        return callback(null, err);
    })

}

HDDSchema.statics.getHDD = function (res) {

    this.model('HDD').find().then(result => {
        return res(result, null);
    }).catch(err => {
        console.log(err);
        return res(null, err);
    })

}

modExport = mongoose.model('HDD', HDDSchema, 'HDD');

module.exports = modExport;