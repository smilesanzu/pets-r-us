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

const app = express();

// Views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
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




// Port 3000
app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});