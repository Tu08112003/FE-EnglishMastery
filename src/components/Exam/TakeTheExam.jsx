import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../ConfirmModal";
import QuestionDisplay from "./QuestionDisplay";
import Sidebar from "../Exam/SideBar";
import SideBarMobile from "./SideBarMobile";
import {
  fetchExamById,
  submitExam,
  clearSubmitError,
} from "../../redux/slice/examSlice";
import formatDateTime from "../../utils/formatDateTime";
import formatTime from "../../utils/formatTime";
import { toast } from "react-toastify";

// Cấu hình các phần của bài thi
const parts = [
  { part: 1, question: Array.from({ length: 6 }, (_, i) => i) },
  { part: 2, question: Array.from({ length: 25 }, (_, i) => i + 6) },
  { part: 3, question: Array.from({ length: 39 }, (_, i) => i + 31) }, 
  { part: 4, question: Array.from({ length: 30 }, (_, i) => i + 70) }, 
  { part: 5, question: Array.from({ length: 30 }, (_, i) => i + 100) },
  { part: 6, question: Array.from({ length: 16 }, (_, i) => i + 130) },
  { part: 7, question: Array.from({ length: 54 }, (_, i) => i + 146) },
];

const allQuestionIds = Array.from({ length: 200 }, (_, i) => i);

// Hàm tìm cấu hình của một phần dựa trên ID câu hỏi
const findPartConfig = (questionId) => {
  return parts.find((p) => p.question.includes(questionId)) || null;
};

