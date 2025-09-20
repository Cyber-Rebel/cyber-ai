import {createSlice} from '@reduxjs/toolkit'
       
const initialState = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  avatarimage: "",

}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.avatarimage= action.payload.avatarimage;
       sessionStorage.setItem("user", true);
    },



       clearUser: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.id = null;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
    sessionStorage.setItem("user", null);
    }


    },})

export const { setUser,clearUser } = userSlice.actions
export default userSlice.reducer

// userSlice.actions ka matlab reducers ko export karna hai