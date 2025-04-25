import axios from '../utils/axios-customize'


const getUser = ({accessToken}) => {
    const URL_BACKEND = '/user-service/getInfo';
    const data = {
        accessToken: accessToken
    }
    return axios.post(URL_BACKEND,data)
}

const updateUser = ({userName}) => {
    const URL_BACKEND = '/user-service/update';
    const data = {
        userName: userName,
    };
    return axios.post(URL_BACKEND,data);
}

export {
    getUser, updateUser
}