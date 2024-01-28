import React from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import AttendanceReport from './AttendanceReport';

function App() {
  return (
    <div>
      <EmployeeForm />
      <EmployeeList />
      <AttendanceReport />
    </div>
  );
}

export default App;