const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    companyId: String,
    registered: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date
    }
});

mongoose.model('Invitation', InvitationSchema);