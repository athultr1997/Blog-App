const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: 'http://localhost:8000/auth/google/callback'
			},
			async (accessToken, refreshToken, profile, cb) => {
				console.log(profile)
			}
		)
	)

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})

	passport.deserializeUser((id, done) => {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	})
}