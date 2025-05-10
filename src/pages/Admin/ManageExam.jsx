import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHistoryTests, fetchNumberOfTests, fetchAllTests } from '../../redux/slice/adminSlice';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../../components/SearchBar';
import DetailExamResult from '../../components/Admin/DetailExamResult';
import AddExam from '../../components/Admin/AddExam';
import ModalConfirm from '../../components/ConfirmModal';
import EditExam from '../../components/Admin/EditExam';
import Pagination from '../../components/Pagination';
import { toast } from 'react-toastify';

const ManageExam = () => {
  const dispatch = useDispatch();
  const { tests, numberOfTests, historyTests, loading, error } = useSelector((state) => state.admin);

  const [currentPageExams, setCurrentPageExams] = useState(1);
  const [currentPageResults, setCurrentPageResults] = useState(1);
  const [searchExamQuery, setSearchExamQuery] = useState('');
  const [searchResultQuery, setSearchResultQuery] = useState('');
  const [showDetailResult, setShowDetailResult] = useState(false);
  const [showAddExam, setShowAddExam] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null); 

  const itemsPerPageExams = 10; 
  const itemsPerPageResults = 5; 


  useEffect(() => {
    dispatch(fetchAllTests());
    dispatch(fetchNumberOfTests());
    dispatch(fetchAllHistoryTests());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const filteredExams = tests.filter((exam) => {
        const query = searchExamQuery.toLowerCase();
        return (
          exam.id?.toLowerCase().includes(query) ||
          exam.testName?.toLowerCase().includes(query) 
        );
    })

  const filteredResults = historyTests.filter((result) => {
        const query = searchResultQuery.toLowerCase();
        return (
          result.id?.toLowerCase().includes(query) ||
          result.email?.toLowerCase().includes(query) 
        );
      })

  // Pagination for exams
  const totalExams = filteredExams.length;
  const totalExamPages = Math.ceil(totalExams / itemsPerPageExams);
  const startIndexExams = (currentPageExams - 1) * itemsPerPageExams;
  const endIndexExams = startIndexExams + itemsPerPageExams;
  const currentExams = filteredExams.slice(startIndexExams, endIndexExams);

  // Pagination for exam results
  const totalResults = filteredResults.length;
  const totalResultPages = Math.ceil(totalResults / itemsPerPageResults);
  const startIndexResults = (currentPageResults - 1) * itemsPerPageResults;
  const endIndexResults = startIndexResults + itemsPerPageResults;
  const currentResults = filteredResults.slice(startIndexResults, endIndexResults);

  const handleImportFile = (file) => {
    console.log('File selected:', file);
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
      toast.success(`Xóa đề thi ${examToDelete.testName} thành công`); 
      dispatch(fetchAllTests());
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
    if (!selectedExam) return;
    const updatedExam = {
      ...selectedExam,
      questions: selectedExam.questions
        ? selectedExam.questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        : [updatedQuestion],
    };
    toast.success(`Cập nhật đề thi ${updatedExam.testName} thành công`); 
    dispatch(fetchAllTests());
    setShowEditModal(false);
    setSelectedExam(null);
  };

  const handleViewResultClick = (result) => {
    setSelectedResult(result);
    setShowDetailResult(true);
  };

  return (
    <main className="max-w-6xl w-full mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-bold">Quản lý đề thi</h1>
      <section className="mx-auto max-w-4xl flex flex-col space-y-3">
      { loading? (
        <div className="text-center py-4 text-gray-600 font-semibold text-lg">Đang tải...</div>
      ):(
        <>
          <div className="flex border-2 border-gray-200 rounded-xl space-x-5 shadow-md p-5 items-center justify-around">
            <div className="flex gap-2 items-center justify-center text-md text-gray-600 font-semibold">
              <span>Tổng số đề thi:</span>
              <span className="font-bold text-[#2C99E2]">{numberOfTests || 0}</span>
            </div>
            <div className="flex gap-2 items-center text-md justify-center text-gray-600 font-semibold">
              <span>Số đề đã được làm:</span>
              <span className="font-bold text-[#2C99E2]">{historyTests.length || 0}</span>
            </div>
          </div>
        </>
      )

      }
      </section>

      {/* Danh sách đề thi */}
      <section className="flex flex-col py-5 px-8 gap-5 border-2 border-gray-200 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">Danh sách đề thi</h1>
        <div className="flex flex-row gap-4 w-full px-6 py-3">
          <SearchBar
            text="Tìm kiếm đề thi theo ID hoặc tên đề thi"
            focusBorderColor="focus:ring-gray-400"
            value={searchExamQuery}
            onChange={(e) => {
              setSearchExamQuery(e.target.value);
              setCurrentPageExams(1);
            }}
          />
          <Button
            text="Thêm mới"
            variant="primary"
            size="sm"
            icon={<FontAwesomeIcon icon="fa-solid fa-plus" />}
            onClick={() => setShowAddExam(true)}
          />
        </div>
        {loading ? (
          <div className="text-center py-4 text-gray-600 font-semibold text-lg">Đang tải...</div>
        ) : (
          <>
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
                {currentExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-100">
                    <td className="px-4 py-4 text-gray-600 font-semibold">{exam.id}</td>
                    <td className="px-4 py-4 font-bold text-[#2C99E2]">{exam.testName}</td>
                    <td className="px-4 py-4 text-gray-600 font-semibold">{exam.numberOfQuestion}</td>
                    <td className="px-4 py-4 flex gap-2 items-center justify-center">
                      <Button
                        text="Chỉnh sửa"
                        variant="default"
                        size="sm"
                        icon={<FontAwesomeIcon icon="fa-solid fa-pencil" />}
                        onClick={() => handleEditClick(exam)}
                      />
                      <Button
                        text="Xóa"
                        variant="delete"
                        size="sm"
                        hoverBg="hover:bg-red-700"
                        icon={<FontAwesomeIcon icon="fa-solid fa-trash" />}
                        onClick={() => handleDeleteClick(exam)}
                      />
                    </td>
                  </tr>
                ))}
                {currentExams.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-600 font-semibold py-4">
                      Không tìm thấy đề thi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {totalExams > 0 && (
              <div className="flex justify-between items-center p-4">
                <span className="text-sm text-gray-600 font-semibold">
                  Hiển thị từ {startIndexExams + 1} đến {Math.min(endIndexExams, totalExams)} trong số {totalExams} đề thi
                </span>
                <Pagination
                  currentPage={currentPageExams}
                  totalPages={totalExamPages}
                  onPageChange={(page) => setCurrentPageExams(page)}
                />
              </div>
            )}
          </>
        )}
      </section>

      {/* Kết quả làm bài */}
      <section className="flex flex-col py-5 px-8 gap-5 border-2 border-gray-200 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">Kết quả làm bài</h1>
        <div className="flex justify-center py-3">
          <div className="w-full max-w-3xl">
            <SearchBar
              text="Tìm kiếm kết quả theo ID hoặc email"
              focusBorderColor="focus:ring-gray-400"
              value={searchResultQuery}
              onChange={(e) => {
                setSearchResultQuery(e.target.value);
                setCurrentPageResults(1);
              }}
            />
          </div>
        </div>
        {loading ? (
          <div className="text-center py-4 text-gray-600 font-semibold text-lg">Đang tải...</div>
        ) : (
          <>
            <table className="w-full min-w-[600px] text-center border-2 border-gray-300 rounded-2xl overflow-hidden border-separate border-spacing-0">
              <thead className="bg-gray-200">
                <tr className="text-black font-bold">
                  <th className="py-3 px-4">Result ID</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Điểm số</th>
                  <th className="py-3 px-4">Ngày nộp bài</th>
                  <th className="py-3 px-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-100">
                    <td className="px-4 py-4 text-gray-600 font-semibold">{result.id}</td>
                    <td className="px-4 py-4 text-gray-600 font-semibold">{result.email}</td>
                    <td className="px-4 py-4 font-bold text-[#2C99E2]">{result.score || 'N/A'} / 990</td>
                    <td className="px-4 py-4 text-gray-600 font-semibold">{result.dateTest || 'N/A'}</td>
                    <td className="px-4 py-4 flex items-center justify-center">
                      <Button
                        text="Xem Chi tiết"
                        variant="primary"
                        size="sm"
                        icon={<FontAwesomeIcon icon="fa-solid fa-eye" />}
                        onClick={() => handleViewResultClick(result)}
                      />
                    </td>
                  </tr>
                ))}
                {currentResults.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-600 font-semibold py-4">
                      Không tìm thấy kết quả.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {totalResults > 0 && (
              <div className="flex justify-between items-center p-4">
                <span className="text-sm text-gray-600 font-semibold">
                  Hiển thị từ {startIndexResults + 1} đến {Math.min(endIndexResults, totalResults)} trong số {totalResults} kết quả
                </span>
                <Pagination
                  currentPage={currentPageResults}
                  totalPages={totalResultPages}
                  onPageChange={(page) => setCurrentPageResults(page)}
                />
              </div>
            )}
          </>
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
        description={`Bạn có chắc chắn muốn xóa đề thi '${examToDelete?.testName || 'N/A'}'? Hành động này không thể hoàn tác.`}
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

      {/* Xem chi tiết kết quả */}
      <DetailExamResult
        show={showDetailResult}
        onClose={() => {
          setShowDetailResult(false);
          setSelectedResult(null);
        }}
        result={selectedResult}
      />
    </main>
  );
};

export default ManageExam;