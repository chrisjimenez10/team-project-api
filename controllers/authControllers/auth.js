const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verify');

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
            res.status(200).json({ token, user });
        }else res.status(400).json({message: "Invalid user/password combination..."});
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId){ 
            return res.status(401).json({ error: "Unauthorized"})
        }
        if(!user) res.status(400).json({error: 'Profile not found...'});
        res.json({user});
    } catch (error) {
        res.status(500).json({error: error.message });
    }
})

router.put('/:userId/updateTeam', verifyToken, async (req, res) => {
    
    try {
        const { team } = req.body;
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId){ 
            return res.status(401).json({ error: "Unauthorized"})
        }
        if(!user) res.status(400).json({error: 'Profile not found...'});
        const newData = await User.findByIdAndUpdate(req.params.userId, {team: team});
        return res.status(200).json({newData});
    } catch (error) {
        res.status(500).json({error: error.message });
    }
})

router.put('/:userId/updateOvr', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId){ 
            return res.status(401).json({ error: "Unauthorized"})
        }
        if(!user) res.status(400).json({error: 'Profile not found...'});
        const newData = await User.findByIdAndUpdate(req.params.userId, {ovr: req.body.ovr});
        return res.status(200).json({newData});
    } catch (error) {
        res.status(500).json({error: error.message });
    }
})


router.get('/:userId/getTeam', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId){ 
            return res.status(401).json({ error: "Unauthorized"})
        }
        if(!user) res.status(400).json({error: 'Profile not found...'});
        return res.status(200).json({ team: user.team });
    } catch (error) {
        res.status(500).json({error: error.message });
    }
})




module.exports = router;