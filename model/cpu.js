var mongoose = require('mongoose');

var modExport;

const { Schema } = mongoose;
const CPUSchema = new Schema({
    CPU: {
        type: String,
        unique: true
    }
});


CPUSchema.statics.enterCPU = function (req, res, callback) {

    this.model('CPU').create(req.body).then(result => {
        return callback(result, null);
    }).catch(err => {
        console.log(err);
        return callback(null, err);
    })

}

CPUSchema.statics.getCPU = function (res) {

    this.model('CPU').find().then(result => {
        return res(result, null);
    }).catch(err => {
        console.log(err);
        return res(null, err);
    })

}

modExport = mongoose.model('CPU', CPUSchema, 'CPU');

module.exports = modExport;