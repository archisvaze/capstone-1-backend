const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    question_count: { type: Number },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    report: []

}, {
    timestamps: true
}
)

module.exports = mongoose.model("Report", ReportSchema);