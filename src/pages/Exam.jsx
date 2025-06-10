import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ExamCard from "../components/Exam/ExamCard.jsx";
import PreviewExam from "../components/Exam/PreviewExam.jsx";
import {
  fetchAllExamsByYear,
  fetchExamsByYear,
  setSelectedYear,
} from "../redux/slice/examSlice.js";
import Pagination from "../components/Pagination.jsx";

const Exam = () => {
  const [previewExam, setPreviewExam] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 8;
  const dispatch = useDispatch();
  const {
    exams = [],
    examYears = [],
    loading,
    error,
    selectedYear,
  } = useSelector((state) => state.exam || {});

  useEffect(() => {
    dispatch(fetchAllExamsByYear());
  }, [dispatch]);

  useEffect(() => {
    if (examYears.length > 0 && !selectedYear) {
      const firstYear = examYears[0];
      dispatch(setSelectedYear(firstYear));
      dispatch(fetchExamsByYear(firstYear));
    }
  }, [examYears, selectedYear, dispatch]);

  const handleYearClick = (year) => {
    if (year !== selectedYear) {
      dispatch(setSelectedYear(year));
      dispatch(fetchExamsByYear(year));
      setCurrentPage(1);
      setSearchQuery("");
    }
  };

  // Sử dụng useMemo để các giá trị được tính toán chỉ khi dependencies thay đổi
  const sortedExams = useMemo(() => {
    return [...exams].sort((a, b) => a.testId - b.testId);
  }, [exams]);

  const filteredExams = useMemo(() => {
    return sortedExams.filter((exam) =>
      exam.testName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedExams, searchQuery]);

  // Tính toán tổng số trang và danh sách đề thi đã đánh dấu
  const { totalPages, markedExams } = useMemo(() => {
    const totalExams = filteredExams.length;
    const totalPages = Math.ceil(totalExams / examsPerPage);

    // Đánh dấu đề thi khóa cho người dùng miễn phí
    const markedExams = filteredExams.map((exam) => ({
      ...exam,
      locked: exam.testId === null,
    }));

    return { totalPages, markedExams };
  }, [filteredExams, examsPerPage]);

  // Tính toán danh sách đề thi hiển thị cho trang hiện tại
  const displayExams = useMemo(() => {
    const startIndex = (currentPage - 1) * examsPerPage;
    const endIndex = startIndex + examsPerPage;
    return markedExams.slice(startIndex, endIndex);
  }, [markedExams, currentPage, examsPerPage]);

  const handleShowPreviewExam = (exam) => {
    if (!exam.locked) {
      setSelectedExam(exam);
      setPreviewExam(true);
    }
  };

  const handleClosePreviewExam = () => {
    setPreviewExam(false);
    setSelectedExam(null);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 sm:flex-col">
      {/* Header */}
      <section className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">Thư viện đề thi TOEIC</h1>

        <div className="flex gap-3 flex-wrap">
          {examYears.map((item) => (
            <span
              key={item}
              className={`
                flex items-center justify-center px-4 py-2
                rounded-lg cursor-pointer select-none text-sm font-medium
                transition duration-300 ease-in-out
                ${
                  selectedYear === item
                    ? "bg-[#2C99E2] text-white border-[#2C99E2]"
                    : "border-2 border-gray-200 hover:border-[#2C99E2]"
                }
              `}
              onClick={() => handleYearClick(item)}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Tìm kiếm */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-6">
          <SearchBar
            text="Nhập từ khóa bạn muốn tìm kiếm: tên đề, năm..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            text="Tìm kiếm"
            variant="primary"
            size="sm"
            onClick={handleSearch}
          />
        </div>
      </section>

      {/* Content */}
      <section className="space-y-6">
        {loading ? (
          <p className="text-lg font-semibold text-center text-gray-600 py-4">
            Đang tải đề thi...
          </p>
        ) : error ? (
          <p className="text-red-500 text-center font-semibold text-lg">
            {error}
          </p>
        ) : filteredExams.length === 0 && searchQuery ? (
          <p className="font-semibold text-center text-gray-600">
            Không tìm thấy thông tin đề thi "{searchQuery}".
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 justify-items-center items-center gap-6">
              {displayExams.map((exam, index) => (
                <ExamCard
                  key={`${exam.testId}-${currentPage}-${index}`}
                  title={exam.testName || `Exam ${exam.testId}`}
                  onClick={() => handleShowPreviewExam(exam)}
                  locked={exam.locked}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </section>

      {/* PreviewExam (Modal) */}
      {previewExam && selectedExam && (
        <PreviewExam
          title={selectedExam.testName || "Không tìm thấy đề thi"}
          examId={selectedExam.testId}
          onClose={handleClosePreviewExam}
        />
      )}
    </main>
  );
};

export default Exam;
