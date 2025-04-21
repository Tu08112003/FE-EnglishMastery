import React, { useState } from "react";
import image_result from "../../assets/images/img-result-test.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import { Link } from "react-router-dom";
import DetailExamResult from "../Exam/DetailExamResult";

const ExamResult = () => {
  const [activePart, setActivePart] = useState(1);
  const [showDetailPart, setShowDetailPart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const partData = {
    1: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      userAnswer: i % 2 === 0 ? "A" : "B",
      correctAnswer: "A",
      correct: i % 2 === 0,
      question: `What is shown in the picture ${i + 1}?`,
      image: "https://via.placeholder.com/150", // Placeholder image for Part 1
      options: {
        A: "A person walking",
        B: "A car on the road",
        C: "A tree in a park",
        D: "A building",
      },
    })), // Photographs: 6 questions
    2: Array.from({ length: 25 }, (_, i) => ({
      id: i + 7,
      userAnswer: i % 3 === 0 ? "C" : "A",
      correctAnswer: "A",
      correct: i % 3 !== 0,
      question: `Where are you going? (${i + 7})`,
      image: null, // No image for most Part 2 questions
      options: {
        A: "To the office",
        B: "To the park",
        C: "To the store",
        D: "To the beach",
      },
    })), // Question-Response: 25 questions
    3: Array.from({ length: 39 }, (_, i) => ({
      id: i + 32,
      userAnswer: i % 2 === 0 ? "B" : "D",
      correctAnswer: "B",
      correct: i % 2 === 0,
      question: `What time does the meeting start?`,
      image: i % 5 === 0 ? "https://via.placeholder.com/150" : null, // Image for some Part 3 questions
      options: {
        A: "At 9 AM",
        B: "At 10 AM",
        C: "At 11 AM",
        D: "At 12 PM",
      },
    })), // Conversations: 39 questions
    4: Array.from({ length: 30 }, (_, i) => ({
      id: i + 71,
      userAnswer: i % 4 === 0 ? "A" : "C",
      correctAnswer: "C",
      correct: i % 4 !== 0,
      question: `What is the speaker talking about?`,
      image: i % 6 === 0 ? "https://via.placeholder.com/150" : null, // Image for some Part 4 questions
      options: {
        A: "A new product",
        B: "A company event",
        C: "A weather update",
        D: "A travel plan",
      },
    })), // Short Talks: 30 questions
    5: Array.from({ length: 30 }, (_, i) => ({
      id: i + 101,
      userAnswer: i % 2 === 0 ? "D" : "B",
      correctAnswer: "D",
      correct: i % 2 === 0,
      question: `She ___ to the meeting yesterday.`,
      image: null, // No image for Part 5
      options: {
        A: "go",
        B: "goes",
        C: "going",
        D: "went",
      },
    })), // Incomplete Sentences: 30 questions
    6: Array.from({ length: 16 }, (_, i) => ({
      id: i + 131,
      userAnswer: i % 3 === 0 ? "A" : "C",
      correctAnswer: "C",
      correct: i % 3 !== 0,
      question: `The company ___ a new branch next month.`,
      image: null, // No image for Part 6
      options: {
        A: "open",
        B: "opened",
        C: "will open",
        D: "opens",
      },
    })), // Text Completion: 16 questions
    7: Array.from({ length: 54 }, (_, i) => ({
      id: i + 147,
      userAnswer: i % 2 === 0 ? "B" : "A",
      correctAnswer: "B",
      correct: i % 2 === 0,
      question: `What is the main topic of the passage?`,
      image: i % 10 === 0 ? "https://via.placeholder.com/150" : null, // Image for some Part 7 questions
      options: {
        A: "A new technology",
        B: "A historical event",
        C: "A scientific discovery",
        D: "A cultural festival",
      },
    })), // Reading Comprehension: 54 questions
  };

  const handleShowDetailPart = () => {
    setShowDetailPart(!showDetailPart);
  };

  const handleShowPopup = (item) => {
    setSelectedQuestion(item);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedQuestion(null);
  };

  return (
    <main className="container mx-auto py-10 flex flex-col items-center justify-center gap-5">
      {/* Kết quả thi */}
      <div className="w-full max-w-5xl bg-white rounded-2xl border-2 border-gray-300 shadow-lg p-8 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-600">
          Test 1 Practice 2024
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
                <p className="font-semibold">Anhdaden</p>
              </div>
              <div>
                <p className="text-gray-600">Ngày làm:</p>
                <p className="font-semibold">16/4/2025</p>
              </div>
              <div>
                <p className="text-gray-600">Thời gian hoàn thành:</p>
                <p className="font-semibold">2:00:00</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-gray-600">Số câu đúng:</p>
                <p className="font-semibold text-green-600">2</p>
              </div>
              <div>
                <p className="text-gray-600">Số câu sai:</p>
                <p className="font-semibold text-red-500">3</p>
              </div>
              <div>
                <p className="text-gray-600">Số câu bỏ qua:</p>
                <p className="font-semibold">2</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-gray-600">Listening:</p>
                <p>
                  <span className="font-semibold ">30/100</span> |{" "}
                  <span className="font-semibold text-[#2C99E2]">300 điểm</span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">Reading:</p>
                <p>
                  <span className="font-semibold ">30/100</span> |{" "}
                  <span className="font-semibold text-[#2C99E2]">300 điểm</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
              <div className="text-center">
                <p className="text-gray-600">Tổng điểm</p>
                <p className="text-4xl sm:text-5xl font-extrabold text-[#2C99E2]">
                  600
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex gap-5 justify-end w-full max-w-5xl">
        <Button
          text={`${
            showDetailPart ? "Ẩn đáp án chi tiết" : "Hiện đáp án chi tiết"
          }`}
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

      {/* Chi tiết kết quả */}
      {showDetailPart && (
        <div className="container max-w-5xl w-full border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-row gap-5 border-b-2 border-gray-200 mb-4 items-center py-3 cursor-pointer">
            {[1, 2, 3, 4, 5, 6, 7].map((part) => (
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
            {partData[activePart].map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center bg-[#e8f2ff] text-[#35509a] font-bold rounded-full">
                  {item.id}
                </span>
                {/* Answer correct */}
                <span className="font-bold text-[#35509a]">
                  {item.correctAnswer === "Ø" ? "Ø" : `${item.correctAnswer}`}
                </span>
                {/* Answer user */}
                <span
                  className={`${
                    item.correct ? "" : "line-through"
                  }`}
                >
                  {item.userAnswer === "Ø" ? "Ø" : `${item.userAnswer}`}
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
                      handleShowPopup(item);
                    }}
                  >
                    [Chi tiết]
                  </a>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popup for question details */}
      {showPopup && selectedQuestion && (
        <DetailExamResult
          show={showPopup}
          onClose={handleClosePopup}
          item={selectedQuestion}
        />
      )}
    </main>
  );
};

export default ExamResult;
