var mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
    EmployeeID: {
        type: Number,
        required: true,
        unique: false
    },
    FullName: {
        type: String,
    },
    UserName: {
        type: String,
        unique: true
    },
    Password: {
        type: String,
        require: true
    },
    Phone: {
        type: String,
        require: true
    },
    IsActive: {
        type: Number,
        default: 1
    }
});

UserSchema.statics.enterNewEmployee = function (req, res, callback) {
    
    this.model('Employee').create(req.body).then(result => {
        return callback(result,null);
    }).catch(err => {
        console.log(err);
        return callback(null,err);
    })
}
UserSchema.statics.authenticate = function (req, res, callback) {
    var username = req.body.Username;
    var password = req.body.Password;

    this.model('Employee').findOne({ UserName: username }).exec(
        function (err, user) {
            console.log(user);
            if (err) {
                return callback(err);
            }
            else if (!user) {
                err = new Error("Employee not found");
                err.status = 401;
                return callback(err);
            }
            else if (user.Password == password) {
                return callback(null, user);
            }
            else {
                return callback();
            }
        }
    );
}

module.exports = mongoose.model('Employee', UserSchema, 'Employee');