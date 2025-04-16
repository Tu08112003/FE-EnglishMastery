import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../components/Button.jsx'
import ModalWrapper from '../ModalWrapper.jsx'
const AddVocabulary = ({ show, onClose }) => {

  return (
    <ModalWrapper show={show} onClose={onClose}>
      <form 
        className="w-full max-w-2xl mx-auto bg-white border-2 border-gray-200 shadow-lg rounded-2xl px-6 sm:px-4 pt-6 pb-6 max-h-[95vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex flex-col items-center p-3">
          <div className='flex items-center justify-between w-full mb-1'>
            <h2 className="text-xl font-medium text-center sm:text-2xl">Thêm từ vựng</h2>
            <button onClick={onClose} type="button" className='flex items-center justify-center w-8 h-8 hover:bg-gray-200 hover:rounded-lg transition-all duration-200 ease-in-out'>
              <FontAwesomeIcon icon="fa-solid fa-xmark" size="lg" style={{ color: "#565E6C" }} />
            </button>
          </div>
          <p className="flex justify-start w-full text-sm text-muted-foreground text-gray-600 font-medium">Nhập thông tin từ vựng bạn muốn lưu trữ và học tập</p>
        </div>
        {/* Từ vựng */}
        <div className='flex flex-col space-y-3 items-center justify-center w-full mb-4 p-3'>
          <div className='flex w-full flex-col sm:flex-row items-start sm:items-center gap-2'>
            <label className='w-full sm:w-1/5 font-semibold'>Từ vựng</label>
            <input type="text" className='flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400' />
          </div>
        {/* Nghĩa */}
          <div className='flex w-full flex-col sm:flex-row items-start sm:items-center gap-2'>
            <label className='w-full sm:w-1/5 font-semibold'>Nghĩa</label>
            <input type="text" className='flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400' />
          </div>
        {/* Phát âm */}
          <div className='flex w-full flex-col sm:flex-row items-start sm:items-center gap-2'>
            <label className='w-full sm:w-1/5 font-semibold'>Phát âm</label>
            <input type="text" className='flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400' />
          </div>
        {/* Ví dụ */}
          <div className='flex w-full flex-col sm:flex-row items-start sm:items-center gap-2'>
            <label className='w-full sm:w-1/5 font-semibold'>Ví dụ</label>
            <textarea rows={5} className='flex-1 w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400' />
          </div>
        {/* Chủ đề */}
          <div className='flex w-full flex-col sm:flex-row items-start sm:items-center gap-2'>
            <label className='w-full sm:w-1/5 font-semibold'>Chủ đề</label>
            <select className='flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400'>
              <option value="">-- Chọn chủ đề --</option>
              <option value="work">Công việc</option>
              <option value="life">Cuộc sống</option>
              <option value="study">Học tập</option>
            </select>
          </div>
        {/* Trạng thái */}
          <div className='flex w-full flex-col sm:flex-row items-start sm:items-center gap-2'>
            <label className='w-full sm:w-1/5 font-semibold'>Trạng thái</label>
            <select className='flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400'>
              <option value="">-- Chọn trạng thái --</option>
              <option value="learning">Đang học</option>
              <option value="learned">Đã học</option>
            </select>
          </div>
        {/* Ghi chú */}
          <div className='flex w-full flex-col sm:flex-row items-start sm:items-center gap-2'>
            <label className='w-full sm:w-1/5 font-semibold'>Ghi chú</label>
            <textarea rows={5} className='flex-1 p-3 w-full border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400' />
          </div>
        </div>
        {/* Button*/}
        <div className='flex gap-4 justify-end p-3'>
          <Button text="Hủy" variant="default" size="sm" onClick={onClose} />
          <Button text="Lưu" variant="primary" size="sm" />
        </div>
      </form>
    </ModalWrapper>

  )
}

export default AddVocabulary