const TakeTheExam = () => {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedExam, loading, error, submitting, submitError } = useSelector(
    (state) => state.exam || {}
  );

  // State quản lý trạng thái của bài thi
  const [isStarted, setIsStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2); 
  const [selectedQuestionId, setSelectedQuestionId] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

  // Fetch dữ liệu bài thi khi component được mount
  useEffect(() => {
    if (testId) {
      dispatch(fetchExamById(testId));
    }
  }, [dispatch, testId]);

  // Bộ đếm thời gian
  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        // Trừ đi 1 giây, nhưng được biểu diễn dưới dạng giờ (1/3600)
        setTimeLeft((prev) => prev - 1 / 3600);
      }, 1000);
    } else if (timeLeft <= 0 && isStarted) {
      setTimeLeft(0);
        if (Object.keys(userAnswers).length === 0) {
            toast.warning("Hết thời gian! Bạn chưa trả lời câu hỏi nào, bài thi sẽ không được nộp.");
            navigate("/exam");
        } else {
            handleSubmit();
        }
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  // Tìm cấu hình của phần hiện tại dựa trên câu hỏi đang được chọn
  const currentPartConfig = useMemo(
    () => findPartConfig(selectedQuestionId),
    [selectedQuestionId]
  );

  // Chuẩn bị dữ liệu cho component QuestionDisplay
  const questionData = useMemo(() => {
    if (!selectedExam || !currentPartConfig) return null;

    const partNumber = currentPartConfig.part.toString();
    const partQuestions = selectedExam.questionsByPart?.[partNumber];
    if (!partQuestions || !Array.isArray(partQuestions)) return null;

    const partType = currentPartConfig.part;

    // Xử lý các phần câu hỏi đơn
    if ([1, 2, 5].includes(partType)) {
      return partQuestions.find((q) => q.questionNumber === selectedQuestionId) || null;
    }

    // Xử lý các phần câu hỏi nhóm
    if ([3, 4, 6, 7].includes(partType)) {
      const currentQuestion = partQuestions.find((q) => q.questionNumber === selectedQuestionId);
      if (!currentQuestion || !currentQuestion.groupId) return null;

      const groupQuestions = partQuestions.filter((q) => q.groupId === currentQuestion.groupId);
      if (groupQuestions.length === 0) return null;

      const firstQuestionOfGroup = groupQuestions[0];
      let passageText = "";
      if (partType === 6) {
        passageText = firstQuestionOfGroup.mediaFiles.text;
      } else if (partType === 7) {
        passageText = firstQuestionOfGroup.mediaFiles.text;
      }

      return {
        groupId: firstQuestionOfGroup.groupId,
        audio: firstQuestionOfGroup.mediaFiles?.audio,
        image: firstQuestionOfGroup.mediaFiles?.image,
        listQuestion: groupQuestions,
        questionText: passageText,
      };
    }
    return null;
  }, [selectedExam, selectedQuestionId, currentPartConfig]);

  // Bắt đầu làm bài
  const handleStartExam = () => {
    if (selectedExam) {
      setIsStarted(true);
    }
  };

  // Chọn một câu hỏi cụ thể
  const handleQuestionSelect = useCallback((questionId) => {
    if (questionId >= 0 && questionId <= 199) {
      setSelectedQuestionId(questionId);
    }
  }, []);

  // Ghi nhận câu trả lời của người dùng
  const handleAnswer = useCallback(
    (questionId, answer) => {
      const qId = parseInt(questionId, 10);
      const partConfig = findPartConfig(qId);
      if (!selectedExam || !partConfig) return;

      const partQuestions = selectedExam.questionsByPart[partConfig.part.toString()];
      const question = partQuestions.find((q) => q.questionNumber === qId);
      if (!question || !question.options) return;

      const answerIndex = question.options.indexOf(answer);
      const selectedOptionChar = answerIndex !== -1 ? String.fromCharCode(65 + answerIndex) : "";

      if (selectedOptionChar) {
        setUserAnswers((prev) => ({ ...prev, [qId]: selectedOptionChar }));
      }
    },
    [selectedExam]
  );

  const answeredQuestions = Object.keys(userAnswers).length;

  // Nộp bài thi
  const handleSubmit = async () => {
        if (!isStarted || !selectedExam) return;
        const questionMap = new Map();
        Object.values(selectedExam.questionsByPart).forEach(partQuestions => {
            partQuestions.forEach(question => {
                questionMap.set(question.questionNumber, {
                    id: question.id, 
                });
            });
        });

        const formattedUserAnswers = Object.entries(userAnswers).map(([questionNumberStr, userAnswer]) => {
            const questionNumber = parseInt(questionNumberStr, 10);
            const questionInfo = questionMap.get(questionNumber);

            if (!questionInfo) {
                console.warn(`Không tìm thấy thông tin cho câu hỏi số: ${questionNumber}`);
                return null;
            }

            return {
                questionId: questionInfo.id, 
                userAnswer: userAnswer,       
            };
        }).filter(Boolean); 

        const timeSpentInHours = 2 - timeLeft;
        const timeDoTest = formatTime(timeSpentInHours);
        const dateTest = formatDateTime(new Date());

        const payload = {
            testId: testId, 
            timeDoTest: timeDoTest,
            dateTest: dateTest,
            userAnswers: formattedUserAnswers,
        };
        try {
            await dispatch(submitExam(payload)).unwrap();
            setIsStarted(false);
            setShowModal(false);
            navigate("/exam/result");
        } catch (error) {
            setShowModal(false);
            toast.error(error.message ||  "Nộp bài thất bại. Vui lòng thử lại.");
        }
    };
  // Điều hướng lùi lại
  const handlePrevious = () => {
    if (!isStarted || selectedQuestionId === 0) return;

    if ([3, 4, 6, 7].includes(currentPartConfig?.part)) {
        const partQuestions = selectedExam.questionsByPart[currentPartConfig.part.toString()];
        const currentGroupId = questionData.groupId;
        const uniqueGroupIds = [...new Set(partQuestions.map(q => q.groupId))];
        const currentGroupIndex = uniqueGroupIds.indexOf(currentGroupId);

        if (currentGroupIndex > 0) {
            const prevGroupId = uniqueGroupIds[currentGroupIndex - 1];
            const firstQuestionOfPrevGroup = partQuestions.find(q => q.groupId === prevGroupId);
            if (firstQuestionOfPrevGroup) {
                handleQuestionSelect(firstQuestionOfPrevGroup.questionNumber);
                return;
            }
        }
    }
    // Trường hợp mặc định (câu hỏi đơn hoặc nhóm đầu tiên của part)
    handleQuestionSelect(selectedQuestionId - 1);
  };

  // Điều hướng tới
  const handleNext = () => {
    if (!isStarted || selectedQuestionId === 199) return;

    if ([3, 4, 6, 7].includes(currentPartConfig?.part)) {
        const partQuestions = selectedExam.questionsByPart[currentPartConfig.part.toString()];
        const currentGroupId = questionData.groupId;
        const uniqueGroupIds = [...new Set(partQuestions.map(q => q.groupId))];
        const currentGroupIndex = uniqueGroupIds.indexOf(currentGroupId);

        if (currentGroupIndex < uniqueGroupIds.length - 1) {
            const nextGroupId = uniqueGroupIds[currentGroupIndex + 1];
            const firstQuestionOfNextGroup = partQuestions.find(q => q.groupId === nextGroupId);
            if (firstQuestionOfNextGroup) {
                handleQuestionSelect(firstQuestionOfNextGroup.questionNumber);
                return;
            }
        } else {
            const nextPart = parts.find(p => p.part === currentPartConfig.part + 1);
            if (nextPart) {
                handleQuestionSelect(nextPart.question[0]);
                return;
            }
        }
    }
    // Trường hợp mặc định
    handleQuestionSelect(selectedQuestionId + 1);
  };

  // Lấy danh sách ID của các câu hỏi trong nhóm hiện tại
  const currentGroupQuestionIds = useMemo(() => {
    return questionData?.listQuestion?.map((q) => q.questionNumber) || null;
  }, [questionData]);

  // Xử lý trạng thái loading và error
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-gray-600 text-lg font-bold text-center">Đang tải đề thi...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-red-600 text-lg font-semibold">Lỗi khi tải đề thi:</p>
        <p className="text-red-500 bg-red-100 p-2 rounded">{typeof error === "string" ? error : JSON.stringify(error)}</p>
        <Button text="Quay lại" size="sm" onClick={() => navigate(-1)} variant="default" icon={<FontAwesomeIcon icon="fa-solid fa-arrow-left" />}/>
      </div>
    );
  }

  return (
    <main className="container mx-auto flex flex-row items-center justify-center py-6 gap-4">
      {/* Sidebar Desktop */}
      <Sidebar
        timeLeft={timeLeft}
        formatTime={formatTime}
        parts={parts}
        allQuestionIds={allQuestionIds}
        findPartConfig={findPartConfig}
        userAnswers={userAnswers}
        selectedQuestionId={selectedQuestionId}
        currentGroupQuestionIds={currentGroupQuestionIds}
        isStarted={isStarted}
        handleQuestionSelect={handleQuestionSelect}
        answeredQuestions={answeredQuestions}
        setShowModal={setShowModal}
        submitting={submitting}
      />

      {/* Main Content */}
      <div className="w-full h-[700px] mx-3 lg:mx-0 border-2 border-gray-200 rounded-2xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 py-3 flex justify-between items-center px-6 bg-gray-50 rounded-t-2xl">
          <button
            className="text-white font-bold flex items-center justify-center w-9 h-9 border-2 border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-800 hover:border-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            onClick={handlePrevious}
            disabled={!isStarted || selectedQuestionId === 0}
          >
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
          </button>
          
          {isStarted && currentPartConfig ? (
            <>
              {/* Desktop Title */}
              <span className="hidden lg:flex xl:flex text-xl font-bold text-gray-700">
                Part {currentPartConfig.part} |
                {currentGroupQuestionIds && currentGroupQuestionIds.length > 1
                  ? ` Question ${currentGroupQuestionIds[0] + 1} - ${currentGroupQuestionIds[currentGroupQuestionIds.length - 1] + 1}`
                  : ` Question ${selectedQuestionId + 1}`}
              </span>
              {/* Mobile Title & Timer */}
              <div
                className="flex flex-col lg:hidden xl:hidden justify-center items-center border border-gray-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => setIsSidebarMobileOpen(true)}
              >
                <span className="text-gray-700 text-xl font-bold">{formatTime(timeLeft)}</span>
                <span className="text-md font-bold text-gray-700">
                  {currentGroupQuestionIds && currentGroupQuestionIds.length > 1
                    ? ` Question ${currentGroupQuestionIds[0] + 1} - ${currentGroupQuestionIds[currentGroupQuestionIds.length - 1] + 1}`
                    : ` Question ${selectedQuestionId + 1}`}
                </span>
              </div>
            </>
          ) : (
            <h1 className="text-xl font-bold text-gray-700 text-center">
              {selectedExam?.testName || "TOEIC Practice Test"}
            </h1>
          )}
          
          <button
            className="text-white font-bold flex items-center justify-center w-9 h-9 border-2 border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-800 hover:border-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            onClick={handleNext}
            disabled={!isStarted || selectedQuestionId === 199}
          >
            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
          </button>
        </div>

        {/* Question Display Area */}
        <div className="p-2 flex-grow overflow-y-auto">
          {isStarted ? (
            questionData && currentPartConfig ? (
              <QuestionDisplay
                part={currentPartConfig.part}
                questionData={questionData}
                userAnswers={userAnswers}
                onAnswer={handleAnswer}
                handleNext={handleNext}
              />
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <p className="text-red-600 font-semibold text-center px-4">
                  Không thể tải dữ liệu cho Câu hỏi {selectedQuestionId + 1}.
                </p>
                <p className="text-gray-400 text-sm mt-2">Vui lòng chọn câu hỏi khác.</p>
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center h-full space-y-6 px-4 text-center">
              <h1 className="text-2xl font-bold text-gray-700">{selectedExam?.testName || "TOEIC Practice Test"}</h1>
              <p className="text-gray-700 max-w-md">
                Bài kiểm tra này gồm 200 câu hỏi và thời gian làm bài là 120 phút. Hãy đảm bảo bạn có một môi trường yên tĩnh và kết nối ổn định trước khi bắt đầu.
              </p>
              <p className="text-gray-600 font-semibold">Nhấn "Bắt đầu" khi bạn đã sẵn sàng.</p>
              <Button
                text="Bắt đầu làm"
                variant="primary"
                size="sm"
                onClick={handleStartExam}
                disabled={loading || !selectedExam}
                icon={<FontAwesomeIcon icon="fa-solid fa-play" className="mr-2" />}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals and Mobile Sidebar */}
      <ConfirmModal
        show={showModal}
        title="Xác nhận nộp bài"
        description="Bạn có chắc chắn muốn nộp bài?"
        cancelText="Quay lại"
        confirmText={submitting ? "Đang nộp..." : "Nộp bài"}
        confirmVariant="primary"
        onClose={() => {setShowModal(false); dispatch(clearSubmitError());}}
        onCancel={() => {setShowModal(false); dispatch(clearSubmitError());}}
        onConfirm={handleSubmit}
      />
      {submitError && toast.error(submitError)}
      <SideBarMobile
        parts={parts}
        allQuestionIds={allQuestionIds}
        findPartConfig={findPartConfig}
        userAnswers={userAnswers}
        selectedQuestionId={selectedQuestionId}
        currentGroupQuestionIds={currentGroupQuestionIds}
        isStarted={isStarted}
        handleQuestionSelect={(id) => {
          handleQuestionSelect(id);
          setIsSidebarMobileOpen(false); 
        }}
        answeredQuestions={answeredQuestions}
        setShowModal={setShowModal}
        submitting={submitting}
        isOpen={isSidebarMobileOpen}
        onClose={() => setIsSidebarMobileOpen(false)}
      />
    </main>
  );
};

export default TakeTheExam;