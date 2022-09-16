const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    report: []

}, {
    timestamps: true
}
)

module.exports = mongoose.model("Report", ReportSchema);