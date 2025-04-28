import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/slice/userSlice";
import Button from "./Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { updateUser } from '../service/userService';
import formatDate from "../utils/formatDate";
import {
  validateUpdateInforUser,
  validateChangePassword,
} from "../utils/validate";

const AccountInformation = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userFormData, setUserFormData] = useState({ userName: "" });
  const [passwordFormData, setPasswordFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [userFormErrors, setUserFormErrors] = useState({});
  const [passwordFormErrors, setPasswordFormErrors] = useState({});
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
      setUserFormData({ userName: userInfo.userName });
    }
  }, [userInfo]);

  const inputStyle =
    "w-full px-3 py-1.5 text-[#49719C] font-medium placeholder-[#49719C] border border-[#CEDBE8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE] focus:border-[#7BA4CE]";

 

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...userFormData, [name]: value };
    setUserFormData(updatedFormData);
    const errors = validateUpdateInforUser(updatedFormData);
    setUserFormErrors(errors);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...passwordFormData, [name]: value };
    setPasswordFormData(updatedFormData);
    const errors = validateChangePassword(updatedFormData);
    setPasswordFormErrors(errors);
  };

  // const handleUpdateUser = async () => {
  //   const errors = validateUpdateInforUser(userFormData);
  //   setUserFormErrors(errors);

  //   if (Object.keys(errors).length === 0) {
  //     try {
  //       const res = await updateUser({ userName: userFormData.userName });
  //       if (res && res.data) {
  //         toast.success('Cập nhật tên người dùng thành công!');
  //         dispatch(fetchUserInfo());
  //         setIsCheck(false);
  //       } else {
  //         toast.error('Cập nhật tên người dùng thất bại! Vui lòng thử lại.');
  //       }
  //     } catch (error) {
  //       console.log('Error:', error);
  //       toast.error(error.message || 'Lỗi khi cập nhật tên');
  //     }
  //   }
  // };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const errors = validateChangePassword(passwordFormData);
    setPasswordFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // Giả sử bạn có API updatePassword
        // const res = await updatePassword(passwordFormData);
        // if (res && res.data) {
        toast.success("Đổi mật khẩu thành công!");
        setPasswordFormData({
          password: "",
          newPassword: "",
          confirmPassword: "",
        });
        // } else {
        //   toast.error('Đổi mật khẩu thất bại! Vui lòng thử lại.');
        // }
      } catch (error) {
        console.log("Error:", error);
        toast.error(error.message || "Lỗi khi đổi mật khẩu");
      }
    }
  };

  return (
    <main className="flex flex-col items-center gap-8 py-8 px-4">
      {loading ? (
        <p className="font-semibold text-gray-600 text-center">
          Đang tải thông tin...
        </p>
      ) : userInfo ? (
        <>
          {isCheck ? (
            <form className="w-full max-w-2xl flex flex-col gap-4 border-2 border-gray-200 px-8 py-4 rounded-xl shadow-md bg-white">
              {/* Header */}
              <h1 className="text-2xl font-bold text-center text-black">
                Thông tin cá nhân
              </h1>
              {/* Tên người dùng */}
              <div className="flex flex-col gap-1">
                <label
                  className="font-semibold text-gray-600"
                  htmlFor="userName"
                >
                  Tên người dùng
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  className={`${inputStyle} ${
                    userFormErrors.userName
                      ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      : "border-[#CEDBE8]"
                  }`}
                  value={userFormData.userName}
                  onChange={handleUserChange}
                />
                {userFormErrors.userName && (
                  <div className="text-sm text-red-500 font-medium">
                    {userFormErrors.userName}
                  </div>
                )}
              </div>
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-600">Email</label>
                <input
                  type="text"
                  className={inputStyle + " bg-[#F3F4F6]"}
                  value={userInfo.email}
                  readOnly
                />
              </div>
              {/* Loại người dùng */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-600">
                  Loại người dùng
                </label>
                <input
                  type="text"
                  className={inputStyle + " bg-[#F3F4F6]"}
                  value="User"
                  readOnly
                />
              </div>
              {/* Ngày tạo tài khoản */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-600">
                  Ngày tạo tài khoản
                </label>
                <input
                  type="text"
                  className={inputStyle + " bg-[#F3F4F6]"}
                  value={formatDate(userInfo.createAt)}
                  readOnly
                />
              </div>
              {/* Button */}
              <div className="flex justify-end gap-3">
                <Button
                  text="Hủy"
                  variant="default"
                  size="sm"
                  onClick={() => setIsCheck(false)}
                />
                <Button
                  text="Lưu"
                  variant="primary"
                  size="sm"
                  // onClick={handleUpdateUser}
                />
              </div>
            </form>
          ) : (
            <div className="w-full max-w-2xl border-2 border-gray-200 rounded-xl px-8 py-6 flex flex-col gap-6 shadow-sm bg-white">
              <h1 className="text-2xl text-center font-bold text-black">
                Thông tin cá nhân
              </h1>
              <div className="grid grid-cols-2 gap-4 px-5">
                {/* Tên người dùng */}
                <div>
                  <p className="font-semibold text-gray-600">Tên người dùng</p>
                  <p className="font-bold">{userInfo.userName}</p>
                </div>
                {/* Email */}
                <div className="pl-6">
                  <p className="font-semibold text-gray-600">Email</p>
                  <p className="font-bold">{userInfo.email}</p>
                </div>
                {/* Loại người dùng */}
                <div>
                  <p className="font-semibold text-gray-600">Loại người dùng</p>
                  <p className="font-bold">User</p>
                </div>
                {/* Ngày tạo tài khoản */}
                <div className="pl-6">
                  <p className="font-semibold text-gray-600">
                    Ngày tạo tài khoản
                  </p>
                  <p className="font-bold">{formatDate(userInfo.createAt)}</p>
                </div>
              </div>
              {/* Button */}
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
        <p className="font-semibold text-gray-600">Không thể tải thông tin người dùng.</p>
      )}

      {/* Đổi mật khẩu */}
      <form
        onSubmit={handleChangePassword}
        className="w-full max-w-2xl flex flex-col gap-4 border-2 border-gray-200 px-8 py-6 rounded-xl shadow-md bg-white"
      >
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-black">
          Đổi mật khẩu
        </h1>
        {/* Mật khẩu hiện tại */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-600" htmlFor="password">
            Mật khẩu hiện tại
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập ít nhất 8 ký tự"
              className={`${inputStyle} ${
                passwordFormErrors.password
                  ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  : "border-[#CEDBE8]"
              }`}
              value={passwordFormData.password}
              onChange={handlePasswordChange}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {passwordFormErrors.password && (
            <div className="text-sm text-red-500 font-medium mt-1">
              {passwordFormErrors.password}
            </div>
          )}
        </div>
        {/* Mật khẩu mới */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-600" htmlFor="newPassword">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập ít nhất 8 ký tự"
              className={`${inputStyle} ${
                passwordFormErrors.newPassword
                  ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  : "border-[#CEDBE8]"
              }`}
              value={passwordFormData.newPassword}
              onChange={handlePasswordChange}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {passwordFormErrors.newPassword && (
            <div className="text-sm text-red-500 font-medium mt-1">
              {passwordFormErrors.newPassword}
            </div>
          )}
        </div>
        {/* Xác nhận mật khẩu */}
        <div className="flex flex-col gap-1">
          <label
            className="font-semibold text-gray-600"
            htmlFor="confirmPassword"
          >
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập ít nhất 8 ký tự"
              className={`${inputStyle} ${
                passwordFormErrors.confirmPassword
                  ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  : "border-[#CEDBE8]"
              }`}
              value={passwordFormData.confirmPassword}
              onChange={handlePasswordChange}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {passwordFormErrors.confirmPassword && (
            <div className="text-sm text-red-500 font-medium mt-1">
              {passwordFormErrors.confirmPassword}
            </div>
          )}
        </div>
        {/* Button */}
        <div className="flex justify-end">
          <Button
            text="Đổi mật khẩu"
            variant="primary"
            size="sm"
            type="submit"
          />
        </div>
      </form>
      <ToastContainer />
    </main>
  );
};

export default AccountInformation;
