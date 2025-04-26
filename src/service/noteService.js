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

const updateWord = ({wordId, word, description, learned, pronounce, note, example}) => {
    const URL_BACKEND = '/note-service/updateWord'
    const data = {
        wordId: wordId,
        word: word,
        description: description,
        learned: learned,
        pronounce: pronounce,
        note: note,
        example
    };
    return axios.post(URL_BACKEND,data)
}
const deleteWord = ({wordId}) => {
    const URL_BACKEND = '/note-service/deleteWord'
    const data = {
        wordId: wordId,
    };
    return axios.post(URL_BACKEND,data)
}


export {
    addWord, getNote, updateWord, deleteWord
}