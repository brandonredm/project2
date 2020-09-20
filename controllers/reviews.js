const express = require('express');
const router = express.Router();
const Reviews = require('../models/reviews.js')

router.get('/reviews' , (req, res) => {
  Reviews.find({}, (error, allReviews) => {
    res.render('index.ejs', {
      reviews: allReviews
    });
  });
});

router.get('/reviews/seed', (req, res) => {
  Reviews.create(
    [
      {
        album: 'Live. Love. ASAP',
        artist: 'A$AP Rocky',
        art: 'https://m.media-amazon.com/images/I/61P4wz16MGL._AC_SS350_.jpg',
        writeup: 'Hazy beats and super solid flows. Great album',
        score: '10'
      },
      {
        album: 'Yeezus',
        artist: 'Kanye West',
        art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSqiF5cSN0TEeFOAKyfjZE7oGPzJjhftXlFxQ&usqp=CAU',
        writeup: 'Harsh and beautiful sounds. Amazing album',
        score: '10'
      }
    ],
    (err, data)=>{
      res.redirect('/reviews');
    }
  )
});

router.get('/reviews/new', (req, res) => {
  res.render('new.ejs');
});

router.get('/reviews/:id', (req, res)=>{
  Reviews.findById(req.params.id, (err, chosenReview) =>{
    res.render('show.ejs', {
      reviews: chosenReview
    })
  });
});

router.get('/reviews/:id/edit', (req, res)=> {
  Reviews.findById(req.params.id, (err, chosenReview)=> {
    res.render(
      'edit.ejs',
      {
        reviews: chosenReview
      }
    );
  });
});


router.post('/reviews', (req, res) => {
  Reviews.create(req.body, (error, newReview) => {
    res.redirect('/reviews');
  });
});

router.delete('/reviews/:id', (req, res)=> {
  Reviews.findByIdAndRemove(req.params.id, (err, data)=> {
    res.redirect('/reviews');
  });
});

router.put('/reviews/:id', (req, res)=> {
  Reviews.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
    res.redirect('/reviews');
  });
});

module.exports = router;
