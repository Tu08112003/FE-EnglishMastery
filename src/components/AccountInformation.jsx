import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

const AccountInformation = () => {
  const [ischeck, setIsCheck] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const inputStyle = "w-full px-3 py-1.5 text-[#49719C] font-medium placeholder-[#49719C] border border-[#CEDBE8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE] focus:border-[#7BA4CE]"

  return (
    <main className="flex flex-col items-center gap-8 py-8 px-4">
      {ischeck ? (
          <form className="w-full max-w-2xl flex flex-col gap-4 border-2 border-gray-200 px-8 py-4 rounded-xl shadow-md bg-white">
            <h1 className="text-2xl font-bold text-center text-black">Thông tin cá nhân</h1>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-gray-600">Tên người dùng</label>
              <input type="text" className={inputStyle} value="Anhdaden" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-gray-600">Email</label>
              <input type="text" className={inputStyle + " bg-[#F3F4F6]"} value="andaden@gmail.com" readOnly />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-gray-600">Loại người dùng</label>
              <input type="text" className={inputStyle + " bg-[#F3F4F6]"} value="Student" readOnly />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-gray-600">Ngày cập nhật</label>
              <input type="text" className={inputStyle + " bg-[#F3F4F6]"} value="20/05/2025" readOnly />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-gray-600">Ngày tạo tài khoản</label>
              <input type="text" className={inputStyle + " bg-[#F3F4F6]"} value="20/04/2025" readOnly />
            </div>

            <div className="flex justify-end gap-3">
              <Button text="Hủy" variant="default" size="sm" onClick={() => setIsCheck(false)} />
              <Button text="Lưu" variant="primary" size="sm" />
            </div>
          </form>
      ) : (
        <div className="w-full max-w-2xl border-2 border-gray-200 rounded-xl px-8 py-6 flex flex-col gap-6 shadow-sm bg-white">
          <h1 className="text-2xl text-center font-bold text-black">Thông tin cá nhân</h1>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="font-semibold text-gray-600">Tên người dùng</p>
              <p className="font-bold">Anhdaden</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Email</p>
              <p className="font-bold">anhdaden@gmail.com</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Loại người dùng</p>
              <p className="font-bold">Student</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Ngày tạo</p>
              <p className="font-bold">20/04/2025</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Ngày cập nhật</p>
              <p className="font-bold">20/05/2025</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button text="Chỉnh sửa" variant="primary" size="sm" onClick={() => setIsCheck(true)} />
          </div>
        </div>
      )}

      <form className="w-full max-w-2xl flex flex-col gap-4 border-2 border-gray-200 px-8 py-6 rounded-xl shadow-md bg-white">
        <h1 className="text-2xl font-bold text-center text-black">Đổi mật khẩu</h1>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-600">Mật khẩu hiện tại</label>
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

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-600">Mật khẩu mới</label>
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

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-600">Xác nhận mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu xác nhận"
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

        <div className="flex justify-end">
          <Button text="Đổi mật khẩu" variant="primary" size="sm" />
        </div>
      </form>
    </main>
  )
}

export default AccountInformation
