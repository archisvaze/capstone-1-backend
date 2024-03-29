 # MCQ-ACE
 ## Endpoints
 
 ### All endpoints except /auth require Header { Authorization: Bearer + TOKEN }
 
 ### /quiz
 
- POST / - create a new quiz
- body {name: "Quiz_Name", teacher: "teacher_.id"}

- POST /:id/newquestion - create a new question for quiz with id
- body {question, choices, solution, image(optional)}

- POST /:id/removequestion - remove question from quiz
- body {questionID}

- GET /:id - get quiz details by id
- Response example : 
```
{
    "_id": "63283absdfsdf5216b",
    "name": "Postman Quiz",
    "teacher": {
        "_id": "2347dd933ab61a3e9122",
        "name": "Teacher 1",
        "email": "xyz@mail.com",
        "password": null,
        "createdAt": "2022-09-19T03:10:11.906Z",
        "updatedAt": "2022-09-19T03:10:11.906Z",
        "__v": 0
    },
    "questions": [],
    "nanoID": "000000",
    "createdAt": "2022-09-19T09:47:43.000Z",
    "updatedAt": "2022-09-19T09:47:43.000Z",
    "__v": 0
}
```

- GET /teacher/:id - get all quizes created by teacher with id

- GET /delete/:id - delete quiz with id

 ### /report
 
 - POST / - generate a new report
 - body { quiz(id), teacher(id), report, question_count(send number of questions the quiz had at the time of report generation) }

- Get /:id - get all reports generated by teacher with id
