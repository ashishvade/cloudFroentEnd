// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [todayDate, setTodayDate] = useState('');
  const [calendarData, setCalendarData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [absentEmployees, setAbsentEmployees] = useState(0);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch today's date
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
      setTodayDate(formattedDate);

      // Fetch calendar data (if needed)
      // const calendarResponse = await axios.get('your_calendar_api_endpoint');
      // setCalendarData(calendarResponse.data);

      // Fetch total employees
      const employeesResponse = await axios.get('http://localhost:8092/api/employees');
      setTotalEmployees(employeesResponse.data.length);

      // Fetch present employees today
      const presentResponse = await axios.get(`http://localhost:8092/api/attendance/present/${formattedDate}`);
      setPresentEmployees(presentResponse.data.length);

      // Fetch absent employees today
      const absentResponse = await axios.get(`http://localhost:8092/api/attendance/absent/${formattedDate}`);
      setAbsentEmployees(absentResponse.data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <p>Today's Date: {todayDate}</p>
        {/* Render your calendar data here if needed */}
      </div>
      <div>
        <p>Total Employees: {totalEmployees}</p>
        <p>Present Employees Today: {presentEmployees}</p>
        <p>Absent Employees Today: {absentEmployees}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
