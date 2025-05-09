import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../ConfirmModal";
import QuestionDisplay from "./QuestionDisplay";
import { fetchExamById, submitExam, clearSubmitError } from "../../redux/slice/examSlice";
import formatDate from "../../utils/formatDate";
import formatTime from "../../utils/formatTime";

const parts = [
  { part: 1, question: Array.from({ length: 6 }, (_, i) => i), dataKey: "questionPart1" },
  { part: 2, question: Array.from({ length: 25 }, (_, i) => i + 6), dataKey: "questionPart2" },
  { part: 3, question: Array.from({ length: 13 * 3 }, (_, i) => i + 31), dataKey: "questionPart3" },
  { part: 4, question: Array.from({ length: 10 * 3 }, (_, i) => i + 70), dataKey: "questionPart4" },
  { part: 5, question: Array.from({ length: 30 }, (_, i) => i + 100), dataKey: "questionPart5" },
  { part: 6, question: Array.from({ length: 4 * 4 }, (_, i) => i + 130), dataKey: "questionPart6" },
  { part: 7, question: Array.from({ length: 54 }, (_, i) => i + 146), dataKey: "questionPart7" },
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
  const { selectedExam, loading, error, submitting, submitError } = useSelector(
    (state) => state.exam || {}
  );

  const [isStarted, setIsStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2);
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

  const currentPartConfig = useMemo(() => findPartConfig(selectedQuestionId), [selectedQuestionId]);

  const questionData = useMemo(() => {
    if (!selectedExam || !currentPartConfig) return null;
    const partDataKey = currentPartConfig.dataKey;
    const partDataArray = selectedExam[partDataKey];
    if (!partDataArray || !Array.isArray(partDataArray)) return null;

    const targetIdString = String(selectedQuestionId);

    try {
      if (currentPartConfig.part === 1 || currentPartConfig.part === 2) {
        return partDataArray.find((q) => q.idQuestion === targetIdString) || null;
      } else if (currentPartConfig.part === 5) {
        const wrapper = partDataArray.find((item) => item.question?.idQuestion === targetIdString);
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

  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1 / 3600);
      }, 1000);
    } else if (timeLeft <= 0 && isStarted) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  const handleStartExam = () => {
    if (selectedExam) {
      console.log("Starting exam");
      setIsStarted(true);
    } else {
      console.log("Cannot start exam, data not loaded yet.");
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
        (currentConfig.part === 3 || currentConfig.part === 4 || currentConfig.part === 6 || currentConfig.part === 7)
      ) {
        const subQuestion = qData.listQuestion?.find((q) => q.idQuestion === String(questionId));
        if (subQuestion) {
          if (answer === subQuestion.answerA) selectedOptionChar = "A";
          else if (answer === subQuestion.answerB) selectedOptionChar = "B";
          else if (answer === subQuestion.answerC) selectedOptionChar = "C";
          else if (answer === subQuestion.answerD) selectedOptionChar = "D";
        }
      } else if (qData && currentConfig && (currentConfig.part === 1 || currentConfig.part === 5)) {
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

      console.log(`Recording answer for question ${questionId}: ${answer} -> ${selectedOptionChar}`);
      setUserAnswers((prev) => ({
        ...prev,
        [questionId]: selectedOptionChar,
      }));
    },
    [questionData]
  );

  const answeredQuestions = Object.keys(userAnswers).length;

  const handleSubmit = async () => {
    if (!isStarted) return;

    // Format answers by part
    const answersByPart = {
      answersPart1: [],
      answersPart2: [],
      answersPart3: [],
      answersPart4: [],
      answersPart5: [],
      answersPart6: [],
      answersPart7: [],
    };

    Object.entries(userAnswers).forEach(([questionId, key]) => {
      const id = parseInt(questionId, 10);
      const partConfig = findPartConfig(id);
      if (partConfig) {
        const answerObj = { idQuestion: questionId, key };
        switch (partConfig.part) {
          case 1:
            answersByPart.answersPart1.push(answerObj);
            break;
          case 2:
            answersByPart.answersPart2.push(answerObj);
            break;
          case 3:
            answersByPart.answersPart3.push(answerObj);
            break;
          case 4:
            answersByPart.answersPart4.push(answerObj);
            break;
          case 5:
            answersByPart.answersPart5.push(answerObj);
            break;
          case 6:
            answersByPart.answersPart6.push(answerObj);
            break;
          case 7:
            answersByPart.answersPart7.push(answerObj);
            break;
          default:
            break;
        }
      }
    });

    const timeDoTest = formatTime(2 - timeLeft);
    const dateTest = formatDate(new Date());

    const payload = {
      idTest,
      timeDoTest,
      dateTest,
      ...answersByPart,
    };

    console.log("Submitting exam payload:", payload);

    try {
      const result = await dispatch(submitExam(payload)).unwrap();
      setIsStarted(false);
      setShowModal(false);
      navigate("/exam/result", { state: { result, userAnswers, timeDoTest, dateTest } });
    } catch (error) {
      console.error("Submit exam failed:", error);
      setShowModal(false);
    }
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

  const getGroupFirstQuestionId = useCallback(
    (groupIndex, partDataArray) => {
      if (
        partDataArray &&
        Array.isArray(partDataArray) &&
        groupIndex >= 0 &&
        groupIndex < partDataArray.length &&
        partDataArray[groupIndex].listQuestion &&
        partDataArray[groupIndex].listQuestion.length > 0
      ) {
        return parseInt(partDataArray[groupIndex].listQuestion[0].idQuestion, 10);
      }
      return null;
    },
    []
  );

  const handlePrevious = useCallback(() => {
    if (!isStarted || selectedQuestionId === 0) return;

    if ([3, 4, 6, 7].includes(currentPartConfig.part)) {
      const partDataKey = currentPartConfig.dataKey;
      const partDataArray = selectedExam[partDataKey];
      const currentGroupIndex = partDataArray.findIndex((group) =>
        group.listQuestion?.some((q) => q.idQuestion === String(selectedQuestionId))
      );

      if (currentGroupIndex > 0) {
        const prevGroupFirstId = getGroupFirstQuestionId(currentGroupIndex - 1, partDataArray);
        if (prevGroupFirstId !== null) {
          handleQuestionSelect(prevGroupFirstId);
        }
      } else {
        const currentPartIndex = parts.findIndex((p) => p.part === currentPartConfig.part);
        if (currentPartIndex > 0) {
          const prevPart = parts[currentPartIndex - 1];
          const lastQuestionId = prevPart.question[prevPart.question.length - 1];
          handleQuestionSelect(lastQuestionId);
        }
      }
    } else {
      handleQuestionSelect(selectedQuestionId - 1);
    }
  }, [
    isStarted,
    selectedQuestionId,
    currentPartConfig,
    selectedExam,
    handleQuestionSelect,
    getGroupFirstQuestionId,
  ]);

  const handleNext = useCallback(() => {
    if (!isStarted || selectedQuestionId === 199) return;

    if ([3, 4, 6, 7].includes(currentPartConfig.part)) {
      const partDataKey = currentPartConfig.dataKey;
      const partDataArray = selectedExam[partDataKey];
      const currentGroupIndex = partDataArray.findIndex((group) =>
        group.listQuestion?.some((q) => q.idQuestion === String(selectedQuestionId))
      );

      if (currentGroupIndex < partDataArray.length - 1) {
        const nextGroupFirstId = getGroupFirstQuestionId(currentGroupIndex + 1, partDataArray);
        if (nextGroupFirstId !== null) {
          handleQuestionSelect(nextGroupFirstId);
        }
      } else {
        // Move to the first question of the next part
        const currentPartIndex = parts.findIndex((p) => p.part === currentPartConfig.part);
        if (currentPartIndex < parts.length - 1) {
          const nextPart = parts[currentPartIndex + 1];
          const firstQuestionId = nextPart.question[0];
          handleQuestionSelect(firstQuestionId);
        }
      }
    } else {
      handleQuestionSelect(selectedQuestionId + 1);
    }
  }, [
    isStarted,
    selectedQuestionId,
    currentPartConfig,
    selectedExam,
    handleQuestionSelect,
    getGroupFirstQuestionId,
  ]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-gray-600 text-lg font-bold text-center">Đang tải đề thi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-semibold">Lỗi khi tải đề thi:</p>
        <p className="text-red-500 font-semibold">{typeof error === "string" ? error : JSON.stringify(error)}</p>
        <Button text="Go Back" onClick={() => navigate(-1)} variant="default" />
      </div>
    );
  }

  return (
    <main className="container mx-auto flex flex-row items-center justify-center py-6 gap-4">
      <div className="w-[350px] h-[700px] flex flex-col border-2 border-gray-200 rounded-2xl shadow-xl">
        <div className="w-full py-2.5 border-2 border-[#2C99E2] rounded-tr-2xl rounded-tl-2xl flex items-center justify-center bg-[#2C99E2]">
          <span className="text-white text-3xl font-bold">{formatTime(timeLeft)}</span>
        </div>
        <div className="overflow-y-auto hide-scrollbar w-full px-4 py-4 flex flex-col items-center gap-6">
          {parts.map((item) => (
            <div key={`part-nav-${item.part}`} className="w-full space-y-3">
              <h1 className="font-bold text-2xl">{`Part ${item.part}`}</h1>
              <div className="w-full space-y-2">
                <div className="w-full grid grid-cols-5 gap-y-2 justify-items-center">
                  {allQuestionIds
                    .filter((id) => findPartConfig(id)?.part === item.part)
                    .map((question) => {
                      const isAnswered = !!userAnswers[question];
                      const isSelected = selectedQuestionId === question;
                      const isInCurrentGroup = currentGroupQuestionIds?.includes(question);

                      return (
                        <span
                          key={question}
                          onClick={() => isStarted && handleQuestionSelect(question)}
                          className={`
                            cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-all duration-150 border-2
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
          <span className="font-bold border-2 rounded-lg border-[#2C99E2] px-3 py-2.5">{answeredQuestions}/200</span>
          <Button
            text="Nộp bài"
            variant="primary"
            size="md"
            onClick={() => isStarted && setShowModal(true)}
            disabled={!isStarted || submitting}
          />
          <ConfirmModal
            show={showModal}
            title="Xác nhận nộp bài"
            description="Bạn có chắc chắn muốn nộp bài?"
            cancelText="Quay lại"
            confirmText={submitting ? "Đang nộp..." : "Nộp bài"}
            confirmVariant="primary"
            onClose={() => {
              setShowModal(false);
              dispatch(clearSubmitError());
            }}
            onCancel={() => {
              setShowModal(false);
              dispatch(clearSubmitError());
            }}
            onConfirm={handleSubmit}
            confirmDisabled={submitting}
          />
        </div>
        {submitError && (
          <div className="text-red-500 text-center font-semibold py-2">{submitError}</div>
        )}
      </div>
      <div className="w-full h-[700px] border-2 border-gray-200 rounded-2xl shadow-xl">
        <div className="border-b border-gray-200 py-3 flex justify-between items-center px-6 bg-gray-50 rounded-t-2xl">
          <button
            className="text-white font-bold flex items-center justify-center w-9 h-9 border-2 border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-800 hover:border-gray-800  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            onClick={handlePrevious}
            disabled={!isStarted || selectedQuestionId === 0}
          >
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
          </button>
          {isStarted && currentPartConfig ? (
            <h1 className="text-xl font-bold text-gray-700">
              Part {currentPartConfig.part} |
              {currentGroupQuestionIds && currentGroupQuestionIds.length > 1
                ? ` Question ${currentGroupQuestionIds[0] + 1} - ${currentGroupQuestionIds[currentGroupQuestionIds.length - 1] + 1} `
                : ` Question ${selectedQuestionId + 1} `}
            </h1>
          ) : (
            <h1 className="text-xl font-bold text-gray-700">{selectedExam?.nameTest || "TOEIC Practice Test"}</h1>
          )}
          <button
            className="text-white font-bold flex items-center justify-center w-9 h-9 border-2 border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-800 hover:border-gray-800  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            onClick={handleNext}
            disabled={!isStarted || selectedQuestionId === 199}
          >
            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
          </button>
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
                  Không thể tải dữ liệu cho Câu hỏi {selectedQuestionId + 1}.
                  <br />
                  Có thể ID câu hỏi không hợp lệ cho bài thi này hoặc có lỗi khi tải dữ liệu.
                </p>
                <p className="text-gray-400 text-sm mt-2">Vui lòng chọn câu hỏi khác.</p>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <p className="text-gray-500">Đang chuẩn bị câu hỏi...</p>
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center h-full space-y-6 px-4">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-gray-700">{selectedExam?.nameTest || "TOEIC Practice Test"} </h1>
                <p className="text-gray-700">Bài kiểm tra này gồm 200 câu hỏi và thời gian làm bài là 120 phút.</p>
                <p className="text-gray-700">Hãy đảm bảo bạn có một môi trường yên tĩnh và kết nối ổn định trước khi bắt đầu.</p>
                <p className="text-gray-600 font-semibold">Nhấn "Bắt đầu" khi bạn đã sẵn sàng.</p>
              </div>
              <Button
                text="Bắt đầu làm"
                variant="primary"
                size="sm"
                onClick={handleStartExam}
                disabled={loading || !selectedExam}
                icon={<FontAwesomeIcon icon="fa-solid fa-play" className="mr-2" />}
              />
              {loading && <p className="text-sm text-gray-600">Đang tải dữ liệu bài thi...</p>}
              {!selectedExam && !loading && !error && <p className="text-sm text-red-500">Không thể tải dữ liệu bài thi.</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TakeTheExam;