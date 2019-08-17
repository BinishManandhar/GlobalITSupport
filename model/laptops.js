var mongoose = require('mongoose');
var id = 0;

const { Schema } = mongoose;
const LaptopSchema = new Schema({
    LaptopName: {
        type: String,
        required: true
    },
    UniqueSlug: {
        type: String,
        required: true,
        unique: true
    },
    Model: {
        type: String,
        required: true
    },
    CPU: {
        type: String
    },
    Memory: {
        type: String
    },
    HDD: {
        type: String
    },
    OS: {
        type: String
    },
    Graphics: {
        type: String
    },
    Price: {
        type: String
    },
    Image: {
        type: String
    },
    Detail: {
        type: String
    }
});

LaptopSchema.statics.enterLaptop = function (req, res, callback) {
    this.model('Laptop').create(req.body).then(result => {
        return callback(result, null);
    }).catch(err => {
        console.log(err);
        id++;
        req.body.UniqueSlug = req.body.UniqueSlug + id;
        this.enterLaptop(req, res, callback);
    })
}
LaptopSchema.statics.getLaptops = function (req, res, callback) {
    var slug = req.params.slug;
    this.model('Laptop').find({ LaptopName: slug }).exec(
        function (err, laptops) {
            if (err) {
                return callback(err);
            }
            else if (!laptops) {
                err = new Error("Laptop not found");
                err.status = 401;
                return callback(err);
            }
            else {
                return callback(laptops);
            }
        }
    );
}

LaptopSchema.statics.findLaptop = function (req, res, callback) {
    var slug = req.params.slug;
    this.model('Laptop').findOne({ UniqueSlug: slug }).exec(
        function (err, laptops) {
            if (err) {
                return callback(err);
            }
            else if (!laptops) {
                err = new Error("Laptop not found");
                err.status = 401;
                return callback(err);
            }
            else {
                return callback(laptops);
            }
        }
    );
}

LaptopSchema.statics.deleteLaptop = function (req, res, callback) {
    var slug = req.params.slug;
    this.model('Laptop').deleteOne({ UniqueSlug: slug }).then(data => {
        return callback(data, null);
    }).catch(err => {
        return callback(null, err);
    });
}


module.exports = mongoose.model('Laptop', LaptopSchema, 'Laptop');