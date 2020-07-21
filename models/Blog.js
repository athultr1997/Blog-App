const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({	
	title: {
		type: String,
		required: true,
		trim: true
	},	
	body: {
		type: String,
		required: true
	},	
	visibility: {
		type: String,
		default: 'public',
		enum: ['public', 'private']
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	timeCreated: {
		type: Date,
		default: Date.now
	}
})

const Blog = new mongoose.model('Blog', BlogSchema)

module.exports = Blog