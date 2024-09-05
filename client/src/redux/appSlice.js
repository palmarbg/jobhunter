import { createSlice } from '@reduxjs/toolkit'

const initialState =
  localStorage.getItem('reduxState') ?
  JSON.parse(localStorage.getItem('reduxState')) :
  {
    userData: {},
    authState: 'foreign'
  }

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
      state.authState = action.payload?.user?.role || 'foreign'
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData, getUserAuth } = appSlice.actions

export default appSlice.reducer