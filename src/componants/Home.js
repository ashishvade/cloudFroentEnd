
// import React, { useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [actionType, setActionType] = useState('check-in');
//   const [message, setMessage] = useState('');

//   const handlePunch = async () => {
//     try {
//       const response = await axios.post(`http://localhost:8092/api/employees/${employeeId}/${actionType}`);
//       console.log('Punch response:', response.data);

//       // Assuming the server responds with a success message
//       setMessage(`Successfully ${actionType === 'check-in' ? 'checked in' : 'checked out'}`);
//     } catch (error) {
//       console.error('Error punching:', error);

//       // Assuming the server responds with an error message
//       setMessage(`Failed to ${actionType === 'check-in' ? 'check in' : 'check out'}`);
//     }
//   };

//   return (
//     <div>
//       <h2>Punch In/Out</h2>
//       <label>
//         Employee ID:
//         <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
//       </label>
//       <label>
//         Action:
//         <select value={actionType} onChange={(e) => setActionType(e.target.value)}>
//           <option value="check-in">Check In</option>
//           <option value="check-out">Check Out</option>
//         </select>
//       </label>
//       <button onClick={handlePunch}>Punch</button>

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Home;
import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [actionType, setActionType] = useState('check-in');
  const [message, setMessage] = useState('');

  const handlePunch = async () => {
    try {
      const response = await axios.post(`http://localhost:8092/api/employees/${employeeId}/${actionType}`);
      console.log('Punch response:', response.data);

      // Assuming the server responds with a success message
      setMessage(`Successfully ${actionType === 'check-in' ? 'checked in' : 'checked out'}`);
    } catch (error) {
      console.error('Error punching:', error);

      // Assuming the server responds with an error message
      setMessage(`Failed to ${actionType === 'check-in' ? 'check in' : 'check out'}`);
    }
  };

  return (
    <div className="punch-form-container">
      <h2>Punch In/Out</h2>
      <label>
        Employee ID:
        <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
      </label>
      <label>
        Action:
        <select value={actionType} onChange={(e) => setActionType(e.target.value)}>
          <option value="check-in">Check In</option>
          <option value="check-out">Check Out</option>
        </select>
      </label>
      <button onClick={handlePunch}>Punch</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Home;
