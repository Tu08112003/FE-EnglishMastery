import axios from "axios";
// import { logout } from "../redux/slice/authSlice";
// import { clearUserInfo } from "../redux/slice/userSlice";
import { toast } from "react-toastify";
import { checkRefreshToken } from "../service/authService";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Excluded endpoints
const excludedEndpoints = [
  "/auth-service/login",
  "/auth-service/register",
  "/auth-service/refresh",
  "/auth-service/forgot-password",
];

// Interceptor cho request
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    if (config.url && !excludedEndpoints.includes(config.url) && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Interceptor cho response
instance.interceptors.response.use(
  function (response) {
    if (response.data && response.data.data) return response.data;
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // Kiểm tra lỗi 401
    if (error.response && error.response.status === 401) {
      // Thử làm mới token nếu request chưa được retry
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Đánh dấu request đã thử làm mới
        try {
          const refreshToken = localStorage.getItem("refresh_token");
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          // Gọi checkRefreshToken để làm mới token
          const response = await checkRefreshToken({ refreshToken });

          // Lưu access_token mới (giả sử API trả về accessToken trong response.data)
          const newAccessToken = response.accessToken; // Điều chỉnh key dựa trên API thực tế
          localStorage.setItem("access_token", newAccessToken);

          // Cập nhật header cho originalRequest
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Thử gọi lại request ban đầu
          return instance(originalRequest);
        } catch (refreshError) {
          // Nếu làm mới token thất bại (refresh token hết hạn hoặc lỗi khác)
          if (
            refreshError.response?.data?.message &&
            refreshError.response.data.message.includes("refresh token")
          ) {
            toast.info("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            // store.dispatch(logout());
            // store.dispatch(clearUserInfo());
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }
    }

    if (error.response && error.response.data) {
      return error.response.data;
    }

    return Promise.reject(error);
  }
);

export default instance;