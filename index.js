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

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us: Home',
        pageTitle: 'Landing Page'
    })
});

app.get('/grooming', (req, res) => {
    res.render('grooming', {
        title: 'Pets-R-Us: Grooming',
        pageTitle: 'Pets-R-Us: Grooming'
    })
});

app.get('/boarding', (req, res) => {
    res.render('boarding', {
        title: "Pets-R-Us: Boarding",
        pageTitle: "Pets-R-Us: Boarding",
    });
});

app.get('/training', (req, res) => {
    res.render('training', {
        title: "Pets-R-Us: Training",
        pageTitle: "Pets-R-Us: Training",
    });
});

app.get('/register', (req, res) => {
    res.render('register', {
        title: "Pets-R-Us: Register",
        pageTitle: "Pets-R-Us: Register",
    });
});

app.get('/customer', (req, res) => {
    res.render('customerList', {
        title: "Pets-R-Us: Customer List",
        pageTitle: "Pets-R-Us: Customer List",
    });
});

app.get('/appointment', (req, res) => {
    res.render('appointment', {
        title: "Pets-R-Us: My Appointments",
        pageTitle: "Pets-R-Us: My Appointments",
    });
});

// post route
app.post('/customers', (req, res, next) => {
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

// Port 3000
app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});