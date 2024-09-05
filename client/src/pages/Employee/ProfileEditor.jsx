import React, { useEffect, useState } from 'react'
import { useAddExperiencesMutation, useGetExperiencesQuery, useRemoveExperiencesMutation } from '../../redux/jobApiSlice'
import { useSelector } from 'react-redux'
import ExperienceInput from '../../components/ExperienceInput'


function ProfileEditor() {
  const appData = useSelector(state => state.app)
  const {data: experiences, isLoading: isLoadingExperiences} = useGetExperiencesQuery({token: appData.userData.accessToken})
  const [formData, setFormData] = useState({data: []})
  
  useEffect(() => {if(!isLoadingExperiences) setFormData(experiences)}, [isLoadingExperiences])
  
  const [addExperience, {isLoading: isLoadingPostQuery}] = useAddExperiencesMutation()
  const [removeExperience, {isLoading: isLoadingDeleteQuery}] = useRemoveExperiencesMutation()

  const submitChanges = async () => {
    if(isLoadingPostQuery || isLoadingDeleteQuery)
      return
    let removeResult = await removeExperience({
      token: appData.userData.accessToken
    })

    let addResult = await addExperience({
      body: formData.data,
      token: appData.userData.accessToken
    })
  }
  
  return (
    <>
      <div>ProfileEditor</div>
      {!isLoadingExperiences &&
        <form>
          <fieldset>
            <legend>Munkatapasztalatok felvétele</legend>
            <ExperienceInput
              label=""
              placeholder=""
              name="data"
              data={formData}
              updateData={setFormData}
              />
          </fieldset>
          <button type='button' onClick={submitChanges}>Mentés</button>
        </form>
      }
    </>
    
  )
}

export default ProfileEditor

// const compareFormData = (originData, formData) => {
//   let minLength = Math.min(formData.length, originData.length)
//   let toUpdate = originData
//     .slice(0, minLength)
//     .map((e, i) => [e.id, formData[i]])
//   let toAdd = formData.slice(minLength)
//   let toRemove = originData.slice(minLength)

//   return [toUpdate, toAdd, toRemove]
// }