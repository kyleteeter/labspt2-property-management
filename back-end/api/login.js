const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../data/helper/tenants');
const { generateToken } = require('../auth/bcrypt');

router.post('/register', (req, res, next) => {
	const creds = req.body;
	const hash = bcrypt.hashSync(creds.password, 14);
	creds.password = hash;
	console.log(req.body);
	db
		.createUser(creds)
		.then((ids) => {
			// console.log(ids);
			db
				.findByUserId(ids[0])
				.then((user) => {
					res.status(201).json({ user: user.id });
				})
				.catch((err) => {
					res.status(500).json({ err });
				});
		})
		.catch((err) => {
			next('h500', err);
		});
});

router.post('/login', (req, res, next) => {
	const creds = req.body;
	db
		.findByEmail(creds.email)
		.then((users) => {
			user = users[0];

			console.log(user);
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				const token = generateToken(user);
				// console.log(token);
				res.json({
					Welcome: user.firstName,
					userId: user.id,
					token,
					isAdmin: user.isAdmin
				});
			} else {
				res.status(401).json({ message: 'Not Authorized' });
			}
		})
		.catch((err) => {
			next('h500', err);
		});
});

module.exports = router;
