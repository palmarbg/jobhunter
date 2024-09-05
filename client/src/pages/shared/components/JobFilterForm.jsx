import React from 'react'
import NumericInputField from '../../../components/NumericInputField'
import MultipleSelect from '../../../components/MultipleSelect'
import InputField from '../../../components/InputField'
import CheckboxInput from '../../../components/CheckboxInput'
import { JOBTYPES } from '../../../Global.jsx'

function JobFilterForm({searchData, setSearchParams}) {
  const formData = searchData

  const updateFormData = (value, arg) => {
    setSearchParams(prev => {
      prev.set(arg, value[arg])
      return prev
    }, { replace: true })
  }

  return (
    <form>
      <NumericInputField
        label="Minimum fizetés"
        placeholder=""
        name="minsalary"
        data={formData}
        updateData={value => updateFormData(value, "minsalary")}
        />
      <NumericInputField
        label="Maximum fizetés"
        placeholder=""
        name="maxsalary"
        data={formData}
        updateData={value => updateFormData(value, "maxsalary")}
        />
      <MultipleSelect
        label="Foglalkoztatottság típusa"
        name="jobtype"
        data={formData}
        updateData={value => updateFormData(value, "jobtype")}
        options={JOBTYPES}
        />
      <InputField
        label="Település"
        placeholder=""
        name="location"
        type="text"
        data={formData}
        updateData={value => updateFormData(value, "location")}
        />
       <CheckboxInput
        label="Távmumka"
        name="ishomeoffice"
        data={formData}
        updateData={value => updateFormData(value, "ishomeoffice")}
        />
      
    </form>
  )
}

export default JobFilterForm