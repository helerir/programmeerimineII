const express = require('express'); 
const app = express(); //käivitame express package

require('marko/node-require'); // Allow Node.js to require and load `.marko` files
const markoExpress = require('marko/express');


app.use(markoExpress()); //enable res.marko(template, data)

const folderName = 'views';
function importTemplate(template) {
	return require('./' + folderName + '/' + template);
}

const indexTemplate = importTemplate('template');
app.get('/', (req, res) => { //saadame kliendile tagasi ok. Võiks ka nt kogu <html></html> sinna kirjutada, et veebilehte kuvada, aga nii ei tehta. Selleks kasutatakse nüüd frameworki.
	res.marko(indexTemplate, {
		name: 'Juku'
	});
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
}); //saame ligi pordilt 3000