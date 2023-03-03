/*
===========================================
; Title: appointment.js
; Author: Professor Krasso
; Date: 3/03/2023
; Modified by: Janis Gonzalez
; Description: Mongoose file for customer
===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// unique and required
let customerSchema = new Schema({
    customerId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Customer', customerSchema);