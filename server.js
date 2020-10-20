if (process.env.NODE_ENV !== 'production') { // it checks whether we are in development environment or production environment. if it is not equal to production environment then we want to load our dotenv package
    require('dotenv').config(); // this parses environment variables and binds it to the object
}

const express = require('express');
const app = express();

// Packages

const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// Routes

const indexRoute = require('./routes/index');

// Settings

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // this tells express from where our views are comming
app.set('layout', 'layouts/layout'); // this tells express where our layout files are

// Use

app.use(express.static('public')); // this tells express where are our static files such as stylesheets, images are
app.use(expressLayouts); // this tells express to use express layouts

app.use('/', indexRoute);


// Setting up database

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true // this tells mongoose to new way to access the database becaues by default it uses older way to access the database
});

const db = mongoose.connection; // access to the mongodb connection

db.on('error', error => console.error(error)); // if there is any error then it will output the error (on error)
db.once('open', () => console.log("Connected to mongoose")); // once we opened (connected) connection to the database it does the function specified




app.listen(process.env.PORT || 3000);