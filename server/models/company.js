const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: String,
    users: [],
    createdAt: {
        type: Date,
        default: new Date
    }
});

mongoose.model('Company', CompanySchema);