var mongoose = require('mongoose');

var modExport;

const { Schema } = mongoose;

const OSSchema = new Schema({
    OS: {
        type: String,
        unique: true
    }
});


OSSchema.statics.enterOS = function (req, res, callback) {

    this.model('OS').create(req.body).then(result => {
        return callback(result, null);
    }).catch(err => {
        console.log(err);
        return callback(null, err);
    })

}

OSSchema.statics.getOS = function (res) {

    this.model('OS').find().then(result => {
        return res(result, null);
    }).catch(err => {
        console.log(err);
        return res(null, err);
    })

}

modExport = mongoose.model('OS', OSSchema, 'OS');

module.exports = modExport;