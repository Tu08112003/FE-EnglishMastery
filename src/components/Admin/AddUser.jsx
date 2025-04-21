import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../components/Button.jsx'
import ModalWrapper from '../ModalWrapper.jsx'
const AddUser = ({show, onClose}) => {
  return (
    <ModalWrapper show={show} onClose={onClose}>
      <form 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl mx-auto bg-white border-2 border-gray-200 shadow-lg rounded-2xl px-6 sm:px-4 pt-6 pb-6 max-h-[95vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex flex-col items-center p-3">
          <div className='flex items-center justify-between w-full mb-1'>
            <h2 className="text-xl font-medium text-center sm:text-2xl">Thêm người dùng</h2>
            <button onClick={onClose} type="button" className='flex items-center justify-center w-8 h-8 hover:bg-gray-200 hover:rounded-lg transition-all duration-200 ease-in-out'>
              <FontAwesomeIcon icon="fa-solid fa-xmark" size="lg" style={{ color: "#565E6C" }} />
            </button>
          </div>
          <p className="flex justify-start w-full text-sm text-muted-foreground text-gray-600 font-medium">Thêm mới người dùng vào hệ thống</p>
        </div>
        {/* Tên người dùng */}
        <div className='flex flex-col space-y-3 items-center justify-center w-full mb-4 p-3'>
          <div className='flex w-full flex-col gap-2'>
            <label className='w-full font-semibold'>Tên người dùng</label>
            <input type="text" className='flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400' />
          </div>
        {/* Email */}
          <div className='flex w-full flex-col gap-2'>
            <label className='w-full  font-semibold'>Email</label>
            <input type="email" className='flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400' />
          </div>
        {/* Mật khẩu */}
          <div className='flex w-full flex-col gap-2'>
            <label className='w-full  font-semibold'>Mật khẩu</label>
            <input type="text" className='flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400' />
          </div>
        {/* Loại người dùng */}
          <div className='flex w-full flex-col gap-2'>
            <label className='w-full font-semibold'>Loại người dùng</label>
            <select className='flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400'>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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

export default AddUser