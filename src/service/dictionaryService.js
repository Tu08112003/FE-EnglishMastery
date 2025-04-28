import axios from "../utils/axios-customize";

const searchWord = ({ word }) => {
    const URL_BACKEND = `/note-service/searchWord?word=${word}`;
    return axios.get(URL_BACKEND);
};

const getWord = ({ wordId }) => {
    const URL_BACKEND = `/note-service/getWord?wordId=${wordId}`;
    return axios.get(URL_BACKEND);
};

export { searchWord, getWord };