const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
    {
        email: { type: String, required : true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true},
        lastName: { type: String, required: true},
        admin: { type: Boolean, required: true, default: false},
        actif: { type: Boolean, required: true, default: true}
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);