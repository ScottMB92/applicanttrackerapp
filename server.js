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
});

//read route

app.get('/applicants', (request, response) => {
    Applicant.find()
    .then((applicants) => response.json(applicants))
});

//update route

app.put("/update/:id", (request, response) => {
    const updatedApplicant = {
        name: request.body.name,
        jobTitle: request.body.jobTitle,
        backgroundChecks: request.body.backgroundChecks,
        references: request.body.references
    };
  
    Applicant.findByIdAndUpdate(
      {_id: request.params.id}, {$set: updatedApplicant}, (request, response, error) => {
        if (!error) {
          console.log("Record updated");
        } else {
          console.log(error);
        }
      }
    );
});

//delete route

app.delete('/delete/:id', (request, response) => {
    const id = request.params.id;
    Applicant.findByIdAndDelete({_id: id}, (request, response, error) => {
        if (!error) {
          console.log("Record deleted");
        } else {
          console.log(error);
        }
      });
    });

app.listen(port, function () {
    console.log("Server is running on port 4000");
});