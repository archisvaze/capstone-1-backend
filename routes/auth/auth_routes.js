const express = require("express");
const Teacher_Collection = require("../../models/teacher_schema")
const bcrypt = require("bcryptjs")

let router = express.Router();

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


module.exports = router;