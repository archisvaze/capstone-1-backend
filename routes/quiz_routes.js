const express = require("express");
const Quiz_Collection = require("../models/quiz_schema")
const Question_Collection = require("../models/question_schema");
const Teacher_Collection = require("../models/teacher_schema");
const generate = require('nanoid/generate')

let router = express.Router();

//create new Quiz
router.post("/", async (req, res) => {
    let { name, teacher } = req.body;
    console.log("Creating a new Quiz...")

    let newQuiz = new Quiz_Collection({
        name, teacher, nanoID: `${generate('1234567890', 6)}`
    });

    try {
        let existingTeacher = await Teacher_Collection.findById(teacher);
        if (existingTeacher == null || existingTeacher == undefined) {
            return res.status(400).json({
                error: "Teacher id is incorrect or Teacher does not exist"
            })
        }
        let savedQuiz = await newQuiz.save();
        return res.status(200).json({ message: "New Quiz created " + savedQuiz._id })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })

    }
})


//create new Question for a Quiz
router.post("/:id/newquestion", async (req, res) => {
    let { question, type, choices, solution, image } = req.body;
    console.log("Creating a new Question...")
    try {
        let newQuestion = new Question_Collection({
            question, type, choices, solution, quiz: req.params.id, image
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
        updatedQuiz["questions"].push(savedQuestion._id);

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
                //remove question from DB
                let response2 = await Question_Collection.findOneAndDelete({
                    _id: questionID
                })
                if (response && response2) {
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
        //delete quiz
        let response = await Quiz_Collection.deleteOne({ _id: req.params.id });
        //delete all questions assoiciated with the quiz
        await Question_Collection.deleteMany({
            quiz: req.params.id
        })
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


//move Question UP inside array inside the quiz obj

router.get("/:id/move-question-up/:questionID/", async (req, res) => {
    //find Quiz
    console.log("finding Quiz...")
    try {
        let existingQuiz = await Quiz_Collection.findById(req.params.id);

        let updatedQuiz = JSON.parse(JSON.stringify(existingQuiz));
        for (let i = 0; i <= updatedQuiz.questions.length; i++) {
            console.log(updatedQuiz.questions[i], req.params.questionID)
            if (updatedQuiz.questions[i] === req.params.questionID) {
                console.log("question found! moving question UP...")

                let currQuestion = updatedQuiz.questions[i];

                let aboveQuestion = updatedQuiz.questions[i - 1];

                updatedQuiz.questions.splice(i - 1, 1, currQuestion);
                updatedQuiz.questions.splice(i, 1, aboveQuestion);

                console.log("question moved")
                //replace the quiz with updatedQuiz
                let response = await Quiz_Collection.findOneAndReplace(
                    { _id: req.params.id },
                    updatedQuiz
                )
                if (response) {
                    return res.status(200).json({ message: "Question was moved UP" })
                }
                else {
                    return res.status(400).json({ error: "Question cannot be moved UP" })
                }

            }
        }
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})

//move question down

router.get("/:id/move-question-down/:questionID/", async (req, res) => {
    //find Quiz
    console.log("finding Quiz...")
    try {
        let existingQuiz = await Quiz_Collection.findById(req.params.id);

        let updatedQuiz = JSON.parse(JSON.stringify(existingQuiz));
        for (let i = 0; i <= updatedQuiz.questions.length; i++) {
            console.log(updatedQuiz.questions[i], req.params.questionID)
            if (updatedQuiz.questions[i] === req.params.questionID) {
                console.log("question found! moving question DOWN...")

                let currQuestion = updatedQuiz.questions[i];

                let bellowQuestion = updatedQuiz.questions[i + 1];

                updatedQuiz.questions.splice(i + 1, 1, currQuestion);
                updatedQuiz.questions.splice(i, 1, bellowQuestion);

                console.log("question moved")
                //replace the quiz with updatedQuiz
                let response = await Quiz_Collection.findOneAndReplace(
                    { _id: req.params.id },
                    updatedQuiz
                )
                if (response) {
                    return res.status(200).json({ message: "Question was moved DOWN" })
                }
                else {
                    return res.status(400).json({ error: "Question cannot be moved DOWN" })
                }

            }
        }
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})

module.exports = router;