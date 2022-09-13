const express = require("express");
const Teacher_Collection = require("../../models/teacher_schema");
const Student_Collection = require("../../models/student_schema");
const Quiz_Collection = require("../../models/quiz_schema")
const bcrypt = require("bcryptjs")

let router = express.Router();

//create new Student and Add student to Quiz

router.post("/student", async (req, res) => {
    let { name, quiz } = req.body
    let newStudent = new Student_Collection({
        name, quiz
    });
    try {
        console.log("Finding the Quiz...");
        let existingQuiz = await Quiz_Collection.findById(quiz);
        if (existingQuiz == null || existingQuiz == undefined) {
            return res.status(400).json({
                error: "Quiz id is incorrect or quiz does not exist"
            })
        }

        let savedStudent = await newStudent.save();
        let updatedQuiz = JSON.parse(JSON.stringify(existingQuiz));
        updatedQuiz["students"].push(savedStudent._id)

        //pushing student inside the quiz
        let response = await Quiz_Collection.findOneAndReplace(
            { _id: quiz },
            updatedQuiz
        )
        if (response) {
            return res.status(200).json({ message: "Student was added to Quiz" })
        } else {
            return res.status(400).json({ error: "Student cannot be added" })
        }
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })

    }

})

//create new Teacher Account
router.post("/signup", async (req, res) => {
    let { name, email, password } = req.body;
    console.log("Signing up a new Teacher Account...")

    const existingTeachers = await Teacher_Collection.find({ email: email });
    if (existingTeachers.length > 0) {
        return res.status(400).json({
            error: "Email already exists"
        })
    }

    //generate password hash
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);


    // teacher to db
    let newTeacher = new Teacher_Collection({
        name, email, password: hash
    });
    try {
        let savedTeacher = await newTeacher.save();
        return res.status(201).json(savedTeacher);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })

    }
})

//login for teacher
router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    console.log("Login in Teacher...")

    try {
        const existingTeacher = await Teacher_Collection.findOne({ email: email });
        if (existingTeacher == null || existingTeacher == undefined) {
            return res.status(400).json({ error: "Email does not exist!" })
        }
        let teacher = JSON.parse(JSON.stringify(existingTeacher));
        const validPassword = await bcrypt.compare(password, teacher.password);
        if (validPassword) {
            teacher.password = null
            return res.status(200).json(teacher)
        } else {
            return res.status(401).json({ error: "Invalid Password" })
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }

})


module.exports = router;