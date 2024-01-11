const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model("Quiz", quizSchema)