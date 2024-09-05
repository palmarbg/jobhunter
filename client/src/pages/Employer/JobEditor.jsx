import React, { useEffect, useState } from 'react'
import { JOBTYPES, inputBuilderFactory } from '../../Global.jsx'
import { useGetJobQuery, usePatchJobMutation } from '../../redux/jobApiSlice'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function JobEditor() {
  const appData = useSelector(state => state.app)
  const {id} = useParams()

  const {data: jobData, isLoading: isLoadingJob} = useGetJobQuery({
    token: appData.userData.accessToken,
    params: {
      id: id
    }
  })

  const [formData, setFormData] = useState({})
  const [patchJob, {isLoading}] = usePatchJobMutation()

  const inputBuilder = inputBuilderFactory(formData, setFormData)

  const handleSubmit = async () => {
    if(isLoading)
      return

    let result = await patchJob({
      token: appData.userData.accessToken,
      body: {
        ...formData
      },
      params: {
        id: id
      }
    })
  }


  useEffect(() => {if(!isLoadingJob) setFormData({...jobData, homeOffice: jobData.homeOffice !== 0})}, [isLoadingJob])

  return (
    <>
      {inputBuilder("Cég", "company")}
      {inputBuilder("Pozíció", "position")}
      {inputBuilder("Leírás", "description", "textarea", {cols: 50, rows: 5})}
      {inputBuilder("Minimum fizetés", "salaryFrom", "number")}
      {inputBuilder("Maximum fizetés", "salaryTo", "number")}
      {inputBuilder("Foglalkoztatás típusa", "type", "select", {options: JOBTYPES})}
      {inputBuilder("Település", "city")}
      {inputBuilder("Távmunka", "homeOffice", "checkbox")}

      <button onClick={handleSubmit}>Mentés</button>
    </>
  )
}

export default JobEditor

