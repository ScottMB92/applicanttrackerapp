import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

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

  return (
    <div className="App">
      <input onChange = {uponChange} name = "name" value = {applicant.name}></input>
      <input onChange = {uponChange} name = "jobTitle" value = {applicant.jobTitle}></input>
      <input onChange = {uponChange} name = "backgroundChecks" value = {applicant.backgroundChecks}></input>
      <input onChange = {uponChange} name = "references" value = {applicant.references}></input>
      <button onClick = {addApplicant}>Add applicant</button>
      {applicants.map((applicant) => {
        return (
          <div key={applicant._id}>
            <h1>{applicant.name}</h1>
            <h1>{applicant.jobTitle}</h1>
            <h1>{applicant.backgroundChecks}</h1>
            <h1>{applicant.references}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
