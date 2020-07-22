# Building a Web Application from scratch

## 1. Setup
(a) Install all the dependencies:
	- express
	- mongoose
	- connect-mongo
	- express-session
	- express-handlebars
	- dotenv
	- method-override
	- moment
	- morgan
	- passport
	- passport-google-oauth20
(b) Install the developer dependencies:
	- nodemon
	- cross-env

## 2. Workflow
(a) Setup handlebar engine
(b) Use font-awesome and materialize for css
(c) Setup google authentication
	- Register application with Google
	- Use passport for authentication middleware
(d) Route protection middleware
(e) Store session in database to avoid kicking out when page is reloaded
(f) Make persistent logins
(g) Make data models for user and blog
(h) Error handling
(i) Create add story button
(j) Add ck-editor
(k) Create helper functions for express-handler
(l) Generating selected options in handlebar template when editing stories
(m) Perform PUT request at places where client does not support using method-override


