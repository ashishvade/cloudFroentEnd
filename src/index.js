import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './componants/Footer';
import Header from './componants/Header';
import Home from './componants/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import EmployeeList from './componants/EmployeeList';
import AttendanceReport from './componants/AttendanceReport';
import EmployeeForm from './componants/EmployeeForm';
import AdminDashboard from './componants/AdminDashboard';
// import LoginPage from './componants/LoginPage';
// import { AuthProvider ,useAuth} from './componants/AuthContext';




 
var rec=(
  // <AuthProvider>
  <BrowserRouter>
  <div className='App'>

   <Header></Header>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    {/* <Route path='/login' element={<LoginPage/>}></Route> */}

    <Route path='/empForm' element={<EmployeeForm/>}></Route>
        <Route path="/employee-list" element={<EmployeeList></EmployeeList>} />
        <Route path="/attendance-report" element={<AttendanceReport></AttendanceReport>} />
        <Route path="/admin" element={<AdminDashboard/>} />
   </Routes>
   <Footer></Footer>
  </div>
  </BrowserRouter>
  // </AuthProvider>
)
ReactDOM.render(rec, document.getElementById('root'));

