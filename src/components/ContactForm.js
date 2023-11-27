import React, { useState } from 'react';
import './ContactForm.css'

function ContactForm() {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');
  const [submittedData, setSubmittedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    if (input.startsWith('+') || /^[0-9]*$/.test(input)) {
      setPhoneNumber(input);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    filterData(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the username is empty
    if (username.trim() === '') {
      alert('Username cannot be empty. Please enter a username.');
      return;
    }

    // If username is not empty, proceed with submission
    const data = { username, phoneNumber, email };
    setSubmittedData([...submittedData, data]);
    setUsername('');
    setPhoneNumber('');
    setEmail('');
  };

  const filterData = (query) => {
    if (query.trim() === '') {
      setFilteredData([]); // Clear filtered data when the search input is empty
      return;
    }

    const filtered = submittedData.filter((data) =>
      data.username.toLowerCase().startsWith(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = (index) => {
    const updatedData = [...submittedData];
    updatedData.splice(index, 1);
    setSubmittedData(updatedData);
    setSearch('');
    setFilteredData([]);
  };

  return (  
    <div className="container">
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit} className="form">
        <table>
        <div>
          <tr>
          <td><label>Username:</label></td>
          <td><input type="text" value={username} onChange={handleUsernameChange} /></td>
          </tr>

        </div>
        <div>
          <tr>
          <td><label>Phone Number:</label></td>
          <td><input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          </td>
          </tr>
        </div>
      
        <div>
          <tr>
         <td><label>Email:</label></td> 
          <td><input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          </td>
          </tr>
        </div>
        </table>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Submitted Data:</h3>
        <ul>
          {submittedData.map((data, index) => (
            <li key={index}>
              Username: {data.username}, Phone Number: {data.phoneNumber}, Email: {data.email}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Filter Contact:</h3>
        <input
          type="text"
          placeholder="Search username"
          value={search}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredData.map((data, index) => (
            <li key={index}>
              Username: {data.username}, Phone Number: {data.phoneNumber}, Email: {data.email}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactForm;
