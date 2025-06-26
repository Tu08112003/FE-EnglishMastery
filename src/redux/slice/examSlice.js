import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getExamByYear,
  getExamById,
  getAllExamByYear,
  resultSubmitExam,
  getHistoryExam,
  getHistoryExamById,
  getExamNotSubmit,
  deleteHistoryExamById,
} from "../../service/examService";

// Lấy tất cả các năm có đề thi
export const fetchAllExamsByYear = createAsyncThunk(
  "exam/fetchAllExamsByYear",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllExamByYear();
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Không tìm thấy các năm có đề thi");
      }
    } catch (error) {
      return rejectWithValue(
        error.message || "Không tìm thấy các năm có đề thi"
      );
    }
  }
);

// Lấy đề thi có trong năm
export const fetchExamsByYear = createAsyncThunk(
  "exam/fetchExamsByYear",
  async (year, { rejectWithValue }) => {
    try {
      const response = await getExamByYear({ year });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Không tìm thấy đề thi có trong năm này");
      }
    } catch (error) {
      return rejectWithValue(
        error.message || "Không tìm thấy đề thi có trong năm này"
      );
    }
  }
);

// Lấy thông tin đề thi bằng id
export const fetchExamById = createAsyncThunk(
  "exam/fetchExamById",
  async (testId, { rejectWithValue }) => {
    try {
      const response = await getExamById({ testId });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Không tìm thấy thông tin đề thi");
      }
    } catch (error) {
      return rejectWithValue(
        error.message || "Không tìm thấy thông tin đề thi"
      );
    }
  }
);

// Nộp bài thi
export const submitExam = createAsyncThunk(
  "exam/submitExam",
  async (examData, { rejectWithValue }) => {
    try {
      const response = await resultSubmitExam({ obj: examData });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Không thể nộp bài thi. Vui lòng thử lại.");
      }
    } catch (error) {
      return rejectWithValue(
        error.message || "Không thể nộp bài thi. Vui lòng thử lại."
      );
    }
  }
);

// Lịch sử làm bài thi
export const fetchAllHistoryExam = createAsyncThunk(
  "exam/fetchAllHistoryExam",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getHistoryExam();
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Không tìm thấy lịch sử làm bài thi");
      }
    } catch (error) {
      return rejectWithValue(
        error.message || "Không tìm thấy lịch sử làm bài thi"
      );
    }
  }
);

// Lịch sử làm bài thi theo id
export const fetchHistoryExamById = createAsyncThunk(
  "exam/fetchHistoryExamById",
  async (testId, { rejectWithValue }) => {
    try {
      const response = await getHistoryExamById({ testId });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Không tìm thấy lịch sử làm bài thi");
      }
    } catch (error) {
      return rejectWithValue(
        error.message || "Không tìm thấy lịch sử làm bài thi"
      );
    }
  }
);

// Lấy đề thi chưa nộp do rớt mạng
export const fetchExamNotSubmit = createAsyncThunk(
  "exam/fetchExamNotSubmit",
  async (testId, { rejectWithValue }) => {
    try {
      const response = await getExamNotSubmit({ testId });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Không tìm thấy đề thi chưa nộp");
      }
    } catch (error) {
      return rejectWithValue( error.message || "Không tìm thấy đề thi chưa nộp");
    }
    }
);

// Xóa lịch sử làm bài thi
export const fetchDeleteHistoryExamById = createAsyncThunk(
  "admin/fetchDeleteHistoryExamById",
  async ({ historyTestId }, { rejectWithValue }) => {
    try {
      const response = await deleteHistoryExamById({ historyTestId });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(
          response?.message || "Lỗi khi xóa lịch sử làm bài! Vui lòng thử lại."
        );
      }
    } catch (error) {
      return rejectWithValue(error.response?.message || "Lỗi khi xóa lịch sử làm bài");
    }
  }
);

const examSlice = createSlice({
  name: "exam",
  initialState: {
    exams: [],
    examYears: [],
    loading: false,
    selectedExam: null,
    error: null,
    errorNotSubmit: null,
    selectedYear: null,
    submitting: false,
    submitError: null,
    submitResult: null,
    historyExam: null,
    historyExamById: null,
    examNotSubmit: null,
  },
  reducers: {
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    clearSubmitError: (state) => {
      state.submitError = null;
    },
    resetExamState: (state) => {
      state.exams = [];
      state.examYears = [];
      state.selectedYear = null;
      state.selectedExam = null;
      state.error = null;
      state.loading = false;
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
      })

      // Handle fetchAllHistoryExam
      .addCase(fetchAllHistoryExam.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.historyExam = null;
      })
      .addCase(fetchAllHistoryExam.fulfilled, (state, action) => {
        state.loading = false;
        state.historyExam = action.payload;
      })
      .addCase(fetchAllHistoryExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.historyExam = null;
      })

      // Handle fetchHistoryExamById
      .addCase(fetchHistoryExamById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.historyExamById = null;
      })
      .addCase(fetchHistoryExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.historyExamById = action.payload;
      })
      .addCase(fetchHistoryExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.historyExamById = null;
      })
      
      // Handle fetchExamNotSubmit
      .addCase(fetchExamNotSubmit.pending, (state) => {
        state.loading = true;
        state.errorNotSubmit = null;
        state.examNotSubmit = null;
      })
      .addCase(fetchExamNotSubmit.fulfilled, (state, action) => {
        state.loading = false;
        state.examNotSubmit = action.payload;
      })
      .addCase(fetchExamNotSubmit.rejected, (state, action) => {
        state.loading = false;
        state.errorNotSubmit = action.payload;
        state.examNotSubmit = null;
      })

      // Handle fetchDeleteHistoryExamById
      .addCase(fetchDeleteHistoryExamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeleteHistoryExamById.fulfilled, (state) => {
        state.loading = false; 
      })
      .addCase(fetchDeleteHistoryExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedYear, clearSubmitError, resetExamState } = examSlice.actions;
export default examSlice.reducer;
