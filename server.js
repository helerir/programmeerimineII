const express = require('express'); 
const app = express(); //käivitame express package
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', {name: 'Juku', vanus: '20'});
});

app.get('/pages', (req, res) => {
	res.render('pages/index');
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});