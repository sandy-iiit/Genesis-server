const mongoose = require('mongoose');
 

const Schema = mongoose.Schema;

const superAdminSchema = new Schema({
    // Inherits properties from Admin model
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: false
    },
    deleted: Boolean,
    // Additional properties for Super Admin
    canDeleteAdmins: {
        type: Boolean,
        default: true // Super Admin can delete admins by default
    },
    // Other super admin specific properties can be added here
});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
