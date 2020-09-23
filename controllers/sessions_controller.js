const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})

sessions.post('/', (req, res) => {

  User.findOne({ username: req.body.username}, (err, foundUser) => {
    console.log(bcrypt.compareSync(req.body.password, foundUser.password))
    if (err) {
      res.send('database is malfunctioning')
    } else if (!foundUser) {
      res.send('<a href="/">Account not found </a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/reviews')
      } else {
        res.send('<a href="/">Incorrect password </a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/reviews')
  })
})

module.exports = sessions
