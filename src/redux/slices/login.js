import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
}

export const counterSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, {payload}) => {
      state.isLoggedIn = payload
    },
  },
})

export const { setLogin } = counterSlice.actions

export default counterSlice.reducer