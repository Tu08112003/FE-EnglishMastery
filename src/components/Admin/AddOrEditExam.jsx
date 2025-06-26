import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper.jsx";
import ExamForm from "./ExamForm.jsx";
import Button from "../Button.jsx";
import SearchBar from "../SearchBar.jsx";
import {
  setTempExam,
  updateTempExamDetails,
  resetTempExam,
  fetchCreateTest,
  fetchUpdateTest,
  removeTempQuestion,
  fetchAllTests,
} from "../../redux/slice/adminSlice.js";
import { toast } from "react-toastify";

const AddOrEditExam = ({ show, onClose, examData }) => {
  const dispatch = useDispatch();
  const { tempExam, loadingUpdateExam, loadingEditExam } = useSelector(
    (state) => state.admin
  );
  const [activePart, setActivePart] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isLoadingData, setIsLoadingData] = useState(false); 
  useEffect(() => {
    if (show) {
      if (examData && (examData.idTest || examData.testId)) {
        // Reset tempExam trước để tránh hiển thị dữ liệu cũ
        dispatch(resetTempExam());
        setIsLoadingData(true);
        
        setTimeout(() => {
          dispatch(
            setTempExam({
              ...examData,
              parts: examData.parts || [],
              questions: examData.questions || [],
            })
          );
          setActivePart(examData.parts?.[0]?.partNumber || 1);
          setIsLoadingData(false);
        }, 800); // Tăng thời gian để thấy rõ loading effect
      } else {
        setIsLoadingData(false);
        dispatch(resetTempExam());
        setActivePart(1);
      }
      setSearchQuery(""); 
    }
  }, [show, examData, dispatch]);

  const handleClose = () => {
    dispatch(resetTempExam());
    setActivePart(1);
    setSelectedQuestion(null);
    setSearchQuery(""); 
    onClose();
  };

  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setShowModal(true);
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!tempExam.testName || !tempExam.year || !tempExam.duration) {
      toast.error("Vui lòng điền đầy đủ thông tin đề thi!");
      return;
    }
    if (examData && (examData.idTest || examData.testId)) {
      try {
        await dispatch(
          fetchUpdateTest({
            testId: examData.idTest || examData.testId,
            testName: tempExam.testName,
            year: tempExam.year,
            duration: tempExam.duration,
            parts: tempExam.parts,
            questions: tempExam.questions,
          })
        ).unwrap();
        toast.success("Cập nhật đề thi thành công!");
        dispatch(fetchAllTests());
        dispatch(resetTempExam());
        handleClose();
      } catch (error) {
        toast.error(error || "Cập nhật đề thi thất bại!");
      }
    } else {
      try {
        await dispatch(
          fetchCreateTest({
            testName: tempExam.testName,
            year: tempExam.year,
            duration: tempExam.duration,
            parts: tempExam.parts,
            questions: tempExam.questions,
          })
        ).unwrap();
        toast.success("Thêm mới đề thi thành công!");
        dispatch(fetchAllTests());
        dispatch(resetTempExam());
        handleClose();
      } catch (error) {
        toast.error(error || "Thêm mới đề thi thất bại!");
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateTempExamDetails({ [id]: value }));
  };

  // Hàm xử lý thay đổi ô tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const defaultParts = Array.from({ length: 7 }, (_, i) => ({
    partNumber: i + 1,
  }));

  const partsToDisplay = defaultParts.map(defaultPart => {
    const existingPart = tempExam.parts.find(
      p => p.partNumber === defaultPart.partNumber
    );
    return existingPart ? { ...defaultPart, ...existingPart } : defaultPart;
  });

  // Lọc các câu hỏi theo phần và tìm kiếm
  const allQuestionsForPart = tempExam.questions?.filter((q) => q.partNumber === activePart) || [];
  const filteredQuestions = allQuestionsForPart.filter((q) =>
    searchQuery
      ? (q.questionNumber + 1).toString() === searchQuery ||
        q.questionText.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <ModalWrapper show={show} onClose={showModal ? () => {} : handleClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl py-6 flex flex-col px-5 w-full max-w-6xl shadow-lg max-h-[95vh] overflow-y-auto custom-scrollbar"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {examData && (examData.idTest || examData.testId)
              ? "Chỉnh sửa đề thi"
              : "Thêm mới đề thi"}
          </h2>
          <button
            onClick={handleClose}
            type="button"
            className="flex items-center justify-center w-8 h-8 hover:bg-gray-200 hover:rounded-lg transition-all duration-200 ease-in-out"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-xmark"
              size="lg"
              style={{ color: "#565E6C" }}
            />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {isLoadingData ? (
            <div className="flex items-center justify-center py-20">
              <span className="text-gray-600 text-lg font-medium">Đang tải...</span>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 px-2">
              <label className="font-semibold text-gray-800" htmlFor="testName">
                Tên đề thi
              </label>
              <input
                className="w-full text-gray-600 font-semibold p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                id="testName"
                placeholder="Nhập tên đề thi"
                type="text"
                value={tempExam.testName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex w-1/2 flex-col gap-2 px-2">
                <label className="font-semibold text-gray-800" htmlFor="year">
                  Năm
                </label>
                <input
                  className="w-full text-gray-600 font-semibold p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  id="year"
                  placeholder="Nhập năm"
                  type="text"
                  value={tempExam.year}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex w-1/2 flex-col gap-2 px-2">
                <label
                  className="font-semibold text-gray-800"
                  htmlFor="duration"
                >
                  Thời gian làm bài (phút)
                </label>
                <input
                  className="w-full text-gray-600 font-semibold p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  id="duration"
                  placeholder="Nhập thời gian làm bài (phút)"
                  type="text"
                  value={tempExam.duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col gap-2 border-2 border-gray-300 rounded-lg px-4">
            <ul className="flex flex-row gap-5 justify-center items-center py-3 cursor-pointer">
              {partsToDisplay.map((part) => (
                <li
                  key={part.partNumber}
                  onClick={() => setActivePart(part.partNumber)}
                  className={`px-2 py-2 text-lg font-semibold cursor-pointer ${
                    activePart === part.partNumber
                      ? "text-[#2C99E2] border-b-3 border-[#2C99E2]"
                      : "text-gray-600"
                  } pb-1`}
                >
                  Part {part.partNumber}
                </li>
              ))}
            </ul>
            <div className="w-full flex-1 border-2 border-gray-300 rounded-lg mb-4 p-4">
              <div className="flex gap-3 p-2">
                <SearchBar
                  text="Nhập vào id câu hỏi hoặc nội dung câu hỏi ví dụ: '1' hoặc 'What is your name?'"
                  focusBorderColor="focus:ring-gray-400"
                  value={searchQuery} 
                  onChange={handleSearchChange}
                />
                <Button
                  text="Thêm câu hỏi"
                  variant="primary"
                  size="sm"
                  onClick={handleAddQuestion}
                  icon={<FontAwesomeIcon icon="fa-solid fa-plus" />}
                />
              </div>
              <div className="flex-1 max-h-[370px] overflow-y-auto rounded-2xl border border-gray-300">
                <table className="w-full text-sm text-gray-700 font-semibold border-separate border-spacing-0">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr className="text-black font-bold">
                      <th className="py-3 px-4 text-center">ID</th>
                      <th className="py-3 px-4 text-left">Câu hỏi</th>
                      <th className="py-3 px-4 text-center">Đáp án</th>
                      <th className="py-3 px-4 text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingData ? (
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                          Đang tải...
                        </td>
                      </tr>
                    ) : filteredQuestions.length > 0 ? (
                      filteredQuestions.map((question) => (
                        <tr key={question.questionNumber} className="hover:bg-gray-100 hover:cursor-pointer">
                          <td className="px-4 py-2 text-center">{question.questionNumber + 1}</td>
                          <td className="px-4 py-2 text-left max-w-[300px] truncate whitespace-nowrap">
                            {question.questionText}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {question.correctAnswer}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <div className="flex gap-2 justify-center items-center">
                              <Button
                                text="Chỉnh sửa"
                                variant="default"
                                size="sm"
                                onClick={() => handleEditQuestion(question)}
                                icon={
                                  <FontAwesomeIcon icon="fa-solid fa-pencil" />
                                }
                              />
                              <Button
                                text="Xóa"
                                variant="delete"
                                size="sm"
                                hoverBg="hover:bg-red-700"
                                icon={
                                  <FontAwesomeIcon icon="fa-solid fa-trash" />
                                }
                                onClick={() => {
                                  dispatch(
                                    removeTempQuestion({
                                      partNumber: question.partNumber,
                                      questionNumber: question.questionNumber,
                                    })
                                  );
                                  toast.success("Xóa câu hỏi thành công!");
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ): searchQuery ? (
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                          Không tìm thấy câu hỏi phù hợp với "{searchQuery}"
                          <br />
                          <span className="text-sm">Thử tìm kiếm với từ khóa khác</span>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                          Chưa có câu hỏi nào trong phần này
                          <br />
                          <span className="text-sm">Nhấn "Thêm câu hỏi" để bắt đầu</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            text="Hủy"
            variant="default"
            size="sm"
            onClick={handleClose}
          />
          <Button
            text={
              examData && (examData.idTest || examData.testId)
                ? loadingEditExam
                  ? "Đang lưu..."
                  : "Lưu"
                : loadingUpdateExam
                ? "Đang thêm..."
                : "Lưu"
            }
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={loadingUpdateExam || loadingEditExam}
          />
        </div>
      </form>
      {showModal && (
        <ExamForm
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedQuestion(null);
          }}
          partNumber={activePart}
          questionData={selectedQuestion}
        />
      )}
    </ModalWrapper>
  );
};

export default AddOrEditExam;