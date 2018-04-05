const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/vidjot')
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

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

app.get('/ideas/add', (req, res) => {
	res.render('ideas/add');
})


// Port
const port = 5000;

// Server Listens
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
