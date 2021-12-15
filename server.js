const express = require('express');
const app = express();
const port = 4000;
const mongoose = require ('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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