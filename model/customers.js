var mongoose = require('mongoose');

const { Schema } = mongoose;
const CustomerSchema = new Schema({
    CustomerID: {
        type: Number,
        required: true,
        unique: false
    },
    FullName: {
        type: String,
    },
    EmailID: {
        type: String,
        unique: true
    },
    Phone: {
        type: String,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    Reservation: {
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


module.exports = mongoose.model('Customers', CustomerSchema, 'Customers');