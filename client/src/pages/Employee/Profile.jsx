import React from 'react'
import { useGetExperiencesQuery, useGetUserInfoQuery } from '../../redux/jobApiSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Profile() {
  const appData = useSelector(state => state.app)
  const {data: experiences, isLoading: isLoadingExperiences} = useGetExperiencesQuery({token: appData.userData.accessToken})
  const {data: userData, isLoading: isLoadingUserData} = useGetUserInfoQuery(
    {
      token: appData.userData.accessToken,
      params: {
        id: appData.userData.user.id
      }
    })  

  return (
    <>
      <h1>Profilom</h1>

      <button><Link to="/profile/edit" style={{textDecoration: "none", color: "inherit"}}>Szerkeszt</Link></button>

      {!isLoadingUserData &&
        <table>
          <tbody>
            <tr>
              <th>E-mail cím</th>
              <td>{userData.email}</td>
            </tr>
            <tr>
              <th>Teljes név</th>
              <td>{userData.fullname}</td>
            </tr>
            <tr>
              <th>Foglalkoztatottság típusa</th>
              <td>{userData.role}</td>
            </tr>
          </tbody>
        </table>
      }
      <hr/>
      {!isLoadingExperiences && 
        <table>
          <tbody>
            {
              experiences.data.map((item) => (
                <tr key={item.id}>
                  <th>{item.company}</th>
                  <td >{item.interval} {item.title}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
    </>
  )
}

export default Profile