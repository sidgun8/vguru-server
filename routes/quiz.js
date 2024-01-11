const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');


// get all questions
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// create question
router.post('/create', async (req, res) => {
    const quiz = new Quiz({
        question: req.body.question,
        answers: req.body.answers,
        correctAnswer: req.body.correctAnswer,
    });
    try {
        const newQuiz = await quiz.save();
        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// update question
router.patch('/:id', async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedQuiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get question by id
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// delete question
router.delete('/:id', async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedQuiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router