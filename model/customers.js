var mongoose = require('mongoose');

const { Schema } = mongoose;
const CustomerSchema = new Schema({
    CustomerID: {
        type: Number,
        required: true,
        unique: true
    },
    FullName: {
        type: String,
    },
    EmailID: {
        type: String,
    },
    Phone: {
        type: String,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    Date: {
        type: String,
        require: true
    },
    LaptopUniqueSlug: {
        type: String,
        require: true
    },
    IsActive: {
        type: Number,
        default: 1
    }
});

CustomerSchema.statics.enterNewCustomer = function (req, res, callback) {

    this.model('Customers').create(req.body).then(result => {
        return callback(result, null);
    }).catch(err => {
        console.log(err);
        return callback(null, err);
    })
}

CustomerSchema.statics.getCustomers = function (req, res, callback) {
    this.model('Customers').find().exec(
        function (err, customers) {
            if (err) {
                return callback(err);
            }
            else if (!customers) {
                err = new Error("Customers not found");
                err.status = 401;
                return callback(err);
            }
            else {
                return callback(customers);
            }
        }
    );
}

CustomerSchema.statics.getCustomer = function (req, res, callback) {
    var customer = req.params.slug;
    this.model('Customers').find({ CustomerID: parseInt(customer) }).exec(
        function (err, customers) {
            if (err) {
                return callback(err);
            }
            else if (!customers) {
                err = new Error("Customers not found");
                err.status = 401;
                return callback(err);
            }
            else {
                return callback(customers);
            }
        }
    );
}


module.exports = mongoose.model('Customers', CustomerSchema, 'Customers');