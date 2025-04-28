import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slice/authSlice';
import noteReducer from '../redux/slice/noteSlice';
import userReducer from '../redux/slice/userSlice';
import dictionaryReducer from '../redux/slice/dictionarySlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    user: userReducer,
    dictionary: dictionaryReducer 
  },
});