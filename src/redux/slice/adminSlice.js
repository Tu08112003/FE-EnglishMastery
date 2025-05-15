import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUser,
  getNumberOfUser,
  getNumberOfTest,
  getAllHistoryTest,
  getAllTest,
  getPermissionOfUser,
  updatePermissionOfUser,
  addPermissionForUser,
  detelePermissionOfUser,
  addUser,
  deleteUser,
} from "../../service/adminService";

// Lấy tất cả thông tin user
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUser();
      return response.data.users;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy danh sách người dùng"
      );
    }
  }
);

// Lấy số lượng user
export const fetchNumberOfUsers = createAsyncThunk(
  "admin/fetchNumberOfUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNumberOfUser();
      return response.data.numberOfUser;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy số lượng người dùng"
      );
    }
  }
);

// Lấy số lượng bài test
export const fetchNumberOfTests = createAsyncThunk(
  "admin/fetchNumberOfTests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNumberOfTest();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy số lượng bài test"
      );
    }
  }
);

// Lấy lịch sử làm bài
export const fetchAllHistoryTests = createAsyncThunk(
  "admin/fetchAllHistoryTests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllHistoryTest();
      const historyTests = Array.isArray(response.data) ? response.data : [];
      return historyTests.map((result) => ({
        id: result.idTestHistory,
        testName: result.testName,
        email: result.email,
        score: result.score,
        dateTest: result.dateTest,
      }));
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy lịch sử bài thi"
      );
    }
  }
);

// Lấy tất cả bài thi
export const fetchAllTests = createAsyncThunk(
  "admin/fetchAllTests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTest();
      const tests = Array.isArray(response.data) ? response.data : [];
      return tests.map((test) => ({
        id: test.idTest,
        testName: test.testName,
        numberOfQuestion: parseInt(test.numberOfQuestion, 10),
      }));
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy danh sách bài test"
      );
    }
  }
);

// Lấy quyền của user
export const fetchPermissionOfUser = createAsyncThunk(
  "admin/fetchPermissionOfUser",
  async ({idUser}, { rejectWithValue }) => {
    try {
      const response = await getPermissionOfUser({ idUser: idUser });
      return response.data.permissions;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy quyền của người dùng"
      );
    }
  }
);

// Cập nhật quyền của user
export const fetchUpdatePermissionOfUser = createAsyncThunk(
  "admin/fetchUpdatePermissionOfUser",
  async ({ idUser, namePermission, typeUpdate }, { rejectWithValue }) => {
    try {
      const response = await updatePermissionOfUser({
        idUser,
        namePermission,
        typeUpdate,
      });
      if(response.status == 200) {
        return response.data;
      }else{
        return rejectWithValue(
          "Lỗi khi cập nhật quyền của người dùng! Vui lòng thử lại."
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi cập nhật quyền của người dùng"
      );
    }
  }
);
// Thêm quyền cho user
export const fetchAddPermissionForUser = createAsyncThunk(
  "admin/fetchAddPermissionForUser",
  async ({namePermission}, { rejectWithValue }) => {
    try {
      const response = await addPermissionForUser({ namePermission });
      if (response.status == 200) {
        return response.data;
      }
      return rejectWithValue(
        "Lỗi khi thêm quyền cho người dùng! Vui lòng thử lại."
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi thêm quyền cho người dùng"
      );
    }
  }
);  

// Xóa quyền của user
export const fetchDeletePermissionOfUser = createAsyncThunk(
  "admin/fetchDeletePermissionOfUser",
  async ({ permissionId }, { rejectWithValue }) => {
    try {
      const response = await detelePermissionOfUser({
        permissionId,
      });
      if (response.status == 200) {
        return response.data;
      } else {
        return rejectWithValue(
          "Lỗi khi xóa quyền của người dùng! Vui lòng thử lại."
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi xóa quyền của người dùng"
      );
    }
  }
);
// Thêm mới user 
export const fetchAddUser = createAsyncThunk(
  "admin/fetchAddUser",
  async ({ userName, email, password, role }, { rejectWithValue }) => {
    try {
      const response = await addUser({ userName, email, password, role });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(
          "Lỗi khi thêm người dùng! Vui lòng thử lại."
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi thêm người dùng"
      );
    }
  }
);

// Xóa user
export const fetchDeleteUser = createAsyncThunk(
  "admin/fetchDeleteUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await deleteUser({ userId });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(
          "Lỗi khi xóa người dùng! Vui lòng thử lại."
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi xóa người dùng"
      );
    }
  }
);


const initialState = {
  users: [],
  numberOfUsers: 0,
  numberOfTests: 0,
  historyTests: [],
  tests: [],
  loading: false,
  loadingUser: false,
  loadingHistoryTest: false,
  loadingTest: false,
  error: null,
  errorUser:null,
  errorHistoryTest: false,
  errorTest: false,
  permissionOfUser: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchAllUsers
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loadingUser = true;
        state.errorUser = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loadingUser = false;
        state.errorUser = action.payload;
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
        state.loadingHistoryTest = true;
        state.errorHistoryTest = null;
      })
      .addCase(fetchAllHistoryTests.fulfilled, (state, action) => {
        state.loadingHistoryTest = false;
        state.historyTests = action.payload;
      })
      .addCase(fetchAllHistoryTests.rejected, (state, action) => {
        state.loadingHistoryTest = false;
        state.errorHistoryTest = action.payload;
      })
      // fetchAllTests
      .addCase(fetchAllTests.pending, (state) => {
        state.loadingTest = true;
        state.errorTest = null;
      })
      .addCase(fetchAllTests.fulfilled, (state, action) => {
        state.loadingTest = false;
        state.tests = action.payload;
      })
      .addCase(fetchAllTests.rejected, (state, action) => {
        state.loadingTest = false;
        state.errorTest = action.payload;
      })
      // fetchPermissionOfUser
      .addCase(fetchPermissionOfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissionOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.permissionOfUser = action.payload;
      })
      .addCase(fetchPermissionOfUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchAddPermissionForUser
      .addCase(fetchAddPermissionForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddPermissionForUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAddPermissionForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchDeletePermissionOfUser
      .addCase(fetchDeletePermissionOfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeletePermissionOfUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchDeletePermissionOfUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchUpdatePermissionOfUser
      .addCase(fetchUpdatePermissionOfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpdatePermissionOfUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUpdatePermissionOfUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchDeleteUser
      .addCase(fetchDeleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchDeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default adminSlice.reducer;
