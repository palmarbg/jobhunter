import React, {useState} from 'react'
import { useLoginUserMutation } from '../../redux/jobApiSlice';
import InputField from '../../components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/appSlice';

const userData = {
  email: "",
  password: "",
  strategy: "local"
}

const Login = () => {
  const appData = useSelector(state => state.app)
  const dispatch = useDispatch()

  const [data, updateData] = useState(userData)
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const sendLogin = async () => {
    if(isLoading)
      return

    const result = await loginUser({body: data})
    if(result.error !== null && result.error !== undefined)
      return
    dispatch(setUserData(result.data))
  }

  return (
    <>
      <form>
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

        <button type='button' onClick={sendLogin}>Bejelentkezés</button>
      </form>
    </>
  )
}

export default Login