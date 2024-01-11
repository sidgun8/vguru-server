const mongoose = require("mongoose")

const ReportSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    questionType : {
        type : String,
        required : true
    },
    feedback : {
        type : String,
        default : "None"
    },
    feedbackBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    feedbackMarks : {
        type : Number,
        default : 0
    },  
}, {
    timestamps : true
})

module.exports = mongoose.model("Report", ReportSchema)