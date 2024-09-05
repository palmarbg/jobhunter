import React from 'react'

function ApplicantItem({user}) {
  return (
    <div>{user.fullname} - {user.email}</div>
  )
}

export default ApplicantItem