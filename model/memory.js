var mongoose = require('mongoose');

var modExport;

const { Schema } = mongoose;

const MemorySchema = new Schema({
    Memory: {
        type: String,
        unique: true
    }
});


MemorySchema.statics.enterMemory = function (req, res, callback) {

    this.model('Memory').create(req.body).then(result => {
        return callback(result, null);
    }).catch(err => {
        console.log(err);
        return callback(null, err);
    })

}

MemorySchema.statics.getMemory = function (res) {

    this.model('Memory').find().then(result => {
        return res(result, null);
    }).catch(err => {
        console.log(err);
        return res(null, err);
    })

}

modExport = mongoose.model('Memory', MemorySchema, 'Memory');

module.exports = modExport;