import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDepartment, setUpdatedDepartment] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8092/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8092/api/employees/delete/${employeeId}`);
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.employeeId !== employeeId));
      setMessage('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
      setMessage('Failed to delete employee');
    }
  };

  const handleUpdate = async () => {
    try {
      if (selectedEmployee) {
        
        const updatedFields = {};
        if (updatedName !== '') {
          updatedFields.name = updatedName;
        }
        if (updatedDepartment !== '') {
          updatedFields.department = updatedDepartment;
        }

       
        if (Object.keys(updatedFields).length > 0) {
          await axios.put(`http://localhost:8092/api/employees/update/${selectedEmployee.employeeId}`, updatedFields);

          
          const updatedEmployee = { ...selectedEmployee, ...updatedFields };
          setEmployees((prevEmployees) =>
            prevEmployees.map((emp) => (emp.employeeId === selectedEmployee.employeeId ? updatedEmployee : emp))
          );

          setSelectedEmployee(null);
          setUpdatedName('');
          setUpdatedDepartment('');
          setMessage('Employee updated successfully');
        } else {
          setMessage('No changes to update');
        }
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setMessage('Failed to update employee');
    }
  };

  const handleDetails = (employee) => {
    if (employee) {
      alert(`Details of employee: ${employee.employeeId}\nName: ${employee.name}\nDepartment: ${employee.department}`);
    }
  };

  return (
    <div className='container'>
    <div className='employee-container'>
      <h2>Employee List</h2>
      <table className='employee-table'>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>
                <button className='update-button' onClick={() => setSelectedEmployee(employee)}>
                  Update
                </button>
                <button className='delete-button' onClick={() => handleDelete(employee.employeeId)}>
                  Delete
                </button>
                <button className='details-button' onClick={() => handleDetails(employee)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className='update-form'>
          <h3>Update Employee</h3>
          <label>
            Name:
            <input type='text' value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          </label>
          <label>
            Department:
            <input type='text' value={updatedDepartment} onChange={(e) => setUpdatedDepartment(e.target.value)} />
          </label>
          <button onClick={handleUpdate}>Save Update</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default EmployeeList;
