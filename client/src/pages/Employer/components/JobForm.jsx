import React from 'react'
import { JOBTYPES } from '../../../Global.jsx'

const JobForm = ({inputBuilder}) => {
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
    </>
  )
}

export default JobForm