/*
============================================
; Title:  index.js
; Author: Janis Gonzalez
; Date: 1/29/2023
; Description: index.js file for pet-r-us assign
;===========================================
*/

// Import
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
// express variable
const app = express();

// mongoose connection address
const CONN = 'mongodb+srv://sunflower:842128@web340db.u3jxivb.mongodb.net/test';

// displays connection success or error messages
mongoose.connect(CONN).then(() => {
    console.log('Connection to MongoDB database was successful\n  If you see this message it means you were able to connect to your MongoDB Atlas cluster');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
})

// Views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/styles')));
app.use(express.static(path.join(__dirname, 'public/images')));


// PORT set to 3000
const PORT = process.env.PORT || 3000;

app.get('/index.ejs', (req, res) => {
    res.render('index.ejs', {
        title: 'Pets-R-Us: Home',
        pageTitle: 'Landing Page'
    })
});

app.get('/grooming.ejs', (req, res) => {
    res.render('grooming.ejs', {
        title: 'Pets-R-Us: Grooming',
        pageTitle: 'Pets-R-Us: Grooming'
    })
});

app.get('/boarding.ejs', (req, res) => {
    res.render('boarding.ejs', {
        title: "Pets-R-Us: Boarding",
        pageTitle: "Pets-R-Us: Boarding",
    });
});

app.get('/training.ejs', (req, res) => {
    res.render('training.ejs', {
        title: "Pets-R-Us: Training",
        pageTitle: "Pets-R-Us: Training",
    });
});

app.get('/register.ejs', (req, res) => {
    res.render('register.ejs', {
        title: "Pets-R-Us: Register",
        pageTitle: "Pets-R-Us: Register",
    });
});

app.get('/customer-list.ejs', (req, res) => {
    res.render('customerList.ejs', {
        title: "Pets-R-Us: Customer List",
        pageTitle: "Pets-R-Us: Customer List",
    });
});

app.get('/appointment.ejs', (req, res) => {
    res.render('appointment.ejs', {
        title: "Pets-R-Us: My Appointments",
        pageTitle: "Pets-R-Us: My Appointments",
    });
});

// post route
app.post('/customer', (req, res, next) => {
    console.log(req.body);
    console.log(req.body.customerId);
    console.log(req.body.email);
    const newCustomer = new Customer({
        customerId: req.body.customerId,
        email: req.body.email
    })

    console.log(newCustomer);

    Customer.create(newCustomer, function(err, customer) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('index', {
                title: 'Pets-R-Us'
            })
        }
    })
})


// route for customer list display
app.get('/customers', (req, res) => {
    Customer.find({}, function(err, customer) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('customerlist', {
                title: "Pets-R-Us: Customer List",
                pageTitle: "Pets-R-Us: Customer List",
                customer: customer
            })
        }
    })
})

// renders the booking.ejs page and gets service info from services.json
app.get('/booking.ejs', (req, res) => {
    let jsonFile = fs.readFileSync('./public/data/services.json');
    let services = JSON.parse(jsonFile);

    console.log(services);

    res.render('booking.ejs', {
        title: 'Pets-R-Us: Appointment Booking',
        pageTitle: 'Pets-R-Us: Appointment Booking',
        services: services
    })
})

// does POST action for booking when user clicks on the Book-Appointment button
app.post('/booking', (req, res, next) => {
    const newAppt = new appointment({
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            service: req.body.service
        })
        // create a new appointment and log error

    appointment.create(newAppt, function(err, appointment) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('index', {
                title: 'Pets-R-Us'
            })
        }
    })
})

// does the GET process for the View My Appointments page
app.get('/my-appointments.ejs', (req, res) => {
    res.render('myappointments', {
        title: 'Pets-R-Us: My Appointments',
        pageTitle: 'View My Appointments'
    })
})

app.get('/api/appointments/:email', async(req, res, next) => {
    appointment.find({ 'email': req.params.email }, function(err, appointments) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.json(appointments);
        }
    })
})


// Port 3000
app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});