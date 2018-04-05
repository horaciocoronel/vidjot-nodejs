const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
	const title = "Welcome";
	res.render('index', {
		title: title
	});
});
app.get('/about', (req, res) => {
	res.render('about');
})


// Port
const port = 5000;

// Server Listens
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
