# Building a Blogging Web Application from Scratch

https://travis-ci.com/athultr1997/Blog-App.svg?branch=master

To see the application live in action please visit [Blog Application](https://blog-application-2020.herokuapp.com/)

## Setup
1. Install all the dependencies:
	* express
	* mongoose
	* connect-mongo
	* express-session
	* express-handlebars
	* dotenv
	* method-override
	* moment
	* morgan
	* passport
	* passport-google-oauth20
1. Install the developer dependencies:
	* nodemon
	* cross-env

## Workflow
1. Setup handlebar engine
1. Use font-awesome and materialize for css
1. Setup google authentication
	* Register application with Google
	* Use passport for authentication middleware
1. Route protection middleware
1. Store session in database to avoid kicking out when page is reloaded
1. Make persistent logins
1. Make data models for user and blog
1. Error handling
1. Create add story button
1. Add ck-editor
1. Create helper functions for express-handler
1. Generating selected options in handlebar template when editing stories
1. Perform PUT request at places where client does not support using method-override


