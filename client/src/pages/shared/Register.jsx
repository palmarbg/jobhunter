import React, { useState } from 'react'
import InputField from '../../components/InputField'
import { useAddExperiencesMutation, useLoginUserMutation, useRegisterUserMutation } from '../../redux/jobApiSlice'
import MultipleSelect from '../../components/MultipleSelect'
import { ROLES } from '../../Global.jsx'
import ExperienceInput from '../../components/ExperienceInput.jsx'
import { setUserData } from '../../redux/appSlice.js'
import { useDispatch } from 'react-redux'

const userData = {
  fullname: "",
  email: "",
  password: "",
  role: "jobseeker"
}

const Register = () => {
  const [data, updateData] = useState(userData)
  const [experience, updateExperience] = useState({data: []})
  
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [loginUser, { }] = useLoginUserMutation();

  const [addExperience, {}] = useAddExperiencesMutation()
  
  const dispatch = useDispatch()

  const sendRegister = async () => {
    if(isLoading)
      return
    
    const result = await registerUser({body: data})
    
    if(result.error === undefined && userData.role == 'jobseeker'){
      let result = await loginUser({body: {
        email: data.email,
        password: data.password,
        strategy: "local"
      }})
      if(result.error !== null && result.error !== undefined)
        return
      let addResult = await addExperience({
        body: experience.data,
        token: result.data.accessToken
      })
      dispatch(setUserData(result.data))
    }
  }

  return (
    <>
      <form>
        <InputField
          label="Név:"
          placeholder="IV. Béla"
          name="fullname"
          type="text"
          data={data}
          updateData={updateData}
          />
        
        <InputField
          label="Email:"
          placeholder="bela.kiraly@gmail.hu"
          name="email"
          type="text"
          data={data}
          updateData={updateData}
          />

        <InputField
          label="Jelszó:"
          placeholder=""
          name="password"
          type="password"
          data={data}
          updateData={updateData}
          />

        <MultipleSelect
          label="Szerep:"
          name="role"
          data={data}
          updateData={updateData}
          options={ROLES}
          />

        {data.role == "jobseeker" &&
          <ExperienceInput
            label="Tapasztalat:"
            placeholder=""
            name="data"
            data={experience}
            updateData={updateExperience}
            />
        }

        <button type='button' onClick={sendRegister}>Regisztrálás</button>
      </form>
    </>
  )
}

export default Register