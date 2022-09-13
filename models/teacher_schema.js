const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    quizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],

}, {
    timestamps: true
}
)

module.exports = mongoose.model("Teacher", TeacherSchema);