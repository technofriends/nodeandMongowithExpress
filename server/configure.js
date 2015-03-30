var connect = require('connect'),
	path = require('path'),
	routes = require('./routes'),
	exphbs = require('express3-handlebars');

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

	app.use(connect.logger('dev')); 
	app.use(connect.bodyParser({
		uploadDir:path.join(__dirname, '../public/upload/temp')

	}));
	app.use(connect.json());
	app.use(connect.urlencoded());
	app.use(connect.methodOverride());
	app.use(connect.cookieParser('who-was-the-hero-of-matrix'));
	app.use(app.router);
	app.use('/public', connect.static(path.join(__dirname, '../public')));

	if('development' === app.get('env')) {
		app.use(connect.errorHandler());
	}
	routes.initialize(app);
	return app;
};