//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const Reviews = require('./models/reviews.js');
const app = express();
const db = mongoose.connection;
require('dotenv').config()

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo & mongoose
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
app.get('/', (req, res) => {
  res.redirect('/reviews')
})

app.get('/reviews' , (req, res) => {
  Reviews.find({}, (error, allReviews) => {
    res.render('index.ejs', {
      reviews: allReviews
    });
  });
});



app.get('/reviews/new', (req, res) => {
  res.render('new.ejs');
});

app.get('/reviews/:id', (req, res)=>{
  Reviews.findById(req.params.id, (err, chosenReview) =>{
    res.render('show.ejs', {
      reviews: chosenReview
    })
  });
});


app.post('/reviews', (req, res) => {
  Reviews.create(req.body, (error, newReview) => {
    res.redirect('/reviews');
  });
});


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
