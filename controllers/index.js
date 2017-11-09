const express = require('express');
bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require("bcryptjs");


const Post = require('../models/post');
const User = require('../models/user');

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

//login
router.get('/login', (req, res) => {
    res.render('pages/login');
});

//reigster

router.get('/register', (req, res) => {
    res.render('pages/register');
});

router.post('/register', (req, res) => {
    let email = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;

    let newUser = new User({
    	email: email,
    	password: password
    });

    bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
    		if(err) {
    			console.log(err);
    			return res.redirect('/register');
    		}

    		newUser.password = hash;
    		newUser.save(function(err) {
    			if(err) {
    				console.log(err);
    				return res.redirect('/register');
    			} 
    			return res.redirect('/login');
    		})
    	});
    });
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

//Postituse lisaimise vaade

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
			res.redirect('/posts/add');
		} else {
			res.redirect('/posts');
		}
	});
});

//Üksiku postituse vaade

router.get('/post/:id', (req, res) => {
	let postId = req.params.id;
	Post.findOne({_id: postId}).exec((err, post) => {
		if(err) {
			console.log(err);
			res.redirect('/posts');
		} else {
			res.locals.post = post;
			res.render('pages/single-post')
		}
	});
});


//Postituse muutmise vaade

router.get('/post/:id/edit', (req, res) => {
	let postId = req.params.id;
	Post.findOne({_id: postId}).exec((err, post) => {
		if(err) {
			console.log(err);
			res.redirect('/posts');
		} else {
			res.locals.post = post;
			res.render('pages/edit-post')
		}
	});
});

router.post('/post/:id/edit', (req, res) => {
	let post = {
		title: req.body.title,
		author: req.body.author,
		content: req.body.content
	};

	let query = {_id: req.params.id};

	Post.update(query, post, (err) => {
		if(err) {
			console.log(err);
			res.redirect('/post/' + req.params.id + '/edit');
		} else {
			res.redirect('/post/' + req.params.id);
		}
	});

});

router.delete('/post/:id', (req, res) => {
	let query = {_id: req.params.id};

	Post.remove(query, (err) => {
		if(err) {
			console.log(err);
		} 
		res.send('Success');
	});
});




module.exports = router;