import axios from '../utils/axios-customize'

const addWord = ({word, description, pronounce, learned, note, example}) => {
    const URL_BACKEND = '/note-service/addWord';
    const data = {
        word: word,
        description: description,
        pronounce: pronounce,
        learned: learned,
        note: note,
        example:example
    };
    return axios.post(URL_BACKEND, data);
    
}
const getNote = ({accessToken}) => {
    const URL_BACKEND = '/note-service/getNote';
    const data = {
        accessToken: accessToken
    }
    return axios.get(URL_BACKEND, data);
}

export {
    addWord, getNote
}