import React from 'react'
import { useParams } from 'react-router-dom'
import { useAddJobApplicationMutation, useGetJobQuery } from '../../redux/jobApiSlice'
import { useSelector } from 'react-redux'

function Job() {
  const {id} = useParams()
  const appData = useSelector(state => state.app)

  const [addJobApplication, { isLoadingJobApplication }] = useAddJobApplicationMutation();

  const {data, isLoading} = useGetJobQuery(
    {
      token: appData.userData.accessToken,
      params: {
        id: id
      }
    })

  const sendApplication = async () => {
    let result = await addJobApplication({
      token: appData.userData.accessToken,
      body: {jobId: parseInt(id)}
    })
    if(result.error === undefined)
      alert("Sikeres jelentkezés!")
  }

  return (
    <>
      {!isLoading &&
        <>
          <h1>{data.company}</h1>
          {appData.authState == 'jobseeker' && <button onClick={sendApplication}>Jelentkezem</button>}
          <table>
            <tbody>
              <tr>
                <th>Pozíció</th>
                <td>{data.position}</td>
              </tr>
              <tr>
                <th>Leírás</th>
                <td>{data.description}</td>
              </tr>
              <tr>
                <th>Fizetés</th>
                <td>{data.salaryFrom}-{data.salaryTo}</td>
              </tr>
              <tr>
                <th>Foglalkoztatottság típusa</th>
                <td>{data.type}</td>
              </tr>
              <tr>
                <th>Város</th>
                <td>{data.city}</td>
              </tr>
              <tr>
                <th>Home Office</th>
                <td>{data.homeOffice ? "van" : "nincs"}</td>
              </tr>
            </tbody>
          </table>
        </>
      }
    </>
  )
}

export default Job