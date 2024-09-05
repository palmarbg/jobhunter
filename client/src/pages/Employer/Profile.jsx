import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetJobsByUserIdQuery } from '../../redux/jobApiSlice'
import JobItem from './components/JobItem'
import { Link } from 'react-router-dom'

function Profile() {
  const appData = useSelector(state => state.app)
  const {refetch, data, isLoading} = useGetJobsByUserIdQuery(
    {
      token: appData.userData.accessToken,
      params: {
        userId: appData.userData.user.id
      }
    })


  return (
    <>
      <h1>Hírdetéseid:</h1>
      <button><Link to="/jobs/create/new" style={{color: "inherit", textDecoration: "none"}}>Hozzáad</Link></button>
      {!isLoading && 
        data.data.map(job => 
          <JobItem key={job.id} job={job} setRefresh={refetch}/>
        )
      }
    </>
  )
}

export default Profile