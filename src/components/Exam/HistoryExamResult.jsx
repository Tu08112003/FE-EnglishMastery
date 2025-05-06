import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import image_result from "../../assets/images/img-result-test.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import { Link } from "react-router-dom";
import DetailExamResult from "../Exam/DetailExamResult";
import { fetchUserInfo } from "../../redux/slice/userSlice";
import { fetchHistoryExamById } from "../../redux/slice/examSlice";

const HistoryExamResult = () => {
  const [activePart, setActivePart] = useState(1);
  const [showDetailPart, setShowDetailPart] = useState(false);
  const [showDetailResultExam, setShowDetailResultExam] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idTest } = useParams();
  const {
    historyExamById,
    loading: examLoading,
    error: examError,
  } = useSelector((state) => state.exam || {});
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserInfo());
    if (idTest) {
      dispatch(fetchHistoryExamById(idTest));
    }
  }, [dispatch, idTest]);

  console.log("historyExamById:", historyExamById);

  const userName = userInfo?.userName || "N/A";
  const result = historyExamById;
  const timeTest = result?.timeTest || "N/A";
  const dateTest = result?.dateTest || "N/A";
  const scoreListening = result?.scoreListening || 0;
  const scoreReading = result?.scoreReading || 0;
  const score = result?.score || 0;

  // Chuyển đổi userAnswer thành định dạng { idQuestion: key } bằng vòng lặp
  const userAnswers = {};
  if (result?.userAnswer) {
    const parts = [
      result.userAnswer.answersPart1 || [],
      result.userAnswer.answersPart2 || [],
      result.userAnswer.answersPart3 || [],
      result.userAnswer.answersPart4 || [],
      result.userAnswer.answersPart5 || [],
      result.userAnswer.answersPart6 || [],
      result.userAnswer.answersPart7 || [],
    ];
    parts.forEach((part) => {
      part.forEach((item) => {
        userAnswers[item.idQuestion] = item.key;
      });
    });
  }

  console.log("userAnswers:", userAnswers);

  // Xử lý dữ liệu theo part
  const partData = result?.correctAnswer
    ? {
        1: (result.correctAnswer.answersPart1 || []).map((item) => ({
          id: parseInt(item.idQuestion) + 1,
          correctAnswer: item.key || "N/A",
          userAnswer: userAnswers[item.idQuestion] || "N/A",
          correct:
            userAnswers[item.idQuestion] && item.key
              ? userAnswers[item.idQuestion] === item.key
              : false,
        })),
        2: (result.correctAnswer.answersPart2 || []).map((item) => ({
          id: parseInt(item.idQuestion) + 1,
          correctAnswer: item.key || "N/A",
          userAnswer: userAnswers[item.idQuestion] || "N/A",
          correct:
            userAnswers[item.idQuestion] && item.key
              ? userAnswers[item.idQuestion] === item.key
              : false,
        })),
        3: (result.correctAnswer.answersPart3 || []).map((item) => ({
          id: parseInt(item.idQuestion) + 1,
          correctAnswer: item.key || "N/A",
          userAnswer: userAnswers[item.idQuestion] || "N/A",
          correct:
            userAnswers[item.idQuestion] && item.key
              ? userAnswers[item.idQuestion] === item.key
              : false,
        })),
        4: (result.correctAnswer.answersPart4 || []).map((item) => ({
          id: parseInt(item.idQuestion) + 1,
          correctAnswer: item.key || "N/A",
          userAnswer: userAnswers[item.idQuestion] || "N/A",
          correct:
            userAnswers[item.idQuestion] && item.key
              ? userAnswers[item.idQuestion] === item.key
              : false,
        })),
        5: (result.correctAnswer.answersPart5 || []).map((item) => ({
          id: parseInt(item.idQuestion) + 1,
          correctAnswer: item.key || "N/A",
          userAnswer: userAnswers[item.idQuestion] || "N/A",
          correct:
            userAnswers[item.idQuestion] && item.key
              ? userAnswers[item.idQuestion] === item.key
              : false,
        })),
        6: (result.correctAnswer.answersPart6 || []).map((item) => ({
          id: parseInt(item.idQuestion) + 1,
          correctAnswer: item.key || "N/A",
          userAnswer: userAnswers[item.idQuestion] || "N/A",
          correct:
            userAnswers[item.idQuestion] && item.key
              ? userAnswers[item.idQuestion] === item.key
              : false,
        })),
        7: (result.correctAnswer.answersPart7 || []).map((item) => ({
          id: parseInt(item.idQuestion) + 1,
          correctAnswer: item.key || "N/A",
          userAnswer: userAnswers[item.idQuestion] || "N/A",
          correct:
            userAnswers[item.idQuestion] && item.key
              ? userAnswers[item.idQuestion] === item.key
              : false,
        })),
      }
    : {
        1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [],
      };

  console.log("partData:", partData);

  // Tính số câu trả lời đúng, sai và bỏ qua bằng vòng lặp
  let totalSubmittedAnswers = 0;
  let correctAnswers = 0;

  Object.values(partData).forEach((part) => {
    part.forEach((item) => {
      if (item.userAnswer !== "N/A") {
        totalSubmittedAnswers++;
      }
      if (item.correct) {
        correctAnswers++;
      }
    });
  });

  const skippedAnswers = 200 - totalSubmittedAnswers;
  const incorrectAnswers = totalSubmittedAnswers - correctAnswers;

  // Tính số câu trả lời đúng cho Listening (Parts 1–4) và Reading (Parts 5–7)
  const listeningCorrect = result?.correctAnswer
    ? partData[1].filter((item) => item.correct).length +
      partData[2].filter((item) => item.correct).length +
      partData[3].filter((item) => item.correct).length +
      partData[4].filter((item) => item.correct).length
    : 0;
  const readingCorrect = result?.correctAnswer
    ? partData[5].filter((item) => item.correct).length +
      partData[6].filter((item) => item.correct).length +
      partData[7].filter((item) => item.correct).length
    : 0;

  const handleShowDetailPart = () => {
    setShowDetailPart(!showDetailPart);
  };

  const handleShowDetailResultExam = (item) => {
    setSelectedQuestion(item);
    setShowDetailResultExam(true);
  };

  const handleClosePopup = () => {
    setShowDetailResultExam(false);
    setSelectedQuestion(null);
  };

  if (examLoading) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center justify-center gap-5">
        <p className="text-gray-600 text-lg font-semibold">Đang tải kết quả bài thi...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center justify-center gap-5">
        <p className="text-red-600 text-lg font-semibold">
          {examError || "Không tìm thấy kết quả bài thi."}
        </p>
        <Button
          text="Quay lại"
          variant="default"
          onClick={() => navigate("/exam")}
        />
      </div>
    );
  }

  return (
    <main className="container mx-auto py-10 flex flex-col items-center justify-center gap-5">
      <div className="w-full max-w-5xl bg-white rounded-2xl border-2 border-gray-300 shadow-lg p-8 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-600">
          {result?.nameTest || `Test ${result.idTest}`}
        </h1>
        <div className="flex flex-col md:flex-row gap-7 w-full">
          <div className="md:w-1/3 border-2 border-gray-300 rounded-2xl">
            <img
              src={image_result}
              alt="Kết quả bài thi"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
          <div className="md:w-2/3 grid grid-cols-2 gap-6 text-sm sm:text-base">
            <div className="space-y-2">
              <div>
                <p className="text-gray-600">Tên người dùng:</p>
                <p className="font-semibold">{userName}</p>
              </div>
              <div>
                <p className="text-gray-600">Ngày làm:</p>
                <p className="font-semibold">{dateTest}</p>
              </div>
              <div>
                <p className="text-gray-600">Thời gian hoàn thành:</p>
                <p className="font-semibold">{timeTest}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-gray-600">Số câu đúng:</p>
                <p className="font-semibold text-green-600">{correctAnswers}</p>
              </div>
              <div>
                <p className="text-gray-600">Số câu sai:</p>
                <p className="font-semibold text-red-500">{incorrectAnswers}</p>
              </div>
              <div>
                <p className="text-gray-600">Số câu bỏ qua:</p>
                <p className="font-semibold">{skippedAnswers}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-gray-600">Listening:</p>
                <p>
                  <span className="font-semibold">{listeningCorrect}/100</span>{" "}
                  |{" "}
                  <span className="font-semibold text-[#2C99E2]">
                    {scoreListening} điểm
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">Reading:</p>
                <p>
                  <span className="font-semibold">{readingCorrect}/100</span> |{" "}
                  <span className="font-semibold text-[#2C99E2]">
                    {scoreReading} điểm
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
              <div className="text-center">
                <p className="text-gray-600">Tổng điểm</p>
                <p className="text-4xl sm:text-5xl font-extrabold text-[#2C99E2]">
                  {score}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-end w-full max-w-5xl">
        <Button
          text={`${showDetailPart ? "Ẩn đáp án chi tiết" : "Hiện đáp án chi tiết"}`}
          variant="default"
          size="sm"
          icon={<FontAwesomeIcon icon="fa-solid fa-book" />}
          onClick={handleShowDetailPart}
        />
        <Link to={"/exam"}>
          <Button
            text="Đề khác"
            variant="primary"
            size="sm"
            icon={<FontAwesomeIcon icon="fa-solid fa-angle-right" />}
          />
        </Link>
      </div>

      {showDetailPart && (
        <div className="container max-w-5xl w-full border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-row gap-5 border-b-2 border-gray-200 mb-4 items-center py-3 cursor-pointer">
            {[1, 2, 3, 4, 5, 6, 7]?.map((part) => (
              <button
                key={part}
                onClick={() => setActivePart(part)}
                className={`px-2 py-2 text-lg font-semibold cursor-pointer ${
                  activePart === part
                    ? "text-[#2C99E2] border-b-3 border-[#2C99E2]"
                    : "text-gray-600"
                } pb-1`}
              >
                Part {part}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
            {partData[activePart]?.length > 0 ? (
              partData[activePart]?.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="w-10 h-10 flex items-center justify-center bg-[#e8f2ff] text-[#35509a] font-bold rounded-full">
                    {item.id}
                  </span>
                  <span className="font-bold text-[#35509a]">
                    {item.correctAnswer}
                  </span>
                  <span className={`${item.correct ? "" : "line-through"}`}>
                    {item.userAnswer}
                  </span>
                  {item.correct ? (
                    <span className="text-green-600">
                      <FontAwesomeIcon icon="fa-solid fa-check" />
                    </span>
                  ) : (
                    <span className="text-red-600">
                      <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </span>
                  )}
                  <span className="text-[#35509a] font-semibold">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleShowDetailResultExam(item);
                      }}
                    >
                      [Chi tiết]
                    </a>
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">
                Không có câu trả lời cho Part {activePart}
              </p>
            )}
          </div>
        </div>
      )}

      {showDetailResultExam && selectedQuestion && (
        <DetailExamResult
          show={showDetailResultExam}
          onClose={handleClosePopup}
          item={selectedQuestion}
        />
      )}
    </main>
  );
};

export default HistoryExamResult;