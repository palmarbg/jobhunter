import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes, Navigate, useParams } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

import Home from './pages/shared/Home.jsx'
import Login from './pages/shared/Login.jsx'
import Register from './pages/shared/Register.jsx'
import Job from './pages/shared/Job.jsx'

import {default as EmployeeProfile} from './pages/Employee/Profile.jsx'
import {default as EmployeeProfileEditor } from './pages/Employee/ProfileEditor.jsx'

import {default as EmployerProfile} from './pages/Employer/Profile.jsx'
import {default as JobApplicants} from './pages/Employer/Job.jsx'
import {default as JobCreator} from './pages/Employer/JobCreator.jsx'
import {default as JobEditor} from './pages/Employer/JobEditor.jsx'

import { useSelector } from 'react-redux'

function App() {
  const appData = useSelector(state => state.app)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/jobs/:id" element={<Job/>}/>

        {appData.authState == 'foreign' && <Route path="/login" element={<Login/>}/>}
        {appData.authState == 'foreign' && <Route path="/register" element={<Register/>}/>}

        {appData.authState == 'jobseeker' && <Route path="/profile" element={<EmployeeProfile/>}/>}
        {appData.authState == 'jobseeker' && <Route path="/profile/edit" element={<EmployeeProfileEditor/>}/>}

        {appData.authState == 'company' && <Route path="/profile" element={<EmployerProfile/>}/>}
        {appData.authState == 'company' && <Route path="/profile" element={<EmployerProfile/>}/>}

        {appData.authState == 'company' && <Route path="/jobs/:id/applicants" element={<JobApplicants/>}/>}
        {appData.authState == 'company' && <Route path="/jobs/create/new" element={<JobCreator/>}/>}
        {appData.authState == 'company' && <Route path="/jobs/:id/edit" element={<JobEditor/>}/>}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  )
}

export default App
