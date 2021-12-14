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
      <div className="main">
      <input onChange = {uponChange} name = "name" value = {applicant.name}></input>
      <input onChange = {uponChange} name = "jobTitle" value = {applicant.jobTitle}></input>
      <input onChange = {uponChange} name = "backgroundChecks" value = {applicant.backgroundChecks}></input>
      <input onChange = {uponChange} name = "references" value = {applicant.references}></input>
      <button onClick = {addApplicant}>Add applicant</button>
      </div>
      ):(
          <div className="main">
          <input onChange = {uponUpdate} name = "name" value = {updatedApplicant.name}></input>
          <input onChange = {uponUpdate} name = "jobTitle" value = {updatedApplicant.jobTitle}></input>
          <input onChange = {uponUpdate} name = "backgroundChecks" value = {updatedApplicant.backgroundChecks}></input>
          <input onChange = {uponUpdate} name = "references" value = {updatedApplicant.references}></input>
          <button onClick={() => updateApplicant(updatedApplicant.id)}>Update applicant</button>
          </div>
      )}
      {applicants.map((applicant) => {
        return (
          <div key={applicant._id} style={{background: 'red', width: '40%', margin: 'auto auto'}}>
            <p>{applicant.name}</p>
            <p>{applicant.jobTitle}</p>
            <p>{applicant.backgroundChecks}</p>
            <p>{applicant.references}</p>
            <button onClick={() => startUpdate(applicant._id)}>Update</button>
            <button onClick={() => deleteApplicant(applicant._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
