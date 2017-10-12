const express = require('express');
bodyParser = require('body-parser');
const router = express.Router();


const Post = require('../models/post');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * 
 * Rakendus kuulab GET päringut asukohta "/",
 * kus esimene parameeter on relatiivne asukoht serveri mõistes
 * ehk kui veebiserver on localhost:3000, siis app.get('/asukoht') oleks localhost:3000/asukoht.
*/
router.get('/', (req, res) => {
    /**
     * Vaate "renderdamine", ehk parsitakse EJS süntaks HTML-iks kokku
     * ning saadetakse kliendile, kes selle päringu teostas (ehk kes sellele URL-ile läks)
    */
    res.render('pages/index');
});

router.get('/posts', (req, res) => {
	Post.find({}, (err, posts) => {
		if(err) {
			console.log(err);
		} else {
			res.locals.posts = posts;
			console.log(posts);
			res.render('pages/posts')
			//res.json(posts);
		}
	});
});

router.get('/posts/add', (req, res) => {
	res.render('pages/add-post');
});

router.post('/posts/add', (req, res) => {
	console.log(req.body);
	let newPost = new Post({
		title: req.body.title,
		author: req.body.author,
		content: req.body.content
	});

	newPost.save((err) => {
		if(err) {
			console.log(err);
			res.redirect('/posts');
		}
	});
});

module.exports = router;