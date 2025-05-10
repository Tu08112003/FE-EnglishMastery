import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUser, getNumberOfUser, getNumberOfTest, getAllHistoryTest, getAllTest } from '../../service/adminService'; // Điều chỉnh đường dẫn

// Lấy tất cả thông tin user
export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllUser();
    return response.data.users;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy danh sách người dùng');
  }
});

// Lấy số lượng user
export const fetchNumberOfUsers = createAsyncThunk('admin/fetchNumberOfUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await getNumberOfUser();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy số lượng người dùng');
  }
});

// Lấy số lượng bài test
export const fetchNumberOfTests = createAsyncThunk('admin/fetchNumberOfTests', async (_, { rejectWithValue }) => {
  try {
    const response = await getNumberOfTest();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy số lượng bài test');
  }
});

// Lấy lịch sử làm bài
export const fetchAllHistoryTests = createAsyncThunk('admin/fetchAllHistoryTests', async (_, { rejectWithValue }) => {
    try {
      const response = await getAllHistoryTest();
      const historyTests = Array.isArray(response.data) ? response.data : [];
      // Chuẩn hóa dữ liệu
      return historyTests.map((result, index) => ({
        id: result.id || `result-${index + 1}`, 
        testName: result.testName,
        email: result.email,
        score: result.score,
        dateTest: result.dateTest,
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy lịch sử bài thi');
    }
  });
  
  // Lấy tất cả bài thi
  export const fetchAllTests = createAsyncThunk('admin/fetchAllTests', async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTest();
      const tests = Array.isArray(response.data) ? response.data : [];
      return tests.map((test, index) => ({
        id: test.id || `test-${index + 1}`, 
        testName: test.testName,
        numberOfQuestion: parseInt(test.numberOfQuestion, 10), 
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy danh sách bài test');
    }
  });

const initialState = {
  users: [],
  numberOfUsers: 0,
  numberOfTests: 0,
  historyTests: [],
  tests: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // fetchAllUsers
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchNumberOfUsers
      .addCase(fetchNumberOfUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNumberOfUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.numberOfUsers = action.payload;
      })
      .addCase(fetchNumberOfUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchNumberOfTests
      .addCase(fetchNumberOfTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNumberOfTests.fulfilled, (state, action) => {
        state.loading = false;
        state.numberOfTests = action.payload;
      })
      .addCase(fetchNumberOfTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchAllHistoryTests
      .addCase(fetchAllHistoryTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllHistoryTests.fulfilled, (state, action) => {
        state.loading = false;
        state.historyTests = action.payload;
      })
      .addCase(fetchAllHistoryTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchAllTests
      .addCase(fetchAllTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
      })
      .addCase(fetchAllTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;