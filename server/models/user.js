const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first: String,
    last: String,
    email: {
        type: String,
        unique: true
    },
    phone: String,
    hash: String,
    salt: String,
    companyId: {
        type: String,
        default: null
    },
    allCompanies: [],
    admin: {
        type: Boolean,
        default: false
    }
});

mongoose.model('User', UserSchema);