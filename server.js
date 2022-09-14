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



//socket io
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    }
})

io.on("connection", (socket) => {
    console.log("Quiz Room Connected " + socket.id);

    socket.on("create-room", (data) => {
        socket.join(data.quiz._id);
        socket.emit("room-created", data)

    })

    socket.on("join-room", (data) => {
        socket.join(data.quizID);
        socket.emit("room-joined", data);
        io.to(data.quizID).emit("student-connected", data)
    })




    socket.on("disconnect", () => console.log("Quiz Room Disconnected " + socket.id))
})