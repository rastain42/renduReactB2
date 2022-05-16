import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { signIn, register } from "../api/users";

const initialStateValue = { name: "", token: '', email: "" , id: "", image: "", isAuthenticated: false};

export const userSignIn = createAsyncThunk(
  'users/login',
  async (playload: any, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
    try {
      const response = await signIn(playload) as any
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const userSignUp = createAsyncThunk(
  'users/signup',
  async (playload: any, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
    try {
      const response = await register(playload) as any
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue , status: ''},
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialStateValue;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      // Add user to the state array
      state.value = {...action.payload, isAuthenticated: true};
      state.status = 'Success';

    }),
    builder.addCase(userSignIn.rejected, (state, action) => {
      // Add user to the state array
      state.status = 'Rejected';
    }), 
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("good")

    }),
    builder.addCase(userSignUp.rejected, (state, action) => {
      // Add user to the state array
      state.status = 'Rejected';
    })
  },
});



export const { login, logout } = userSlice.actions;

export default userSlice.reducer;