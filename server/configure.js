// var connect = require('connect'),
var path = require('path'),
	routes = require('./routes'),
	exphbs = require('express3-handlebars'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	morgan = require('morgan'),
	methodOverride = require('method-override'),
	errorHandler = require('errorHandler');

module.exports = function(app){
	//configuration code...

             // use handlebars for HTML rendering. 
             // filename used will be .handlebars

	app.engine('handlebars', exphbs.create({
		defaultLayout : 'main',
		layoutsDir : app.get('views') + '/layouts',
		partialsDir: [app.get('views') + '/partials']

	}).engine);

	app.set('view engine', 'handlebars');

	// configure various middlewares part of connect. 

	// app.use(connect.logger('dev')); 
	app.use(morgan('dev'));
	// app.use(connect.bodyParser({
	// 	uploadDir:path.join(__dirname, '../public/upload/temp')

	// }));
	// app.use(connect.json());
	// app.use(connect.urlencoded());
	
	app.use(bodyParser({
		uploadDir:path.join(__dirname,'../public/upload/temp')
	}));
	// app.use(connect.methodOverride());
	app.use(methodOverride());

	// app.use(connect.cookieParser('who-was-the-hero-of-matrix'));
	app.use(cookieParser('who-was-the-hero-of-matrix'));
	// app.use(app.router);
	routes.initialize(app, new express.Router());
	// app.use('/public/', connect.static(path.join(__dirname, '../public')));
	app.use('/public/', express.static(path.join(__dirname,'../public')));

	if('development' === app.get('env')) {
		// app.use(connect.errorHandler());
		app.use(errorHandler());
	}
	
	return app;
};