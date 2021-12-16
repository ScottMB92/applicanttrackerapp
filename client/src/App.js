import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './tslogo.jpg';

function App() {

  const [applicant, setApplicant] = useState(
    {
      name: "",
      jobTitle: "",
      backgroundChecks: "",
      references: ""
    },
  );

  const [applicants, setApplicants] = useState([
    {
      name: "",
      jobTitle: "",
      backgroundChecks: "",
      references: "",
      _id: ""
    },
  ]);

  const [beginUpdate, setBeginUpdate] = useState(false);
  const [updatedApplicant, setUpdatedApplicant] = useState({
    name: "",
    jobTitle: "",
    backgroundChecks: "",
    references: "",
    id: ""
  });

  useEffect(() => {
    fetch('/applicants')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((jsonResponse) => setApplicants(jsonResponse));
  }, [applicants]);

  function uponChange(event) {
    const {name, value} = event.target
    setApplicant((lastInput) => {
      return {
          ...lastInput,
          [name]: value,
        };
    });
  }

  function addApplicant(event) {
    event.preventDefault();
    const newApplicant = {
      name: applicant.name,
      jobTitle: applicant.jobTitle,
      backgroundChecks: applicant.backgroundChecks,
      references: applicant.references
    };
    axios.post('/newapplicant', newApplicant);

    setApplicant({
      name: "",
      jobTitle: "",
      backgroundChecks: "",
      references: ""
    });
  }

  function startUpdate(id) {
    setBeginUpdate(true);
    setUpdatedApplicant(prevInput => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  function updateApplicant(id) {
    axios.put('/update/' + id, updatedApplicant);
    setBeginUpdate(false);
  }

  function uponUpdate(event) {
    const {name, value} = event.target;
    setUpdatedApplicant((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function deleteApplicant(id) {
    axios.delete('/delete/' + id);
  }

  return (
    <div className="App">
      {!beginUpdate ? (
      <div className="container">
        <div class="main">
        <div class="header">
          <img className="img-responsive" src={logo} alt="logo"/>
          <h3>Applicant Tracker</h3>
          <p>Please enter an applicant's name, job title, whether or not background checks have been completed, and whether or not references have been obtained below</p>
        </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Applicant's name:</span>
            </div>
          <input onChange = {uponChange} id = "nameField" name = "name" class="form-control" value = {applicant.name}></input>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Applicant's job title:</span>
            </div>
          <input onChange = {uponChange} id = "jobTitleField" name = "jobTitle" class="form-control" value = {applicant.jobTitle}></input>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Background checks:</span>
            </div>
          <input onChange = {uponChange} id = "backgroundChecksField" name = "backgroundChecks" class="form-control" value = {applicant.backgroundChecks}></input>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">References obtained:</span>
            </div>
          <input onChange = {uponChange} id = "referencesField" name = "references" class="form-control" value = {applicant.references}></input>
          </div>
          <button className="btn btn-primary" id ="addApplicantButton" onClick = {addApplicant}>Add applicant</button>
        </div>
      </div>
      ):(
        <div className="container">
        <div class="main">
        <div class="header">
          <img className="img-responsive" src={logo} alt="logo"/>
          <h3>Applicant Tracker</h3>
          <p>Please update the applicant's name, job title, whether or not background checks have been completed, and whether or not references have been obtained below</p>
        </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Applicant's name:</span>
            </div>
          <input onChange = {uponUpdate} id = "updatedNameField" name = "name" class="form-control" value = {updatedApplicant.name}></input>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Applicant's job title:</span>
            </div>
          <input onChange = {uponUpdate} id = "updatedJobTitleField" name = "jobTitle" class="form-control" value = {updatedApplicant.jobTitle}></input>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Background checks:</span>
            </div>
          <input onChange = {uponUpdate} id = "updatedBackgroundChecksField" name = "backgroundChecks" class="form-control" value = {updatedApplicant.backgroundChecks}></input>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">References obtained:</span>
            </div>
          <input onChange = {uponUpdate} id = "updatedReferencesField" name = "references" class="form-control" value = {updatedApplicant.references}></input>
          </div>
          <button className="btn btn-primary" id ="updateApplicantButton" onClick={() => updateApplicant(updatedApplicant.id)}>Update applicant</button>
          </div>
      </div>
      )}
      {applicants.map((applicant) => {
        return (
          <div className="content" key={applicant._id}>
            <h6>Applicant's name: </h6><p>{applicant.name}</p>
            <h6>Applicant's job title: </h6><p>{applicant.jobTitle}</p>
            <h6>Background checks: </h6><p>{applicant.backgroundChecks}</p>
            <h6>References obtained: </h6><p>{applicant.references}</p>
            <button className="btn btn-warning" id ="updateButton" onClick={() => startUpdate(applicant._id)}>Update</button>
            <button className="btn btn-danger" id ="deleteButton" onClick={() => deleteApplicant(applicant._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
