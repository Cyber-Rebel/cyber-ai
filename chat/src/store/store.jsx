import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './Slicees/chatSlice.jsx'
import userReducer from './Slicees/userSlice.jsx'
export const store = configureStore({
  reducer: {
    chat: chatReducer ,
    user: userReducer,



  },
})
