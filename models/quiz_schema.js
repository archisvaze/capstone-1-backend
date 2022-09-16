const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],


}, {
    timestamps: true
}
)

module.exports = mongoose.model("Quiz", QuizSchema);