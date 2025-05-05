import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../ConfirmModal";
import QuestionDisplay from "./QuestionDisplay";
import { fetchExamById } from "../../redux/slice/examSlice";

const parts = [
  {
    part: 1,
    question: Array.from({ length: 6 }, (_, i) => i),
    dataKey: "questionPart1",
  },
  {
    part: 2,
    question: Array.from({ length: 25 }, (_, i) => i + 6),
    dataKey: "questionPart2",
  },
  {
    part: 3,
    question: Array.from({ length: 13 * 3 }, (_, i) => i + 31),
    dataKey: "questionPart3",
  },
  {
    part: 4,
    question: Array.from({ length: 10 * 3 }, (_, i) => i + 70),
    dataKey: "questionPart4",
  },
  {
    part: 5,
    question: Array.from({ length: 30 }, (_, i) => i + 100),
    dataKey: "questionPart5",
  },
  {
    part: 6,
    question: Array.from({ length: 4 * 4 }, (_, i) => i + 130),
    dataKey: "questionPart6",
  },
  {
    part: 7,
    question: Array.from({ length: 54 }, (_, i) => i + 146),
    dataKey: "questionPart7",
  },
];

const allQuestionIds = Array.from({ length: 200 }, (_, i) => i);

const findPartConfig = (questionId) => {
  if (questionId < 0 || questionId > 199) return null;
  if (questionId >= 0 && questionId <= 5) return parts[0];
  if (questionId >= 6 && questionId <= 30) return parts[1];
  if (questionId >= 31 && questionId <= 69) return parts[2];
  if (questionId >= 70 && questionId <= 99) return parts[3];
  if (questionId >= 100 && questionId <= 129) return parts[4];
  if (questionId >= 130 && questionId <= 145) return parts[5];
  if (questionId >= 146 && questionId <= 199) return parts[6];
  return null;
};

