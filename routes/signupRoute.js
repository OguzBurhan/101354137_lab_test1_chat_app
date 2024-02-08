const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path to your User model
const router = express.Router();
const saltRounds = 10;


router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error creating user" });
    }
});


module.exports = router;
