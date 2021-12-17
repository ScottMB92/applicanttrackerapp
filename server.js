const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require ('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASS}@cluster0.wtohy.mongodb.net/newapplicantsDB?retryWrites=true&w=majority`);

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

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});