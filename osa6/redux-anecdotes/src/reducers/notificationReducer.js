import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

export const setNotificationNew = (message, seconds) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => { 
      dispatch(setNotification(''))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer