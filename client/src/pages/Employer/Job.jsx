import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetJobApplicantsQuery } from '../../redux/jobApiSlice'
import { useSelector } from 'react-redux'
import ApplicantItem from './components/ApplicantItem'

function Job() {
  const {id} = useParams()
  const appData = useSelector(state => state.app)

  const {data, isLoading} = useGetJobApplicantsQuery(
    {
      token: appData.userData.accessToken,
      params: {
        jobId: id
      }
    })

    return (
      <>
        {!isLoading &&
          data.map(item => 
              <ApplicantItem key={item.userId} user={item.user}/>
            )
        }
      </>
    )
}

export default Job