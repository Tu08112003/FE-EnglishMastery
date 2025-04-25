import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../../service/userService';

// Thunk để lấy thông tin người dùng
export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        return rejectWithValue('Không tìm thấy access token');
      }
      const response = await getUser({ accessToken });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message || 'Lỗi khi lấy thông tin người dùng');
    }
  }
);

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserInfo } = userSlice.actions;
export default userSlice.reducer;