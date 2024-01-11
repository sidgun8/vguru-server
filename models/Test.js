const mongoose = require("mongoose")

const TestSchema = new mongoose.Schema({
    marks : {
        type : Number,
        default : 0
    },
    testType : {
        type : String,
        required : true
    },
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    reviewed : {
        type : Boolean,
        default : false
    },
    reviewedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    remarks : {
        type : String,
        default : "None"
    }
}, {
    timestamps : true
})

module.exports = mongoose.model("Test", TestSchema)