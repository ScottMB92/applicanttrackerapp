const express = require('express');
const app = express();
const port = 4000;
const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://admin-scott:test123@cluster0.wtohy.mongodb.net/newapplicantsDB?retryWrites=true&w=majority');

const applicantSchema = {
    name: String,
    jobTitle: String,
    backgroundChecks: String,
    references: String
};

const Applicant = mongoose.model("Applicant", applicantSchema)

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
    .then((applicant) => console.log(applicant))
    .catch((error) => response.status(400).json("Error " + error));
});

app.get('/applicants', (request, response) => {
    Applicant.find()
    .then((applicants) => response.json(applicants))
    .catch((error) => response.status(400).json("Error: " + error));
});

app.listen(port, function () {
    console.log("Server is running on port 4000");
});