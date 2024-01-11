const express = require('express');
const router = express.Router();
const Report = require('../models/Report');


router.post('/add', async (req, res) => {
    try {
        const report = await Report.create(req.body);
        res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router