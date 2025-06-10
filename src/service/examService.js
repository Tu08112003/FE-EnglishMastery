import axios from "../utils/axios-customize";

// Lấy đề thi theo năm
const getExamByYear = ({ year }) => {
  const URL_BACKEND = `exam-service/getTestInfo?year=${year}`;
  return axios.get(URL_BACKEND);
};

// Lấy đề thi các năm
const getAllExamByYear = () => {
    const URL_BACKEND = 'exam-service/getYears';
    return axios.get(URL_BACKEND);
  };
// Lấy kết quả khi nộp bài thi
const resultSubmitExam = ({ obj }) => {
  const URL_BACKEND = "exam-service/TestAnswer";
  const data = {
    testId: obj.testId,
    timeDoTest: obj.timeDoTest,
    dateTest: obj.dateTest,
    userAnswers: obj.userAnswers,
  };
  return axios.post(URL_BACKEND, data);
};


// Lấy ra chi tiết đề thi
const getExamById = ({ testId }) => {
    const URL_BACKEND = `exam-service/getTest?testId=${testId}`;
    return axios.get(URL_BACKEND);
};

// Lấy ra lịch sử làm bài thi
const getHistoryExam = () => {
    const URL_BACKEND = 'exam-service/getHistoryTestByUser';
    return axios.get(URL_BACKEND);
}

// Lấy ra lịch sử làm bài thi theo id
const getHistoryExamById = ({ testId }) => {
    const URL_BACKEND = `exam-service/getHistoryTestById?historyTestId=${testId}`;
    return axios.get(URL_BACKEND);
}
export { getExamByYear, resultSubmitExam, getExamById, getAllExamByYear, getHistoryExam, getHistoryExamById };
