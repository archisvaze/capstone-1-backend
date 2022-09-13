const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    score: {
        type: Number
    },
}, {
    timestamps: true
}
)

module.exports = mongoose.model("Student", StudentSchema);