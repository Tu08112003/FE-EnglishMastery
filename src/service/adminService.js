import axios from '../utils/axios-customize'

// Lấy thông tin user
const getAllUser = () => {
    const URL_BACKEND = 'user-service/getAllUser'
    return axios.get(URL_BACKEND);
}

// Lấy số lượng user
const getNumberOfUser = () => {
    const URL_BACKEND = 'user-service/getNumberOfUser'
    return axios.get(URL_BACKEND);
}

// Lấy số lượng bài test
const getNumberOfTest = () => {
    const URL_BACKEND = 'exam-service/getNumberOfTest'
    return axios.get(URL_BACKEND);
}

// Lấy lịch sử bài thi
const getAllHistoryTest = () => {
    const URL_BACKEND = 'exam-service/getAllHistoryTest'
    return axios.get(URL_BACKEND);
}

// Lấy thông tin bài test
const getAllTest = () => {
    const URL_BACKEND = 'exam-service/getAllTest'
    return axios.get(URL_BACKEND);
}
export {
    getAllUser, getNumberOfUser, getNumberOfTest, getAllHistoryTest, getAllTest
}