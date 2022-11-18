import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  user: any
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    login: (state: UserState, action) => {
      state.user = action.payload
    },
    logout: (state: UserState, action) => {
      state.user = null
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer