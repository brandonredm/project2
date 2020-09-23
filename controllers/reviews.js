const express = require('express');
const Reviews = require('../models/reviews.js')
const router = express.Router();

module.exports = router;

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

router.get('/seed', (req, res) => {
  Reviews.create(
    [
      {
        album: 'Live. Love. ASAP',
        artist: 'A$AP Rocky',
        art: 'https://m.media-amazon.com/images/I/61P4wz16MGL._AC_SS350_.jpg',
        writeup: 'Hazy beats and super solid flows. Great album Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        score: '10'
      },
      {
        album: 'Yeezus',
        artist: 'Kanye West',
        art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSqiF5cSN0TEeFOAKyfjZE7oGPzJjhftXlFxQ&usqp=CAU',
        writeup: 'Harsh and beautiful sounds. Amazing album Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        score: '10'
      },
      {
        album: 'Threads',
        artist: 'Now, Now',
        art: 'https://img.discogs.com/ayZrEzMk7F6gti2h_aRTkRUXRUQ=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-3473347-1331762895.jpeg.jpg',
        writeup: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        score: '9'
      }
    ],
    (err, data)=>{
      res.redirect('/reviews');
    }
  )
});

router.get('/', (req, res) => {
  Reviews.find({}, (error, allReviews) => {
    res.render(
      'index.ejs',
    {
      reviews: allReviews,
      currentUser: req.session.currentUser
    });
  });
});



router.get('/new', isLoggedIn, (req, res) => {
  res.render('new.ejs',
  {currentUser: req.session.currentUser}
  );
});

router.get('/:id', (req, res)=>{
  Reviews.findById(req.params.id, (err, chosenReview) =>{
    res.render('show.ejs', {
      reviews: chosenReview,
      currentUser: req.session.currentUser
    })
  });
});

router.get('/:id/edit', isLoggedIn, (req, res)=> {
  Reviews.findById(req.params.id, (err, chosenReview)=> {
    res.render(
      'edit.ejs',
      {
        reviews: chosenReview,
        currentUser: req.session.currentUser
      }
    );
  });
});


router.post('/', (req, res) => {
  Reviews.create(req.body, (error, newReview) => {
    res.redirect('/reviews');
  });
});

router.delete('/:id', isLoggedIn, (req, res)=> {
  Reviews.findByIdAndRemove(req.params.id, (err, data)=> {
    res.redirect('/reviews');
  });
});

router.put('/:id', (req, res)=> {
  Reviews.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
    res.redirect('/reviews');
  });
});
