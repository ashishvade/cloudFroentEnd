
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AttendanceReport.css'; 

const AttendanceReport = () => {
  const [date, setDate] = useState('');
  const [reportType, setReportType] = useState('daily');
  const [report, setReport] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (reportType === 'daily') {
        response = await axios.get(`http://localhost:8092/api/employees/attendance-report/daily?date=${date}`);
      } else if (reportType === 'weekly') {
        const startDate = getStartOfWeek(date);
        const endDate = getEndOfWeek(date);
        console.log('Weekly Report Dates:', startDate, endDate);
        response = await axios.get(`http://localhost:8092/api/employees/attendance-report/weekly?startDate=${startDate}&endDate=${endDate}`);
      } else if (reportType === 'monthly') {
       
        const selectedMonth = date.substring(0, 7); // Extracts the first 7 characters (yyyy-MM)
    console.log('Monthly Report Dates:', selectedMonth);
    response = await axios.get(`http://localhost:8092/api/employees/attendance-report/monthly?month=${selectedMonth}`);
      }

      console.log('Response:', response.data);
      setReport(response.data);
    } catch (error) {
      console.error('Error fetching attendance report:', error);
    }
  };


  const formatTime12Hr = (timeString) => {
    if (!timeString) {
      return 'N/A'; 
    }

    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minutes} ${period}`;
  };



  const getStartOfWeek = (selectedDate) => {
    const currentDate = new Date(selectedDate);
    const dayOfWeek = currentDate.getDay();
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const startDate = new Date(currentDate.setDate(diff));
    return startDate.toISOString().split('T')[0];
  };

  const getEndOfWeek = (selectedDate) => {
    const startDate = new Date(getStartOfWeek(selectedDate));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return endDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    console.log('Report Updated:', report);
  }, [report]);

  return (
    <div className='container'>
      <h2>Attendance Report</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Report Type:
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        {reportType === 'daily' && (
          <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        )}
        <button type="submit">Get Report</button>
      </form>
      

<table className='attendance-table'>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Date</th>
            <th>Check In Time</th>
            <th>Check Out Time</th>
            <th>Total Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {report.map((entry) => (
            <tr key={entry.employeeId}>
              <td>{entry.employeeId}</td>
              <td>{entry.name}</td>
              <td>{entry.department}</td>
              <td>{entry.date}</td>
              <td>{formatTime12Hr(entry.checkInTime)}</td>
              <td>{formatTime12Hr(entry.checkOutTime)}</td>
              <td>{entry.totalHoursWorked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceReport;
