const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verify');

router.post('/register', async (req, res) => {
    try {
        const userinDatabase = await User.findOne({ username: req.body.username });
        if (userinDatabase) return res.status(400).json({ message: 'User already registered...' });
        const user = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 12),
            win: 0,
            loss: 0,
            logo: '',
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ token, user });
        } else res.status(400).json({ message: "Invalid user/password combination..." });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (!user) res.status(400).json({ error: 'Profile not found...' });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put('/:userId/updateTeam', verifyToken, async (req, res) => {

    try {
        const { team } = req.body;
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (!user) res.status(400).json({ error: 'Profile not found...' });
        const newData = await User.findByIdAndUpdate(req.params.userId, { team: team });
        return res.status(200).json({ newData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put('/:userId/updateOvr', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (!user) res.status(400).json({ error: 'Profile not found...' });
        const newData = await User.findByIdAndUpdate(req.params.userId, { ovr: req.body.ovr });
        return res.status(200).json({ newData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put('/:userId/updateLogo', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (!user) res.status(400).json({ error: 'Profile not found...' });
        const newData = await User.findByIdAndUpdate(req.params.userId, { logo: req.body.logo });
        return res.status(200).json({ newData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put('/:userId/takeL', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (!user) res.status(400).json({ error: 'Profile not found...' });
        const newData = await User.findByIdAndUpdate(req.params.userId, { $inc: { loss: 1 } }, { new: true });
        return res.status(200).json({ loss: newData.loss });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.put('/:userId/takeW', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (!user) res.status(400).json({ error: 'Profile not found...' });
        const newData = await User.findByIdAndUpdate(req.params.userId, { $inc: { win: 1 } }, { new: true });
        return res.status(200).json({ win: newData.win });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.put('/:userId/giveL/:challengerId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const challenger = await User.findById(req.params.challengerId);
        if (user.id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (!user) res.status(400).json({ error: 'Profile not found...' });
        if (!challenger) res.status(400).json({ error: 'Challenger not found...' });
        const newData = await User.findByIdAndUpdate(req.params.challengerId, { $inc: { loss: 1 } }, { new: true });
        return res.status(200).json({ loss: newData.loss });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.put('/:userId/giveW/:challengerId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const challenger = await User.findById(req.params.challengerId);
        if (user.id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (!user) res.status(400).json({ error: 'Profile not found...' });
        if (!challenger) res.status(400).json({ error: 'Challenger not found...' });
        const newData = await User.findByIdAndUpdate(req.params.challengerId, { $inc: { win: 1 } }, { new: true });
        return res.status(200).json({ win: newData.win });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/:userId/getTeam', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (!user) res.status(400).json({ error: 'Profile not found...' });
        return res.status(200).json({ team: user.team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})




module.exports = router;