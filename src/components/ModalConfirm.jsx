import React from 'react'
import Button from './Button.jsx'
const ModalConfirm = ({ show, onClose, title, description, onCancel, onConfirm }) => {
    if (!show) return null
    return (
    <div 
        onClick={onClose}
        className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/30 z-10 py-4 px-4 sm:px-6"
    >
      <div className="bg-white w-full max-w-xl flex flex-col gap-3 border-2 border-gray-200 rounded-lg p-6 sm:p-8 shadow-xl ">
        <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
        <span className="text-sm sm:text-base font-semibold text-gray-600 ">{description}</span>
        <div className="flex justify-end gap-4">
          <Button text="Hủy" variant="default" size="sm" onClick={onCancel} />
          <Button text="Xóa" variant="delete" size="sm" textColor="text-white" hoverBg="bg-red-600" onClick={onConfirm} />
        </div>
      </div>
    </div>
    );
  };
  
export default ModalConfirm