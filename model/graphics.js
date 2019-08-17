var mongoose = require('mongoose');

var modExport;

const { Schema } = mongoose;

const GraphicsSchema = new Schema({
    Graphics: {
        type: String,
        unique: true
    }
});


GraphicsSchema.statics.enterGraphics = function (req, res, callback) {

    this.model('Graphics').create(req.body).then(result => {
        return callback(result, null);
    }).catch(err => {
        console.log(err);
        return callback(null, err);
    })

}

GraphicsSchema.statics.getGraphics = function (res) {

    this.model('Graphics').find().then(result => {
        return res(result, null);
    }).catch(err => {
        console.log(err);
        return res(null, err);
    })

}

modExport = mongoose.model('Graphics', GraphicsSchema, 'Graphics');

module.exports = modExport;