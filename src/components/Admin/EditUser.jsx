import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalWrapper from '../ModalWrapper';
import Button from '../../components/Button.jsx';

const EditUser = ({ show, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    type: user?.type || 'User',
    name: user?.name || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        type: user.type || 'User',
        name: user.name || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Tên người dùng không được để trống');
      return;
    }
    if (window.confirm('Bạn có chắc muốn lưu thay đổi?')) {
      onSave({
        ...user,
        ...formData,
        updatedAt: new Date().toLocaleDateString('en-GB'), // Cập nhật ngày
      });
      onClose();
    }
  };

  return (
    <ModalWrapper show={show} onClose={onClose}>
      <form
        className="w-full max-w-2xl mx-auto flex flex-col bg-white border-2 border-gray-200 shadow-lg rounded-2xl px-6 sm:px-4 pt-6 pb-6 max-h-[95vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col items-center p-3">
          <div className="flex items-center justify-between w-full mb-1">
            <h2 className="text-xl font-medium text-center sm:text-2xl">
              Chỉnh sửa người dùng
            </h2>
            <button
              onClick={onClose}
              type="button"
              className="flex items-center justify-center w-8 h-8 hover:bg-gray-200 hover:rounded-lg transition-all duration-200 ease-in-out"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                size="lg"
                style={{ color: '#565E6C' }}
              />
            </button>
          </div>
          <p className="flex justify-start w-full text-sm text-muted-foreground text-gray-600 font-medium">
            Cập nhật thông tin người dùng {user?.id}
          </p>
        </div>

        <div className="w-full max-w-2xl px-8 py-6 flex flex-col gap-6 bg-white">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="font-semibold text-gray-600">ID</p>
              <p className="font-bold">{user?.id}</p>
            </div>
            <div className='space-y-2'>
              <p className="font-semibold text-gray-600">Tên người dùng</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-600">Email</p>
              <p className="font-bold">{user?.email}</p>
            </div>
            <div className='space-y-2'>
              <p className="font-semibold text-gray-600">Loại người dùng</p>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button text="Hủy" variant="default" size="sm" onClick={onClose} />
            <Button
              text="Lưu"
              variant="primary"
              size="sm"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditUser;