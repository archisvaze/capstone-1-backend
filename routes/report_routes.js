const express = require("express");
const Report_Collection = require("../models/report_schema");
const Teacher_Collection = require("../models/teacher_schema")
const Quiz_Collection = require("../models/quiz_schema")

let router = express.Router();

//create a new report
router.post("/", async (req, res) => {
    let { quiz, teacher, report } = req.body;

    let newReport = new Report_Collection({
        quiz, teacher, report
    })

    try {
        let existingTeacher = await Teacher_Collection.findById(teacher);
        if (existingTeacher == null || existingTeacher == undefined) {
            return res.status(400).json({
                error: "Teacher id is incorrect or Teacher does not exist"
            })
        }
        let existingQuiz = await Quiz_Collection.findById(quiz);
        if (existingQuiz == null || existingQuiz == undefined) {
            return res.status(400).json({
                error: "Quiz id is incorrect or Quiz does not exist"
            })
        }
        let savedReport = await newReport.save();
        return res.status(200).json({ message: "New Report created " + savedReport._id })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })

    }


})





module.exports = router;