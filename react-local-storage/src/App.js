import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [resorts, setResorts] = useState([]);
  const [newResort, setNewResort] = useState({ name: '', location: '', runs: '', image: '' });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedResorts = JSON.parse(localStorage.getItem('resorts') || '[]');
    setResorts(storedResorts);
  }, []);

  const handleEdit = (index) => {
    const updatedResort = prompt('Enter updated resort information (Name, Location, Runs)');
    const updatedResorts = [...resorts];
    updatedResorts[index] = updatedResort.split(', ');
    if (!updatedResorts[index][0] || !updatedResorts[index][1] || !updatedResorts[index][2]) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    if (!Number.isInteger(parseInt(updatedResorts[index][2])) || isNaN(updatedResorts[index][2])) {
      alert("No. of Ski Runs must be an integer.");
      return;
    }
    localStorage.setItem('resorts', JSON.stringify(updatedResorts));
    setResorts(updatedResorts);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this resort?')) {
      const updatedResorts = [...resorts];
      updatedResorts.splice(index, 1);
      localStorage.setItem('resorts', JSON.stringify(updatedResorts));
      setResorts(updatedResorts);
    }
  };

  const handleAdd = () => {
    const regExp = /[a-zA-Z]/g;
    if (!newResort.name || !newResort.location || !newResort.runs) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    if (!Number.isInteger(parseInt(newResort.runs)) || newResort.runs.match(regExp)) {
      setErrorMessage("No. of Ski Runs must be an integer.");
      return;
    }
    const updatedResorts = [...resorts, [newResort.name, newResort.location, newResort.runs, newResort.image]];
    localStorage.setItem('resorts', JSON.stringify(updatedResorts));
    setResorts(updatedResorts);
    setNewResort({ name: '', location: '', runs: '', image: '' });
  };

  const handleInputChange = (event) => {
    setNewResort({ ...newResort, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewResort({ ...newResort, image: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ski Resort Management App</h1>
      </header>
      <h2>Add New Resort</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <input
          type="text"
          placeholder="Resort Name"
          name="name"
          value={newResort.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={newResort.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="No of Ski Runs"
          name="runs"
          value={newResort.runs}
          onChange={handleInputChange}
        />
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <h2>Existing Resorts</h2>
      <table>
        <thead>
          <tr>
            <th>Ski Resort Name</th>
            <th>Location</th>
            <th>No. of Ski Runs</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resorts.map((resort, index) => (
            <tr key={index}>
              <td>{resort[0]}</td>
              <td>{resort[1]}</td>
              <td>{resort[2]}</td>
              <td><img src={resort[3]} alt="Resort" width="100" height="100" /></td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

