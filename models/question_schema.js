const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    choices: [{ type: String }],
    solution: { type: String },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }
}, {
    timestamps: true
}
)

module.exports = mongoose.model("Question", QuestionSchema);