const express = require('express');
const router = express.Router();

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            isAdmin: 0
        });
        user.save().then(result => {
            res.status(200).json({message: 'User Created'});
        }).catch(error => {
            console.log(error);
        })
    });
});

router.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({email: req.body.email}).then(user => {
        fetchedUser = user;
        if (!user) {
            return res.status(404).json({message: 'Auth Failed'});
        }
        return bcrypt.compare(req.body.password, user.password);
    }).then (result => {
        if (!result) {
            return res.status(404).json({message: 'Auth Failed'});
        }
        const administrator = fetchedUser.isAdmin;
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret-long', {expiresIn: '1h'});
        res.status(200).json({token: token, expiresIn: 3600, admin: administrator});
    }).catch (err => {
        console.log(err);
    });
})

module.exports = router;