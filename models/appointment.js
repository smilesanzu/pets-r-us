/*
===========================================
; Title: appointment.js
; Author: Professor Krasso
; Date: 2/26/2023
; Modified by: Janis Gonzalez
; Description: Mongoose file for appointments
===========================================
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// makes new schema

let appointmentSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    service: { type: String, required: true, unique: true }
});

// export
module.exports = mongoose.model('Appointment', appointmentSchema);