import axios from "../utils/axios-customize";

// Lấy đề thi theo năm
const getExamByYear = ({ year }) => {
  const URL_BACKEND = `exam-service/getTestInfo?year=${year}`;
  return axios.get(URL_BACKEND);
};
const getAllExamByYear = () => {
    const URL_BACKEND = 'exam-service/getYears';
    return axios.get(URL_BACKEND);
  };
// Lấy kết quả khi nộp bài thi
const resultSubmitExam = ({ obj }) => {
  const URL_BACKEND = "exam-service/TestAnswer";
  const data = {
    idTest: obj.idTest,
    timeDoTest: obj.timeDoTest,
    dateTest: obj.dateTest,
    answersPart1: obj.answersPart1 || [],
    answersPart2: obj.answersPart2 || [],
    answersPart3: obj.answersPart3 || [],
    answersPart4: obj.answersPart4 || [],
    answersPart5: obj.answersPart5 || [],
    answersPart6: obj.answersPart6 || [],
    answersPart7: obj.answersPart7 || [],
  };
  return axios.post(URL_BACKEND, data);
};


// Lấy ra chi tiết đề thi
const getExamById = ({ idTest }) => {
    const URL_BACKEND = `exam-service/getTest?idTest=${idTest}`;
    return axios.get(URL_BACKEND);
};

// Lấy ra lịch sử làm bài thi
const getHistoryExam = () => {
    const URL_BACKEND = 'exam-service/getHistoryTest';
    return axios.get(URL_BACKEND);
}

// Lấy ra lịch sử làm bài thi theo id
const getHistoryExamById = ({ idTest }) => {
    const URL_BACKEND = `exam-service/getTestHistory?idTestHistory=${idTest}`;
    return axios.get(URL_BACKEND);
}
export { getExamByYear, resultSubmitExam, getExamById, getAllExamByYear, getHistoryExam, getHistoryExamById };
