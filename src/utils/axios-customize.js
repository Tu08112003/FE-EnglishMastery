import axios from 'axios';
// import { toast } from 'react-toastify';
// import { store } from '../redux/store';
// import { logout } from '../redux/slice/authSlice';
// import { clearUserInfo } from '../redux/slice/userSlice';
// import { checkRefreshToken } from '../service/authService';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Interceptor cho request
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('access_token');
    if (token) {
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
    // if (error.response?.status === 401) {
    //   try {
    //     const refreshToken = localStorage.getItem('refresh_token');
    //     if (!refreshToken) {
    //       throw new Error('Không tìm thấy refresh token');
    //     }
    //     await checkRefreshToken({ refreshToken });

    //     throw error;
    //   } catch (refreshError) {
    //     localStorage.removeItem('access_token');
    //     localStorage.removeItem('refresh_token');
    //     store.dispatch(logout());
    //     store.dispatch(clearUserInfo());
    //     toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');

    //     window.location.href = '/login';
    //     return Promise.reject(refreshError);
    //   }
    // }

    if (error.response && error.response.data) {
      return error.response.data;
    }
    return Promise.reject(error);
  }
);

export default instance;