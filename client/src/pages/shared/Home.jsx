import React, { useEffect, useState } from 'react'
import { useGetJobsQuery } from '../../redux/jobApiSlice'
import { Link, useSearchParams } from 'react-router-dom'
import JobFilterForm from  './components/JobFilterForm'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams({})

  let searchData = {
    minsalary: searchParams.get("minsalary"),
    maxsalary: searchParams.get("maxsalary"),
    jobtype: searchParams.get("jobtype"),
    location: searchParams.get("location"),
    ishomeoffice: searchParams.get("ishomeoffice") === "true"
  }
  
  const {data, isLoading} = useGetJobsQuery(searchData)

  console.log(data)

  return (
  <>
    <JobFilterForm
      searchData={searchData}
      setSearchParams={setSearchParams}
      />
    {!isLoading && 
      <div className="jobcontainer">
        {data.data.map((job, index) => (
            <Link
              to={`jobs/${job.id}`}
              style={{textDecoration: "none", color: "inherit"}}
              key={job.id}
              >
              <div className="job">
                <div className='left'>
                  <span className='bold'>{job.company}</span><br/>
                  <span>{job.city}</span>
                </div>
                <div className='right'>
                <span className='bold'>{job.salaryFrom}-{job.salaryTo}Ft</span><br/>
                  <span>{job.type}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>

}
  </>
  )
}

export default Home