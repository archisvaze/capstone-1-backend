const express = require("express");
const Quiz_Collection = require("../models/quiz_schema")
const Question_Collection = require("../models/question_schema")

let router = express.Router();

//create new Quiz
router.post("/", async (req, res) => {
    let { name, owner } = req.body;
    console.log("Creating a new Quiz...")

    let newQuiz = new Quiz_Collection({
        name, owner
    });
    try {
        let savedQuiz = await newQuiz.save();
        return res.status(201).json(savedQuiz);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })

    }
})


//create new Question for a Quiz
router.post("/:id/newquestion", async (req, res) => {
    let { question, type, choice, solution } = req.body;
    console.log("Creating a new Question...")
    try {
        let newQuestion = new Question_Collection({
            question, type, choice, solution, quiz: req.params.id
        });
        console.log("Finding the Quiz...");
        let existingQuiz = await Quiz_Collection.findById(quiz);
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
            return res.status(200).json({ message: "Question added to Quiz" })
        } else {
            return res.status(400).json({ error: "Quesion cannot be added" })
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })

    }
})


module.exports = router;