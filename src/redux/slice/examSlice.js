import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getExamByYear, getExamById, getAllExamByYear, resultSubmitExam } from '../../service/examService';

// Lấy tất cả các năm có đề thi
export const fetchAllExamsByYear = createAsyncThunk(
  'exam/fetchAllExamsByYear',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllExamByYear();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Không tìm thấy các năm có đề thi');
    }
  }
);

// Lấy đề thi có trong năm
export const fetchExamsByYear = createAsyncThunk(
  'exam/fetchExamsByYear',
  async (year, { rejectWithValue }) => {
    try {
      const response = await getExamByYear({ year });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Không tìm thấy đề thi có trong năm này');
    }
  }
);

// Lấy thông tin đề thi bằng id
export const fetchExamById = createAsyncThunk(
  'exam/fetchExamById',
  async (idTest, { rejectWithValue }) => {
    try {
      const response = await getExamById({ idTest });
      console.log('Data tra ve: ', response.data.test);
      return response.data.test;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Không tìm thấy thông tin đề thi');
    }
  }
);

// Nộp bài thi
export const submitExam = createAsyncThunk(
  'exam/submitExam',
  async (examData, { rejectWithValue }) => {
    try {
      const response = await resultSubmitExam({ obj: examData });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Không thể nộp bài thi. Vui lòng thử lại.');
    }
  }
);

const examSlice = createSlice({
  name: 'exam',
  initialState: {
    exams: [],
    examYears: [],
    loading: false,
    selectedExam: null,
    error: null,
    selectedYear: null,
    submitting: false, 
    submitError: null, 
    submitResult: null, 
  },
  reducers: {
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    clearSubmitError: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllExamsByYear
      .addCase(fetchAllExamsByYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllExamsByYear.fulfilled, (state, action) => {
        state.loading = false;
        state.examYears = action.payload;
      })
      .addCase(fetchAllExamsByYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchExamsByYear
      .addCase(fetchExamsByYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamsByYear.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(fetchExamsByYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchExamById
      .addCase(fetchExamById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedExam = null;
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedExam = action.payload;
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedExam = null;
      })

      // Handle submitExam
      .addCase(submitExam.pending, (state) => {
        state.submitting = true;
        state.submitError = null;
        state.submitResult = null;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.submitting = false;
        state.submitResult = action.payload;
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.submitting = false;
        state.submitError = action.payload;
      });
  },
});

export const { setSelectedYear, clearSubmitError } = examSlice.actions;
export default examSlice.reducer;