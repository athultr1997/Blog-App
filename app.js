const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Loading configuration
dotenv.config({path: './config/config.env'})

// Passport configuration
require('./config/passport')(passport)

// Connect to MongoDB database
connectDB()

// Create App
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// Method Override
app.use(methodOverride((req, res) => {
	if(req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		let method = req.body._method
		delete req.body._method
		return method
	}
}))

// Load morgan for logging
if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

//Handlebar helpers
const {formatDate, truncate, stripTags, editIcon, select} = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', exphbs({
	helpers: {
		formatDate,
		truncate,
		stripTags,
		editIcon,
		select,
	},
	defaultLayout: 'main',
	extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routing
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/blogs', require('./routes/blogs'))

// Setting up server
const PORT = process.env.PORT || 3000

app.listen(
	PORT,
	console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)