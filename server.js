const express = require('express');
const hbs = require('hbs');							// express view engine, handlebars
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () =>{

	return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text)=>{

	return text.toUpperCase();

});

app.use((req, res, next) =>{															//Express application-level middleware 

	var time = new Date().toString() ;
	var log = `${time}-->Request Type : ${req.method}<--->Request URL : ${req.url}` ;

	console.log(log);
	fs.appendFile('server.log', log  + '\n', (err) =>{
		if(err){
			console.log('unable to append to file');
		}

	}  );
	next();

} );

app.use((req, res, next) =>{

	res.render('maintenance.hbs',{

		pageTitle : 'Welcome to Maintenance'
	});

	next();                                                                // using next still works for other than static file

});

app.use(express.static((__dirname + '/public')));     //For static web services
app.get('/',(req, res) => {

	res.render('home.hbs', {
		tabTitle : 'Home',
		pageTitle : 'Welcome to Home',
		
	})
});

app.get('/about',(req, res) =>{

	res.render('about.hbs', {
		tabTitle : 'About',
		pageTitle : 'About Page',
		
	});
});

app.get('/bad',(req, res) => {

	res.send({
		errorMessage : 'Error in handling request'
	});
});

app.listen(3000);