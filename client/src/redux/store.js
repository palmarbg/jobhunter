import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { jobApi } from './jobApiSlice.js'
import appSlice from './appSlice.js'

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
    app: appSlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
})

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState().app))
})

setupListeners(store.dispatch)