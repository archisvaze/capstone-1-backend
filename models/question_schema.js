const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    choices: [{ type: String }],
    solution: { type: String },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    image: { type: String },
}, {
    timestamps: true
}
)

module.exports = mongoose.model("Question", QuestionSchema);