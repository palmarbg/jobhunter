import React, { useState } from 'react'
import { inputBuilderFactory } from '../../Global.jsx'
import { useAddJobMutation } from '../../redux/jobApiSlice'
import { useSelector } from 'react-redux'
import JobForm from './components/JobForm'

function JobCreator() {
  const appData = useSelector(state => state.app)

  const [formData, setFormData] = useState({})
  const [addJob, {isLoading}] = useAddJobMutation()

  const inputBuilder = inputBuilderFactory(formData, setFormData)

  const handleSubmit = async () => {
    if(isLoading)
      return
    let result = await addJob({
      token: appData.userData.accessToken,
      body: {
        ...formData
      }
    })
  }

  return (
    <>
      <JobForm inputBuilder={inputBuilder}/>

      <button onClick={handleSubmit}>Létrehoz</button>
    </>
  )
}

export default JobCreator