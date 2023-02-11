const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// unique and required
let customerSchema = new Schema({
    customerId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Customer', customerSchema);