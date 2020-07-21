const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Blog = require('../models/Blog')

router.get('/add', ensureAuth, (req, res) => {
  res.render('blogs/add')
})

router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Blog.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('errors/500')
  }
})

router.get('/', ensureAuth, async (req, res) => {
  try {
  	const blogs = await Blog.find({visibility: 'public'})
  		.populate('user')
  		.sort({timeCreated: 'desc'})
  		.lean()  	
  	
  	res.render('blogs/index', {
  		blogs,
  	})
  } catch(err) {
  	console.error(err)
  	res.render('errors/500')
  }
})

module.exports = router