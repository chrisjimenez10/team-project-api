const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

router.post('/register' , async(req, res) => {
    try {
        const userinDatabase = await User.findOne({ username: req.body.username });
        if(userinDatabase) return res.status(400).json({ message: 'User already registered...' });
        const user = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 12)
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/login' , async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(user && bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        }else res.status(200).json({message: "Invalid user/password combination..."});
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;