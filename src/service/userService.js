import axios from '../utils/axios-customize'


const getUser = () => {
    const URL_BACKEND = '/user-service/getInfo';
    return axios.post(URL_BACKEND)
}

const updateUser = ({userName}) => {
    const URL_BACKEND = '/user-service/update';
    const data = {
        userName: userName,
    };
    return axios.post(URL_BACKEND,data);
}

const changePassword = ({oldPassword, newPassword}) => {
    const URL_BACKEND = '/user-service/changePassword';
    const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
    };
    return axios.post(URL_BACKEND,data);
}

export {
    getUser, updateUser, changePassword
}