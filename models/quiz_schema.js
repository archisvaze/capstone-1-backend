const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],


}, {
    timestamps: true
}
)

module.exports = mongoose.model("Quiz", QuizSchema);