const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

// Loading configuration
dotenv.config({path: './config/config.env'})

// Passport configuration
require('./config/passport')(passport)

// Connect to MongoDB database
connectDB()

// Create App
const app = express()

// Load morgan for logging
if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

// Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routing
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

// Setting up server
const PORT = process.env.PORT || 3000

app.listen(
	PORT,
	console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)