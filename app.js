const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
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

// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes
app.get('/', (req, res) => {
	const title = "Welcome";
	res.render('index', {
		title: title
	});
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/ideas', (req, res) => {
	Idea.find({})
		.sort({date:'desc'})
		.then(ideas => {
			res.render('ideas/index', {
				ideas:ideas
			});
		});
});

app.get('/ideas/add', (req, res) => {
	res.render('ideas/add');
});

app.get('/ideas/edit/:id', (req, res) => {
	Idea.findOne({
		_id: req.params.id,
	})
	.then(idea => {
		res.render('ideas/edit', {
			idea:idea
		});
	});
});

app.post('/ideas', (req, res) => {
	let errors = [];
	if(!req.body.title) {
		errors.push({text: 'Please add a title'})
	}
	if(!req.body.details) {
		errors.push({text: 'Please add some details'})
	}
	if(errors.length > 0) {
		res.render('ideas/add', {
			errors: errors,
			title: req.body.title,
			details: req.body.details,
		});
	} else {
		const newUser = {
			title: req.body.title,
			details: req.body.details
		}
		new Idea(newUser)
			.save()
			.then(idea => {
				res.redirect('/ideas');
			})
	}
});


// Port
const port = 5000;

// Server Listens
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
