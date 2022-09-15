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

let rooms = [];


//socket io
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    }
})

io.on("connection", (socket) => {
    console.log("Client Connected " + socket.id);
    socket.emit("react-connection", socket.id)



    socket.on("create-room", (data) => {
        let newRoom = {
            clientID: data.clientID,
            quizID: data.quiz._id,
            students: []
        }
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].quizID === newRoom.quizID) {
                rooms.splice(i, 1, newRoom)
            }
        }
        data.room = newRoom;
        rooms.push(newRoom);
        console.log("create room")
        socket.join(data.quiz._id);
        io.to(data.clientID).emit("room-created", data)

    })

    socket.on("join-room", (data) => {
        console.log("join requested")
        for (let room of rooms) {
            if (room.quizID === data.quizID) {
                console.log("room found!")
                if (room.students.includes(data.name)) {
                    console.log("name already in room")
                    io.to(data.clientID).emit("join-request-denied", data)
                    return;
                } else {
                    console.log("join granted")
                    
                    //adding student to room
                    room.students.push(data.name)

                    io.to(data.clientID).emit("join-request-granted", data)
                    socket.join(data.quizID);

                    io.to(data.quizID).emit("student-connected", room)
                
                }
            }
        }
    })



    socket.on("destroy-room", data => {
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].quizID === data.quiz._id) {
                rooms.splice(i, 1);
            }
        }
    })
    //cleanup code on client exit
    socket.on("disconnect", () => {
        console.log("Client Disconnected " + socket.id);
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].clientID === socket.id) {
                rooms.splice(i, 1);
                return;
            }
        }
    }
    )
})