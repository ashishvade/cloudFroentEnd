// src/EmployeeForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8092/api/employees/insert', {
        employeeId,
        name,
        department,
      });

      alert('Employee added successfully');
      // You can add logic to redirect the user or perform additional actions.
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee');
      // You can add logic to show an error message or perform additional actions.
    }
  };

  return (
    <div className='center-container'>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} className='employee-form'>
        <div className='form-content'>
          <div className='form-fields'>
            <label>
              Employee ID:
              <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
            </label>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Department:
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </label>
            <button type="submit">Add Employee</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