const TakeTheExam = () => {
  const { idTest } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedExam, loading, error } = useSelector(
    (state) => state.exam || {}
  );

  const [isStarted, setIsStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120 * 60);
  const [selectedQuestionId, setSelectedQuestionId] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    console.log("Fetching exam for idTest:", idTest);
    if (idTest) {
      dispatch(fetchExamById(idTest));
    } else {
      console.error("Invalid idTest:", idTest);
    }
  }, [dispatch, idTest]);

  const currentPartConfig = useMemo(
    () => findPartConfig(selectedQuestionId),
    [selectedQuestionId]
  );

  const questionData = useMemo(() => {
    if (!selectedExam || !currentPartConfig) return null;
    const partDataKey = currentPartConfig.dataKey;
    const partDataArray = selectedExam[partDataKey];
    if (!partDataArray || !Array.isArray(partDataArray)) return null;

    const targetIdString = String(selectedQuestionId);

    try {
      if (currentPartConfig.part === 1 || currentPartConfig.part === 2) {
        return (
          partDataArray.find((q) => q.idQuestion === targetIdString) || null
        );
      } else if (currentPartConfig.part === 5) {
        const wrapper = partDataArray.find(
          (item) => item.question?.idQuestion === targetIdString
        );
        return wrapper ? wrapper.question : null;
      } else if (
        currentPartConfig.part === 3 ||
        currentPartConfig.part === 4 ||
        currentPartConfig.part === 6 ||
        currentPartConfig.part === 7
      ) {
        return (
          partDataArray.find((group) =>
            group.listQuestion?.some((q) => q.idQuestion === targetIdString)
          ) || null
        );
      }
    } catch (e) {
      console.error("Error finding question data:", e);
      return null;
    }
    return null;
  }, [selectedExam, selectedQuestionId, currentPartConfig]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isStarted) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  const handleStartExam = () => {
    if (selectedExam) {
      console.log("Starting exam");
      setIsStarted(true);
    } else {
      console.warn("Cannot start exam, data not loaded yet.");
    }
  };

  const handleQuestionSelect = useCallback((questionId) => {
    console.log("Selecting question ID:", questionId);
    if (questionId >= 0 && questionId <= 199) {
      setSelectedQuestionId(questionId);
    } else {
      console.log(`Invalid question ID ${questionId}: out of range (0-199)`);
    }
  }, []);

  const handleAnswer = useCallback(
    (questionId, answer) => {
      let selectedOptionChar = "";
      const currentConfig = findPartConfig(questionId);
      const qData = questionData;
      if (
        qData &&
        currentConfig &&
        (currentConfig.part === 3 ||
          currentConfig.part === 4 ||
          currentConfig.part === 6 ||
          currentConfig.part === 7)
      ) {
        const subQuestion = qData.listQuestion?.find(
          (q) => q.idQuestion === String(questionId)
        );
        if (subQuestion) {
          if (answer === subQuestion.answerA) selectedOptionChar = "A";
          else if (answer === subQuestion.answerB) selectedOptionChar = "B";
          else if (answer === subQuestion.answerC) selectedOptionChar = "C";
          else if (answer === subQuestion.answerD) selectedOptionChar = "D";
        }
      } else if (
        qData &&
        currentConfig &&
        (currentConfig.part === 1 || currentConfig.part === 5)
      ) {
        if (currentConfig.part === 1) {
          selectedOptionChar = answer.charAt(0);
        } else {
          if (answer === qData.answerA) selectedOptionChar = "A";
          else if (answer === qData.answerB) selectedOptionChar = "B";
          else if (answer === qData.answerC) selectedOptionChar = "C";
          else if (answer === qData.answerD) selectedOptionChar = "D";
        }
      } else if (qData && currentConfig && currentConfig.part === 2) {
        selectedOptionChar = answer.charAt(0);
      }

      console.log(
        `Recording answer for question ${questionId}: ${answer} -> ${selectedOptionChar}`
      );
      setUserAnswers((prev) => ({
        ...prev,
        [questionId]: selectedOptionChar,
      }));
    },
    [questionData]
  );

  const answeredQuestions = Object.keys(userAnswers).length;

  const handleSubmit = () => {
    console.log("Submitting exam:", { userAnswers });
    setIsStarted(false);
  };

  const currentGroupQuestionIds = useMemo(() => {
    if (
      !selectedExam ||
      selectedQuestionId === null ||
      !currentPartConfig ||
      ![3, 4, 6, 7].includes(currentPartConfig.part)
    ) {
      return null;
    }

    const partDataKey = currentPartConfig.dataKey;
    const partDataArray = selectedExam[partDataKey];
    if (!partDataArray || !Array.isArray(partDataArray)) {
      return null;
    }

    const targetIdString = String(selectedQuestionId);

    const currentGroup = partDataArray.find((group) =>
      group.listQuestion?.some((q) => q.idQuestion === targetIdString)
    );

    if (currentGroup && currentGroup.listQuestion) {
      return currentGroup.listQuestion
        .map((q) => parseInt(q.idQuestion, 10))
        .filter((id) => !isNaN(id));
    }

    return null;
  }, [selectedQuestionId, selectedExam, currentPartConfig]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-gray-600 text-lg font-bold text-center">
          Loading exam...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-600 text-lg">Error loading exam:</p>
        <p className="text-red-500">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </p>
        <Button
          text="Go Back"
          onClick={() => navigate(-1)}
          variant="secondary"
          className="mt-4"
        />
      </div>
    );
  }

  return (
    <main className="container mx-auto flex flex-row items-center justify-center py-6 gap-4">
      <div className="w-[350px] h-[700px] flex flex-col border-2 border-gray-200 rounded-2xl shadow-xl">
        <div className="w-full py-2.5 border-2 border-[#2C99E2] rounded-tr-2xl rounded-tl-2xl flex items-center justify-center bg-[#2C99E2]">
          <span className="text-white text-3xl font-bold">
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="overflow-y-auto hide-scrollbar w-full px-4 py-4 flex flex-col items-center gap-6">
          {parts.map((item) => (
            <div key={`part-nav-${item.part}`} className="w-full space-y-3">
              <h1 className="font-bold text-2xl">{`Part ${item.part}`}</h1>
              <div className="w-full space-y-2">
                <div className="w-full grid grid-cols-5 gap-y-1 justify-items-center">
                  {allQuestionIds
                    .filter((id) => findPartConfig(id)?.part === item.part)
                    .map((question) => {
                      const isAnswered = !!userAnswers[question];
                      const isSelected = selectedQuestionId === question;

                      const isInCurrentGroup =
                        currentGroupQuestionIds?.includes(question);

                      return (
                        <span
                          key={question}
                          onClick={() =>
                            isStarted && handleQuestionSelect(question)
                          }
                          className={`
                            cursor-pointer flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 border-2
                            ${
                              !isStarted
                                ? "opacity-50 border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50"
                                : isAnswered
                                ? "bg-[#2C99E2] text-white border-[#2C99E2]"
                                : isSelected
                                ? "bg-blue-100 border-[#2C99E2]"
                                : isInCurrentGroup
                                ? "border-[#2C99E2] bg-white hover:bg-blue-50"
                                : "border-gray-300 bg-white hover:border-[#2C99E2] hover:bg-blue-50"
                            }
                          `}
                        >
                          {question + 1}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-center justify-center py-3 rounded-bl-2xl rounded-br-2xl">
          <span className="font-bold border-2 rounded-lg border-[#2C99E2] px-3 py-2.5">
            {answeredQuestions}/200
          </span>
          <Button
            text="Nộp bài"
            variant="primary"
            size="md"
            onClick={() => isStarted && setShowModal(true)}
            disabled={!isStarted}
          />
          <ConfirmModal
            show={showModal}
            title="Xác nhận nộp bài"
            description="Bạn có chắc chắn muốn nộp bài?"
            cancelText="Quay lại"
            confirmText="Nộp bài"
            confirmVariant="primary"
            onClose={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            onConfirm={handleSubmit}
          />
        </div>
      </div>
      <div className="w-full h-[700px] border-2 border-gray-200 rounded-2xl shadow-xl">
        <div className="border-b border-gray-200 py-3 flex justify-center items-center px-4 bg-gray-50 rounded-t-2xl">
          {isStarted && currentPartConfig ? (
            <h1 className="text-xl font-bold text-gray-700">
              Question {selectedQuestionId + 1} - Part {currentPartConfig.part}
            </h1>
          ) : (
            <h1 className="text-xl font-bold text-gray-700">
              {selectedExam?.title || "TOEIC Practice Test"}
            </h1>
          )}
        </div>
        <div className="p-2 h-[650px] overflow-y-auto">
          {isStarted ? (
            questionData && currentPartConfig ? (
              <QuestionDisplay
                part={currentPartConfig.part}
                questionData={questionData}
                userAnswers={userAnswers}
                onAnswer={handleAnswer}
              />
            ) : selectedExam ? (
              <div className="flex flex-col justify-center items-center h-full">
                <p className="text-red-500 text-center px-4">
                  Could not load data for Question {selectedQuestionId + 1}.
                  <br />
                  It might be an invalid question ID for this test or a data
                  loading issue.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Please select another question from the navigator.
                </p>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <p className="text-gray-500">Preparing question...</p>
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center h-full space-y-6 px-4">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">TOEIC Practice Test</h1>
                {selectedExam?.title && (
                  <p className="text-lg text-gray-700">{selectedExam.title}</p>
                )}
                <p className="text-gray-600">
                  Bài kiểm tra này gồm 200 câu hỏi và thời gian làm bài là 120
                  phút.
                </p>
                <p className="text-gray-600">
                  Hãy đảm bảo bạn có một môi trường yên tĩnh và kết nối ổn định
                  trước khi bắt đầu.
                </p>
                <p className="text-gray-600 font-medium">
                  Nhấn "Bắt đầu" khi bạn đã sẵn sàng.
                </p>
              </div>
              <Button
                text="Bắt đầu"
                variant="primary"
                size="sm"
                onClick={handleStartExam}
                disabled={loading || !selectedExam}
                icon={
                  <FontAwesomeIcon icon="fa-solid fa-play" className="mr-2" />
                }
              />
              {loading && (
                <p className="text-sm text-gray-500">
                  Đang tải dữ liệu bài thi...
                </p>
              )}
              {!selectedExam && !loading && !error && (
                <p className="text-sm text-red-500">
                  Không thể tải dữ liệu bài thi.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TakeTheExam;
