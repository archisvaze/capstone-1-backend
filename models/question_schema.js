const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    choices: [{ type: String }],
    solution: { type: String }
}, {
    timestamps: true
}
)

module.exports = mongoose.model("Question", QuestionSchema);