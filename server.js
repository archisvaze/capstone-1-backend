require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const httpServer = app.listen(process.env.PORT || 8000, () => {
    const port = httpServer.address().port;
    console.log("Express is running on port " + port);
})

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    }
})

//connect to Mongoose

const mongoose = require("mongoose");
const url = process.env.URL;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log("Connected to database " + url.split(":")[0])
    })
    .catch((err) => {
        console.log(err)
    })



//routes
const quizRouter = require("./routes/quiz_routes")
app.use("/quiz", quizRouter);

const authRouter = require("./routes/auth/auth_routes")
app.use("/auth", authRouter);

