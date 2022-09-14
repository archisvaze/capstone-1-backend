const express = require("express");
const Quiz_Collection = require("../models/quiz_schema")
const Question_Collection = require("../models/question_schema");
const Teacher_Collection = require("../models/teacher_schema")

let router = express.Router();

//create new Quiz
router.post("/", async (req, res) => {
    let { name, teacher } = req.body;
    console.log("Creating a new Quiz...")

    let newQuiz = new Quiz_Collection({
        name, teacher
    });

    try {
        let existingTeacher = await Teacher_Collection.findById(teacher);
        if (existingTeacher == null || existingTeacher == undefined) {
            return res.status(400).json({
                error: "Teacher id is incorrect or Teacher does not exist"
            })
        }
        let savedQuiz = await newQuiz.save();
        return res.status(400).json({ message: "New Quiz created " + savedQuiz._id })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })

    }
})


//create new Question for a Quiz
router.post("/:id/newquestion", async (req, res) => {
    let { question, type, choices, solution } = req.body;
    console.log("Creating a new Question...")
    try {
        let newQuestion = new Question_Collection({
            question, type, choices, solution, quiz: req.params.id
        });
        console.log("Finding the Quiz...");
        let existingQuiz = await Quiz_Collection.findById(req.params.id);
        if (existingQuiz == null || existingQuiz == undefined) {
            return res.status(400).json({
                error: "Quiz id is incorrect or quiz does not exist"
            })
        }
        let savedQuestion = await newQuestion.save();
        let updatedQuiz = JSON.parse(JSON.stringify(existingQuiz));
        console.log("Pushing question to the quiz...")
        updatedQuiz["questions"].unshift(savedQuestion._id);

        let response = await Quiz_Collection.findOneAndReplace(
            { _id: req.params.id },
            updatedQuiz
        )
        if (response) {
            return res.status(200).json({ message: "Question was added to Quiz" })
        } else {
            return res.status(400).json({ error: "Quesion cannot be added" })
        }
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })

    }
})

//remove a question for a Quiz
router.post("/:id/removequestion", async (req, res) => {
    let { questionID } = req.body;
    console.log("Removing Question started...")
    try {
        console.log("Finding the Quiz...");
        let existingQuiz = await Quiz_Collection.findById(req.params.id);
        if (existingQuiz == null || existingQuiz == undefined) {
            return res.status(400).json({
                error: "Quiz id is incorrect or quiz does not exist"
            })
        }
        let updatedQuiz = JSON.parse(JSON.stringify(existingQuiz));
        console.log("removing question from the quiz...")
        for (let i = 0; i < updatedQuiz.questions.length; i++) {
            if (updatedQuiz.questions[i] == questionID) {
                updatedQuiz.questions.splice(i, 1);
                console.log(updatedQuiz)
                let response = await Quiz_Collection.findOneAndReplace(
                    { _id: req.params.id },
                    updatedQuiz
                )
                if (response) {
                    return res.status(200).json({ message: "Question was removed from Quiz" })
                } else {
                    return res.status(400).json({ error: "Quesion cannot be removed" })
                }
            }
        }
        return res.status(400).json({ error: "Question does not exist" })

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })

    }
})


//get quiz details by id

router.get("/:id", async (req, res) => {
    try {
        let existingQuiz = await Quiz_Collection.findById(req.params.id)
            .populate("questions")
            .populate("students")
            .populate("teacher");
        if (existingQuiz == null || existingQuiz == undefined) {
            return res.status(400).json({
                error: "Quiz id is incorrect or quiz does not exist"
            })
        }
        res.status(200).json(existingQuiz);


    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})


//get all quizes of a techer

router.get("/teacher/:id", async (req, res) => {
    try {
        let quizes = await Quiz_Collection.find({ teacher: req.params.id })
            .populate("questions")
            .populate("students")

        return res.status(200).json(quizes)

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})


//delete a quiz

router.get("/delete/:id", async (req, res) => {
    try {
        let response = await Quiz_Collection.deleteOne({ _id: req.params.id });
        if (response.deletedCount == 1) {
            return res.status(200).json({ message: "Quiz deleted" })
        }
        else {
            return res.status(400).json({ error: "Cannot not delete Quiz" })
        }
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})

module.exports = router;