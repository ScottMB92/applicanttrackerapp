const express = require('express');
const app = express();
const port = 4000;
const mongoose = require ('mongoose');
const cors = require('cors');

//config

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongodb

mongoose.connect('mongodb+srv://admin-scott:test123@cluster0.wtohy.mongodb.net/newapplicantsDB?retryWrites=true&w=majority');

//data schema

const applicantSchema = {
    name: String,
    jobTitle: String,
    backgroundChecks: String,
    references: String
};

//data model

const Applicant = mongoose.model("Applicant", applicantSchema)

//create route
app.post('/newapplicant', (request, response) => {
    const newApplicant = new Applicant(
        {
            name: request.body.name,
            jobTitle: request.body.jobTitle,
            backgroundChecks: request.body.backgroundChecks,
            references: request.body.references
        }
    );
    newApplicant.save()
    .then(applicant => console.log(applicant))
});

//read route

app.get('/applicants', (request, response) => {
    Applicant.find()
    .then((applicants) => response.json(applicants))
});

//update route

//delete route

app.listen(port, function () {
    console.log("Server is running on port 4000");
});