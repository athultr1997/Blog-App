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
		const blogs = await Blog.find({ visibility: 'public' })
			.populate('user')
			.sort({timeCreated: 'desc'})
			.lean()		
		
		res.render('blogs/index', {
			loggedUser: req.user,
			blogs,
		})
	} catch(err) {
		console.error(err)
		res.render('errors/500')
	}
})

router.get('/edit/:id', ensureAuth, async (req, res) => {
	try {
		const blog = await Blog.findOne({
			_id: req.params.id
		}).lean()	

		if(!blog) {
			res.redirect('errors/500')		
		} else if(blog.user != req.user.id) {		
			res.redirect('/blogs')
		} else {		
			res.render('blogs/edit', {
				blog,
			})
		}
	} catch(err) {
		console.error(err)
		return res.render('errors/500')
	}
})

router.get('/:id', ensureAuth, async (req, res) => {
	try {
		const blog = await Blog.findOne({ 
				_id: req.params.id
			})
			.populate('user')
			.lean()

		if(!blog) {
			res.redirect('errors/404')		
		} else {			
			res.render('blogs/show', {
				loggedUser: req.user,
				blog,
			})
		}
	} catch(err) {
		console.error(err)
		return res.render('errors/500')
	}
})

router.put('/:id', ensureAuth, async (req, res) => {
	try {
		let blog = await Blog.findOne({
			_id: req.params.id
		}).lean()

		if(!blog) {
			res.redirect('errors/500')		
		} else if(blog.user != req.user.id) {
			res.redirect('/blogs')
		} else {
			blog = await Blog.findOneAndUpdate({_id: req.params.id}, req.body, {
				new: true,
				runValidators: true
			})

			res.redirect('/dashboard')
		}
	} catch(err) {
		console.error(err)
		return res.render('errors/500')
	}
})

router.delete('/:id', ensureAuth, async (req, res) => {
	try {
		await Blog.remove({ _id: req.params.id})
		res.redirect('/dashboard')
	} catch(err) {
		console.error(err)
		return res.render('errors/500')
	}
})

router.get('/user/:userId', ensureAuth, async (req, res) => {
	try {
		let blogs = await Blog.find({
			user: req.params.userId,
			visibility: 'public'
		})
			.populate('user')
			.lean()

		res.render('blogs/index', {
			loggedUser: req.user,
			blogs,
		})

	} catch(err) {
		console.error(err)
		return res.render('errors/500')	
	}
})

module.exports = router