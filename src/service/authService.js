import axios from '../utils/axios-customize'

const authLogin = ({email, password}) => {
    const URL_BACKEND = '/auth-service/login';
    const data = {
        email: email,
        password: password
    };
    return axios.post(URL_BACKEND,data);
}

const authRegister = ({userName, email, password}) => {
    const URL_BACKEND = '/auth-service/register';
    const data = {
        userName: userName,
        email: email,
        password: password
    };
    return axios.post(URL_BACKEND,data);
}
const authLogout = ({refreshToken}) => {
    const URL_BACKEND = '/auth-service/logout';
    const data = {
        refreshToken: refreshToken
    }
    return axios.post(URL_BACKEND, data);
};

const checkRefreshToken = ({refreshToken}) => {
    const URL_BACKEND = '/auth-service/refresh';
    const data = {
        refreshToken: refreshToken
    }
    return axios.post(URL_BACKEND, data);
}

export { authLogin, authRegister, authLogout, checkRefreshToken };