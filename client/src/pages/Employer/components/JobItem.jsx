import React from 'react'
import { Link } from 'react-router-dom'
import { useDeleteJobMutation } from '../../../redux/jobApiSlice'
import { useSelector } from 'react-redux'

function JobItem({ job, setRefresh }) {
  const  [deleteJob, {isLoading}] = useDeleteJobMutation()
  const appData = useSelector(state => state.app)

  const handleDeleteJob = async () => {
    if(isLoading)
      return
    let result = await deleteJob({
      token: appData.userData.accessToken,
      params: {
        id: job.id
      }
    })
    setRefresh({})
  }

  return (
    <div className="job-item">
      <div className="job-details">
        <h1>{job.company}</h1>
        <span>{`${job.city} - `}</span>
        <span>{job.position}</span><br/>
        <span>{`${job.type} `}</span>
        <span>{`${job.salaryFrom} - ${job.salaryTo}`}</span>
        <span>{`${job.homeOffice ? ' [Távmunka]' : ''}`}</span>
      </div>

      <div className="job-buttons">
        <Link to={`/jobs/${job.id}/applicants`} style={{color: "inherit"}}>
          <button style={{textDecoration: "none", cursor: "pointer"}}>Megtekint</button>
        </Link>
        <Link to={`/jobs/${job.id}/edit`} style={{color: "inherit"}}>
          <button style={{textDecoration: "none", cursor: "pointer"}}>Szerkeszt</button>
        </Link>
        <button onClick={handleDeleteJob} style={{cursor: "pointer"}}>Töröl</button>
      </div>
    </div>
  )
}

export default JobItem