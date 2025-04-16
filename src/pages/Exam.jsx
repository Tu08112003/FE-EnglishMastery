import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../components/Button.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ExamCard from '../components/Exam/ExamCard.jsx'
import Pagination from '../components/Pagination.jsx'
import PreviewExam from '../components/Exam/PreviewExam.jsx'

const Exam = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3
  const listExams = ['2024', '2023', '2022', 'New economy']
  const [selectedExam, setSelectedExam] = useState(null)

  const [previewTitle, setPreviewTitle] = useState(null)

  return (
    <main className='container mx-auto px-4 py-6 sm:flex-col'>
      {/* Header */}
      <section className='flex flex-col space-y-6'>
        <h1 className='text-3xl font-bold'>Thư viện đề thi TOEIC</h1>

        <div className="flex gap-3 flex-wrap">
          {listExams.map((item, index) => (
            <span
              key={index}
              className={`
                flex items-center justify-center px-4 py-2
                rounded-lg cursor-pointer select-none text-sm font-medium
                transition duration-300 ease-in-out
                ${selectedExam === item
                  ? 'bg-[#2C99E2] text-white border-[#2C99E2]'
                  : 'border-2 border-gray-200 hover:border-[#2C99E2]'}
              `}
              onClick={() => setSelectedExam(item)}
            >
              {item}
            </span>
          ))}
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-5 mb-6'>
          <SearchBar text="Nhập từ khóa bạn muốn tìm kiếm: tên đề, ..." />
          <Button
            text="Tìm kiếm"
            variant='primary'
            size='sm'
          />
        </div>
      </section>

      {/* Content */}
      <section className='space-y-6'>
        <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 justify-items-center items-center gap-6'>
          <ExamCard title="New economy" onClick={() => setPreviewTitle("New economy")} />
          <ExamCard title="Practice Test 1 2024" onClick={() => setPreviewTitle("Practice Test 1 2024")} />
          <ExamCard title="Practice Test 2 2024" onClick={() => setPreviewTitle("Practice Test 2 2024")} />
          <ExamCard title="Practice Test 3 2024" onClick={() => setPreviewTitle("Practice Test 3 2024")} />
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </section>

      {/* PreviewExame (Modal) */}
      {previewTitle && (
        <PreviewExam
          title={previewTitle}
          onClose={() => setPreviewTitle(null)}
        />
      )}
    </main>
  )
}

export default Exam
