const express = require('express');
const router = express.Router();


const Post = require('../models/post.js');

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

module.exports = router;