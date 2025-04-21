import React, { useState } from "react";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../../components/SearchBar";
import DetailExamResult from "../../components/Admin/DetailExamResult";
import AddExam from "../../components/Admin/AddExam";
import ModalConfirm from "../../components/ConfirmModal";
import EditExam from "../../components/Admin/EditExam";
import Pagination from "../../components/Pagination";

const ManageExam = () => {
  const [examListData, setExamListData] = useState([
    {
      id: "EX001",
      name: "Practice 2024 Test 1",
      totalQuestions: 200,
      questions: [
        {
          id: "Q001",
          content: "1+1 bằng bao nhiêu?",
          options: [
            { id: "A", text: "1" },
            { id: "B", text: "2" },
            { id: "C", text: "3" },
            { id: "D", text: "4" },
          ],
          correctAnswer: "B",
        },
      ],
    },
    {
      id: "EX002",
      name: "Practice 2024 Test 2",
      totalQuestions: 200,
    },
    {
      id: "EX003",
      name: "Practice 2024 Test 3",
      totalQuestions: 200,
    },
  ]);

  const examResultsData = [
    {
      id: "R001",
      userName: "Nguyễn Văn A",
      score: 780,
      submittedAt: "2025-04-10",
    },
    {
      id: "R002",
      userName: "Trần Thị B",
      score: 645,
      submittedAt: "2025-04-12",
    },
    {
      id: "R003",
      userName: "Lê Thị C",
      score: 890,
      submittedAt: "2025-04-14",
    },
  ];

  const [currentPageExams, setCurrentPageExams] = useState(1);
  const [currentPageResults, setCurrentPageResults] = useState(1); 
  const itemsPerPage = 2; 

  const [showDetailResult, setShowDetailResult] = useState(false);
  const [showAddExam, setShowAddExam] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleImportFile = (file) => {
    console.log("File selected:", file);
  };

  const handleDeleteClick = (exam) => {
    setExamToDelete(exam);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setExamToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (examToDelete) {
      setExamListData(examListData.filter((exam) => exam.id !== examToDelete.id));
    }
    setShowModal(false);
    setExamToDelete(null);
  };

  const handleEditClick = (exam) => {
    setSelectedExam(exam);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedExam(null);
  };

  const handleSaveQuestion = (updatedQuestion) => {
    const updatedExam = {
      ...selectedExam,
      questions: selectedExam.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    };
    setExamListData(
      examListData.map((exam) =>
        exam.id === updatedExam.id ? updatedExam : exam
      )
    );
    alert("Cập nhật câu hỏi thành công!");
  };

  const totalExams = examListData.length;
  const totalExamPages = Math.ceil(totalExams / itemsPerPage);
  const startIndexExams = (currentPageExams - 1) * itemsPerPage;
  const endIndexExams = startIndexExams + itemsPerPage;
  const currentExams = examListData.slice(startIndexExams, endIndexExams);

  const totalResults = examResultsData.length;
  const totalResultPages = Math.ceil(totalResults / itemsPerPage);
  const startIndexResults = (currentPageResults - 1) * itemsPerPage;
  const endIndexResults = startIndexResults + itemsPerPage;
  const currentResults = examResultsData.slice(startIndexResults, endIndexResults);

  return (
    <main className="max-w-6xl w-full mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-bold">Quản lý đề thi</h1>
      <section className="mx-auto max-w-4xl flex flex-col space-y-3">
        <div className="flex border-2 border-gray-200 rounded-xl space-x-5 shadow-md p-5 items-center justify-around">
          <div className="flex gap-2 items-center justify-center text-md text-gray-600 font-semibold">
            <span>Tổng số đề thi:</span>
            <span className="font-bold text-[#2C99E2]">{examListData.length}</span>
          </div>
          <div className="flex gap-2 items-center text-md justify-center text-gray-600 font-semibold">
            <span>Số đề đã được làm:</span>
            <span className="font-bold text-[#2C99E2]">10</span>
          </div>
        </div>
      </section>

      {/* Danh sách đề thi */}
      <section className="flex flex-col py-5 px-8 gap-5 border-2 border-gray-200 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">Danh sách đề thi</h1>
        <div className="flex flex-row gap-4 w-full px-6 py-3">
          <SearchBar
            text="Tìm kiếm đề thi theo ID hoặc tên đề thi"
            focusBorderColor="focus:ring-gray-400"
          />
          <Button
            text="Thêm mới"
            variant="primary"
            size="sm"
            icon={<FontAwesomeIcon icon="fa-solid fa-plus" />}
            onClick={() => setShowAddExam(true)}
          />
        </div>
        <table className="w-full min-w-[600px] text-center border-2 border-gray-300 rounded-2xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-gray-200">
            <tr className="text-black font-bold">
              <th className="py-3 px-4">Exam ID</th>
              <th className="py-3 px-4">Tên đề thi</th>
              <th className="py-3 px-4">Số câu hỏi</th>
              <th className="py-3 px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentExams.map((examList) => (
              <tr key={examList.id} className="hover:bg-gray-100">
                <td className="px-4 py-4 text-gray-600 font-semibold">{examList.id}</td>
                <td className="px-4 py-4 font-bold text-[#2C99E2]">{examList.name}</td>
                <td className="px-4 py-4 text-gray-600 font-semibold">{examList.totalQuestions}</td>
                <td className="px-4 py-4 flex gap-2 items-center justify-center">
                  <Button
                    text="Chỉnh sửa"
                    variant="default"
                    size="sm"
                    icon={<FontAwesomeIcon icon="fa-solid fa-pencil" />}
                    onClick={() => handleEditClick(examList)}
                  />
                  <Button
                    text="Xóa"
                    variant="delete"
                    size="sm"
                    hoverBg="hover:bg-red-700"
                    icon={<FontAwesomeIcon icon="fa-solid fa-trash" />}
                    onClick={() => handleDeleteClick(examList)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalExams > 0 && (
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-600 font-semibold">
              Hiển thị từ {startIndexExams + 1} đến {Math.min(endIndexExams, totalExams)}{" "}
              trong số {totalExams} đề thi
            </span>
            <Pagination
              currentPage={currentPageExams}
              totalPages={totalExamPages}
              onPageChange={(page) => setCurrentPageExams(page)}
            />
          </div>
        )}
      </section>

      {/* Kết quả làm bài */}
      <section className="flex flex-col py-5 px-8 gap-5 border-2 border-gray-200 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">Kết quả làm bài</h1>
        <div className="flex justify-center py-3">
          <div className="w-full max-w-3xl">
            <SearchBar
              text="Tìm kiếm đề thi theo ID hoặc tên người dùng"
              focusBorderColor="focus:ring-gray-400"
            />
          </div>
        </div>
        <table className="w-full min-w-[600px] text-center border-2 border-gray-300 rounded-2xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-gray-200">
            <tr className="text-black font-bold">
              <th className="py-3 px-4">Result ID</th>
              <th className="py-3 px-4">Tên người dùng</th>
              <th className="py-3 px-4">Điểm số</th>
              <th className="py-3 px-4">Ngày nộp bài</th>
              <th className="py-3 px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.map((result) => (
              <tr key={result.id} className="hover:bg-gray-100">
                <td className="px-4 py-4 text-gray-600 font-semibold">{result.id}</td>
                <td className="px-4 py-4 text-gray-600 font-semibold">{result.userName}</td>
                <td className="px-4 py-4 font-bold text-[#2C99E2]">{result.score} / 990</td>
                <td className="px-4 py-4 text-gray-600 font-semibold">{result.submittedAt}</td>
                <td className="px-4 py-4 flex items-center justify-center">
                  <Button
                    text="Xem Chi tiết"
                    variant="primary"
                    size="sm"
                    icon={<FontAwesomeIcon icon="fa-solid fa-eye" />}
                    onClick={() => setShowDetailResult(true)}
                  />
                  <DetailExamResult
                    show={showDetailResult}
                    onClose={() => setShowDetailResult(false)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalResults > 0 && (
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-600 font-semibold">
              Hiển thị từ {startIndexResults + 1} đến {Math.min(endIndexResults, totalResults)}{" "}
              trong số {totalResults} kết quả
            </span>
            <Pagination
              currentPage={currentPageResults}
              totalPages={totalResultPages}
              onPageChange={(page) => setCurrentPageResults(page)}
            />
          </div>
        )}
      </section>

      {/* Thêm đề thi */}
      <AddExam
        show={showAddExam}
        onClose={() => setShowAddExam(false)}
        onImport={handleImportFile}
      />

      {/* Xóa đề thi */}
      <ModalConfirm
        show={showModal}
        title="Xác nhận xóa đề thi"
        description={`Bạn có chắc chắn muốn xóa đề thi '${examToDelete?.name}'? Hành động này không thể hoàn tác.`}
        hoverBgConfirm="hover:bg-red-700"
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
      />

      {/* Chỉnh sửa đề thi */}
      <EditExam
        show={showEditModal}
        onClose={handleEditModalClose}
        exam={selectedExam}
        onSave={handleSaveQuestion}
      />
    </main>
  );
};

export default ManageExam;