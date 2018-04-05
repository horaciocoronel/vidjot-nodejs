const express = require('express');

const app = express();

// Routes
app.get('/', (req, res) => {
	res.send('INDEX');
});
app.get('/about', (req, res) => {
	res.send('ABOUT');
})


// Port
const port = 5000;

// Server Listens
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
