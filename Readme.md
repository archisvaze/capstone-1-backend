# Capstone #1 Server

# Day1

## TimeChart
- 9:30 am - creating a db diagram
- 9:40 am - project init
- 9:42 am - project init done

### Milestone 1 - Create Schema and basic routes for Teacher, Student and Quiz
Estimated Time: 3 hours
- 9:44 am - started working on setup
- 10:10 am - created basic schemas for teacher, student and quiz
- 10:53 am - working on routes for adding question to the quiz
- 10:57 am - Taking a break
- 11:40 am - start working on routes for adding question to the quiz
- 12:30 am - done creating schemas and adding basic routes for teacher, student and quiz  

Milestone 1 Complete in: 2 hours 50 mins


### Milestone 2 - Create and setup React App with Login/Signup and Create Quiz and display All Quizes created by Teacher
Estimated Time: 4 hours 
- 1:30pm - started working on setup
- 1:50pm - Added Login Route
- 2:15pm - initiated React App, setup up routes, header and nav
- 2:36pm - working on Login page
- 2:48pm - working on saving teacher after login
- 3:06pm - creating new Route to show all quiz of a teacher 
- 4:10pm - new quiz can be created from client

Milestone 2 Complete in: 2 hours 40 mins


### Milestone 3 - Add/Remove Questions fomr Quiz/ Delete Quiz
Estimated Time: 4 hours
- 4:26pm - started working on delete quiz
- 5:10pm - delete quiz added on server and client
- 5:30pm - added alert to show various alerts/errors in the UI
- 5:30pm - signing OFF for the day

# Day2

### Milestone 3 - Add/Remove Questions fomr Quiz/ Delete Quiz
Estimated Time: 4 hours
- 8:37am - started working on frontend to ad/remove quiestions
- 9:00am - creating route to remove question
- 10:10am - finished add/remove question from quiz
- 10:30am - started working on creating new Page for editing quiz
- 11:00am - break
- 11:45am - resumed
- 12:15pm - added Edit-quiz page

Milestone 3 Complete in: 3 hours 45 mins

### Milestone 4 - Work on creating Quiz Rooms 
Estimated Time: 4 hours
- 1:30pm - socket setup
- 2:00pm - worked on socket.io connections
- 4:18pm - working on adding student to rooms using socket.io
- 5:30pm - done with creating Quiz Rooms
- 6:22pm - moved Room logic to the server

Milestone 4 Complete in: 4 hours


# Day3
### Milestone 5 - Work on creating Adding Students to A Quiz and Display Questions 
Estimated Time: 4 hours
- 8:30am - started working on quiz room logic
- 9:05am - Students can now join a quiz room and teacher will see connected students list
- 9:42am - Students can now see questions and teacher can control the flow of the quiz
- 9:48am - working on storing student answers in the quiz by sending answer and student name to server, then socket will relay that info to teacher and teacher will store that data in the report object
- 10:02am - taking a quick break
- 10:13am - started working on storing student answers
- 10:53am - added feature where if quiz has already started or ended, then students cannot enter room
- 11:00am - done with quiz progress
- 11:11am - started working on Quiz Ending Logic
- 12:17am - now teacher will see a report of the student answers

Milestone 5 Complete in: 3 hours 50 mins

quiz report will look something like this:
report : [
   {
    student: "archis",
    answers : [{question: dsfdfsd, answer: sasd}, {}, {}]
   }
]

### Milestone 6 - Work on showing Quiz End screen to student and add logic to keep track of scores
Estimated Time: 4 hours

- 12:52am - started workgin on end quiz screen for students
- 2:50pm - working on getting student scores for teacher screen
- 4:30pm - done adding scores to teacher and worked on CSS

Milestone 5 Complete in: 3 hours 30 mins


### Milestone 6 - ADD CSS TO THE WHOLE APP
Estimated Time: 5 hours

- 4:30pm - working on css
- 5:36pm - working on css
- 8:55pm - resumed Working on CSS
- 9:20pm - added media querries for responsive design
- 9:20pm - done for the day

# Day4
- 8:23am - working on the Edit quiz page design
- 9:38am - working on Quiz Page for Teacher
- 10:00am - working on Quiz Page for Student
- 10:13am - start wokring on Report Page after Quiz ends for Teacher 
- 10:30am - Taking a break 
- 10:45am - Working on report page css
- 11:00am - Teachers Page CSS Done
- 12:20pm - Students Page CSS Done

Milestone 5 Complete in: ~ 5 hours


### Milestone 6 - Signup Page
Estimated Time: 1 hour
- 12:20pm - start working on signup page
- 12:50pm - Signup Page Done

Milestone 6 Complete in: ~  30 mins



### Milestone 7 - Show Student answer on teachers screen while quiz is playing and create and show Reports

Estimated Time: 3 hours

- 1:40am - start working on showing student answered on teachers screen


