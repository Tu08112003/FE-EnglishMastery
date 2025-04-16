import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmModal from '../ConfirmModal';
import toeicData from './toeicData';
import QuestionDisplay from './QuestionDisplay';
import { Link, useNavigate } from 'react-router-dom';

const parts = [
  { part: "Part 1", question: [1, 2, 3, 4, 5, 6] },
  { part: "Part 2", question: Array.from({ length: 25 }, (_, i) => i + 7) },
  { part: "Part 3", question: Array.from({ length: 39 }, (_, i) => i + 32) },
  { part: "Part 4", question: Array.from({ length: 30 }, (_, i) => i + 71) },
  { part: "Part 5", question: Array.from({ length: 30 }, (_, i) => i + 101) },
  { part: "Part 6", question: Array.from({ length: 16 }, (_, i) => i + 131) },
  { part: "Part 7", question: Array.from({ length: 54 }, (_, i) => i + 147) },
];

const TakeTheExam = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120 * 60);
  const [selectedQuestionId, setSelectedQuestionId] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate()
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start timer when exam begins
  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  // Handle starting the exam
  const handleStartExam = () => {
    setIsStarted(true);
  };

  // Process question data
  const processedParts = [];
  let questionId = 1;

  // Part 1
  processedParts.push({
    part: "Part 1",
    range: "1-6",
    questions: toeicData.questions_part_1.map((q) => ({
      id: questionId++,
      type: "single",
      part: 1,
      data: q,
    })),
  });

  // Part 2
  processedParts.push({
    part: "Part 2",
    range: "7-31",
    questions: toeicData.questions_part_2.map((q) => ({
      id: questionId++,
      type: "single",
      part: 2,
      data: q,
    })),
  });

  // Part 3
  processedParts.push({
    part: "Part 3",
    range: "32-70",
    questions: toeicData.questions_part_3.flatMap((group) => {
      const startId = questionId;
      questionId += group.questions.length;
      return group.questions.map((q, qIdx) => ({
        id: startId + qIdx,
        type: "group",
        groupId: startId,
        part: 3,
        data: { ...q, id: startId + qIdx },
      }));
    }),
    groups: toeicData.questions_part_3.map((group, idx) => ({
      range: `${32 + idx * 3}-${32 + idx * 3 + 2}`,
      audio: group.audio,
      image: group.image,
      questions: group.questions.map((q, qIdx) => ({
        id: 32 + idx * 3 + qIdx,
        title: q.title,
        answer_0: q.answer_0,
        answer_1: q.answer_1,
        answer_2: q.answer_2,
        answer_3: q.answer_3,
      })),
    })),
  });

  // Part 4
  processedParts.push({
    part: "Part 4",
    range: "71-100",
    questions: toeicData.questions_part_4.flatMap((group) => {
      const startId = questionId;
      questionId += group.questions.length;
      return group.questions.map((q, qIdx) => ({
        id: startId + qIdx,
        type: "group",
        groupId: startId,
        part: 4,
        data: { ...q, id: startId + qIdx },
      }));
    }),
    groups: toeicData.questions_part_4.map((group, idx) => ({
      range: `${71 + idx * 3}-${71 + idx * 3 + 2}`,
      audio: group.audio,
      image: group.image,
      questions: group.questions.map((q, qIdx) => ({
        id: 71 + idx * 3 + qIdx,
        title: q.title,
        answer_0: q.answer_0,
        answer_1: q.answer_1,
        answer_2: q.answer_2,
        answer_3: q.answer_3,
      })),
    })),
  });

  // Part 5
  processedParts.push({
    part: "Part 5",
    range: "101-130",
    questions: toeicData.questions_part_5.map((q) => ({
      id: questionId++,
      type: "single",
      part: 5,
      data: { ...q, id: questionId - 1 },
    })),
  });

  // Part 6
  processedParts.push({
    part: "Part 6",
    range: "131-146",
    questions: toeicData.questions_part_6.flatMap((group) => {
      const startId = questionId;
      questionId += group.questions.length;
      return group.questions.map((q, qIdx) => ({
        id: startId + qIdx,
        type: "group",
        groupId: startId,
        part: 6,
        data: { ...q, id: startId + qIdx },
      }));
    }),
    groups: toeicData.questions_part_6.map((group, idx) => ({
      range: `${131 + idx * 4}-${131 + idx * 4 + 3}`,
      question_group_title: group.question_group_title,
      questions: group.questions.map((q, qIdx) => ({
        id: 131 + idx * 4 + qIdx,
        answer_0: q.answer_0,
        answer_1: q.answer_1,
        answer_2: q.answer_2,
        answer_3: q.answer_3,
      })),
    })),
  });

  // Part 7
  processedParts.push({
    part: "Part 7",
    range: "147-200",
    questions: toeicData.questions_part_7.flatMap((group) => {
      const startId = questionId;
      questionId += group.questions.length;
      return group.questions.map((q, qIdx) => ({
        id: startId + qIdx,
        type: "group",
        groupId: startId,
        part: 7,
        data: { ...q, id: startId + qIdx },
      }));
    }),
    groups: toeicData.questions_part_7.map((group, idx) => {
      const startId = 147 + toeicData.questions_part_7.slice(0, idx).reduce((sum, g) => sum + g.questions.length, 0);
      const endId = startId + group.questions.length - 1;
      return {
        range: `${startId}-${endId}`,
        question_group_title: group.question_group_title,
        questions: group.questions.map((q, qIdx) => ({
          id: startId + qIdx,
          title: q.title,
          answer_0: q.answer_0,
          answer_1: q.answer_1,
          answer_2: q.answer_2,
          answer_3: q.answer_3,
        })),
      };
    }),
  });

  // Handle question selection
  const handleQuestionSelect = (questionId) => {
    if (questionId >= 1 && questionId <= 200) {
      setSelectedQuestionId(questionId);
    }
  };

  // // Handle navigation to previous/next question
  // const handlePreviousQuestion = () => {
  //   if (selectedQuestionId > 1) {
  //     setSelectedQuestionId(selectedQuestionId - 1);
  //   }
  // };

  // const handleNextQuestion = () => {
  //   if (selectedQuestionId < 200) {
  //     setSelectedQuestionId(selectedQuestionId + 1);
  //   }
  // };

  // Handle answer selection
  const handleAnswer = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  // Find current question and group
  const currentQuestion = processedParts
    .flatMap((p) => p.questions)
    .find((q) => q.id === selectedQuestionId);

  const currentGroup = currentQuestion?.type === "group"
    ? processedParts
        .find((p) => p.part === `Part ${currentQuestion.part}`)
        ?.groups?.find((g) => g.questions.some((q) => q.id === selectedQuestionId))
    : null;

  const currentPart = processedParts.find((p) => p.part === `Part ${currentQuestion?.part}`);

  // Get all question IDs in the current group
  const currentGroupQuestionIds = currentGroup
    ? currentGroup.questions.map((q) => q.id)
    : [];

  // Calculate answered questions
  const answeredQuestions = Object.keys(userAnswers).length;

  // Handle submit
  const handleSubmit = () => {
    navigate('/exam/result');
  };

  return (
    <main className='container mx-auto flex flex-row items-center justify-center py-6 gap-4'>
      {/* Question nav */}
      <div className="w-[350px] h-[700px] flex flex-col border-2 border-gray-200 rounded-2xl shadow-xl">
        <div className='w-full py-2.5 border-2 border-[#2C99E2] rounded-tr-2xl rounded-tl-2xl flex items-center justify-center bg-[#2C99E2]'>
          <span className='text-white text-3xl font-bold'>{formatTime(timeLeft)}</span>
        </div>

        <div className='overflow-y-auto hide-scrollbar w-full px-4 py-4 flex flex-col items-center gap-6'>
          {parts.map((item, index) => (
            <div key={index} className='w-full space-y-3'>
              <h1 className='font-bold text-2xl'>{item.part}</h1>
              <div className='w-full space-y-2'>
                <div className='w-full grid grid-cols-5 gap-y-2 justify-items-center'>
                  {item.question.map((question) => {
                    const isInCurrentGroup = currentGroupQuestionIds.includes(question);
                    const isAnswered = !!userAnswers[question];
                    const isSelected = selectedQuestionId === question;

                    return (
                      <span
                        key={question}
                        onClick={() => isStarted && handleQuestionSelect(question)}
                        className={`cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg
                          ${!isStarted ? "opacity-50 border-2 border-gray-200" : ""}
                          ${isStarted && !isAnswered && !isSelected && !isInCurrentGroup ? "border-2 border-gray-200" : ""}
                          ${isSelected && !isAnswered ? "border-2 border-[#2C99E2]" : ""}
                          ${isAnswered ? "bg-[#2C99E2] text-white border-2 border-[#2C99E2]" : ""}
                          ${isInCurrentGroup && !isSelected && !isAnswered ? "border-2 border-[#2C99E2]" : ""}
                        `}
                      >
                        {question}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex gap-3 items-center justify-center py-3 rounded-bl-2xl rounded-br-2xl'>
          <span className='font-bold border-2 rounded-lg border-[#2C99E2] px-3 py-2.5'>{answeredQuestions}/200</span>
          <Button
            text="Nộp bài"
            variant='primary'
            size='md'
            onClick={() => setShowModal(true)}
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

      {/* Question content */}
      <div className='w-full h-[700px] border-2 border-gray-200 rounded-2xl shadow-xl'>
        <div className='border-b border-gray-200 py-3 flex justify-center items-center px-4'>
          
          {isStarted ? (
            <h1 className="text-xl font-bold">
              {currentPart.part} | Question {currentQuestion.type === "group" ? currentGroup?.range || selectedQuestionId : selectedQuestionId}
            </h1>
          ):(
            <h1 className="text-xl font-bold">Test 1 Practice 2024</h1>
          )}
    
        </div>
        <div className='p-2 h-[400px] md:h-[650px]'>
          {!isStarted ? (
            <div className='flex flex-col justify-center items-center h-full space-y-6'>
              <div className='text-center space-y-2'>
                <h1 className='text-2xl font-bold'>TOEIC Practice Test</h1>
                <p className='text-gray-600'>Bài kiểm tra này gồm 200 câu hỏi và mất 120 phút để hoàn thành.</p>
                <p className='text-gray-600'>Hãy đảm chắc chắn rằng bạn có một môi trường yên tĩnh và đủ thời gian trước khi làm bài.</p>
              </div>
              <Button
                text='Bắt đầu làm'
                variant='primary'
                size='sm'
                onClick={handleStartExam}
                icon={<FontAwesomeIcon icon='fa-solid fa-play' style={{ color: 'white' }} />}
              />
            </div>
          ) : currentQuestion ? (
            <div>
              <QuestionDisplay
                part={currentQuestion.part}
                questionData={currentQuestion.type === "group" ? currentGroup : currentQuestion.data}
                userAnswers={userAnswers}
                onAnswer={handleAnswer}
              />
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center h-full'>
              <p className='text-red-600'>Error: Question not found. Please select a valid question.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TakeTheExam;