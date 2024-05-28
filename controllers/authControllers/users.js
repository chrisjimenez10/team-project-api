const express = require('express');
const router = express.Router();
const User = require('../../models/users');


router.get('/' , async (req,res) => {
    const users = await User.find({});
    res.status(200).json(users);
}) 

module.exports = router;