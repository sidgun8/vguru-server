const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const generateToken = (user) => {
    return jwt.sign(
        { id : user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

const verifyToken = (req, res, next) => {
    // Get token from the header
    const token = req.header('Authorization')?.split(' ')[1]; // Assumes token is sent as "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user payload to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

router.post('/register', async (req, res) => {
    try {
        const { name, email, role, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({ name, email, role, password });
        const token = generateToken(user);
        res.status(201).json({ message: "User created successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        res.status(200).json({ message: "Logged in successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/update', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the verified token
        const updateData = req.body;

        // Validate updateData here if needed

        // Find the user by ID and update their details
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/details', verifyToken ,async (req, res) => {
    try {
        // const user = await User.findById(req.user.id).populate('tests');
        const user = await User.findById(req.user.id)
                       .populate({
                           path: 'tests',
                           populate: {
                               path: 'reviewedBy',
                               model: 'User' // Replace 'User' with the model name used for your users
                           }
                       });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
