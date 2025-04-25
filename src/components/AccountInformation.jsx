import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../redux/slice/userSlice';
import Button from './Button';
import { toast } from 'react-toastify';
import { updateUser } from '../service/userService';

const AccountInformation = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editedUserName, setEditedUserName] = useState('');
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (userInfo) {
      setEditedUserName(userInfo.userName);
    }
  }, [userInfo]);

  const inputStyle =
    'w-full px-3 py-1.5 text-[#49719C] font-medium placeholder-[#49719C] border border-[#CEDBE8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE] focus:border-[#7BA4CE]';

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleUpdateUser = async () => {
    try {
      const res = await updateUser({ userName: editedUserName });
      if (res && res.data) {
        toast.success('Cập nhật tên người dùng thành công!');
        dispatch(fetchUserInfo());
        setIsCheck(false);
      } else {
        toast.error('Cập nhật thất bại! Vui lòng thử lại.');
      }
    } catch (error) {
      console.log('Error:', error)
      toast.error(error.message || 'Lỗi khi cập nhật tên');
    }
  };

  return (
    <main className="flex flex-col items-center gap-8 py-8 px-4">
      {loading ? (
        <p className="font-semibold text-gray-600 text-center">Đang tải thông tin...</p>
      ) : userInfo ? (
        <>
          {isCheck ? (
            <form className="w-full max-w-2xl flex flex-col gap-4 border-2 border-gray-200 px-8 py-4 rounded-xl shadow-md bg-white">
              <h1 className="text-2xl font-bold text-center text-black">Thông tin cá nhân</h1>
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-600">Tên người dùng</label>
                <input
                  type="text"
                  className={inputStyle}
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-600">Email</label>
                <input
                  type="text"
                  className={inputStyle + ' bg-[#F3F4F6]'}
                  value={userInfo.email}
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-600">Loại người dùng</label>
                <input
                  type="text"
                  className={inputStyle + ' bg-[#F3F4F6]'}
                  value="User"
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-600">Ngày tạo tài khoản</label>
                <input
                  type="text"
                  className={inputStyle + ' bg-[#F3F4F6]'}
                  value={formatDate(userInfo.createAt)}
                  readOnly
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button text="Hủy" variant="default" size="sm" onClick={() => setIsCheck(false)} />
                <Button text="Lưu" variant="primary" size="sm" onClick={handleUpdateUser} />
              </div>
            </form>
          ) : (
            <div className="w-full max-w-2xl border-2 border-gray-200 rounded-xl px-8 py-6 flex flex-col gap-6 shadow-sm bg-white">
              <h1 className="text-2xl text-center font-bold text-black">Thông tin cá nhân</h1>
              <div className="grid grid-cols-2 gap-4 px-5">
                <div>
                  <p className="font-semibold text-gray-600">Tên người dùng</p>
                  <p className="font-bold">{userInfo.userName}</p>
                </div>
                <div className="pl-6">
                  <p className="font-semibold text-gray-600">Email</p>
                  <p className="font-bold">{userInfo.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Loại người dùng</p>
                  <p className="font-bold">User</p>
                </div>
                <div className="pl-6">
                  <p className="font-semibold text-gray-600">Ngày tạo tài khoản</p>
                  <p className="font-bold">{formatDate(userInfo.createAt)}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  text="Chỉnh sửa"
                  variant="primary"
                  size="sm"
                  onClick={() => setIsCheck(true)}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Không thể tải thông tin người dùng.</p>
      )}

      {/* Đổi mật khẩu */}
      <form className="w-full max-w-2xl flex flex-col gap-4 border-2 border-gray-200 px-8 py-6 rounded-xl shadow-md bg-white">
        <h1 className="text-2xl font-bold text-center text-black">Đổi mật khẩu</h1>

        {['Mật khẩu hiện tại', 'Mật khẩu mới', 'Xác nhận mật khẩu'].map((label, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className="font-semibold text-gray-600">{label}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập ít nhất 8 ký tự"
                className={inputStyle}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <Button text="Đổi mật khẩu" variant="primary" size="sm" />
        </div>
      </form>
    </main>
  );
};

export default AccountInformation;
