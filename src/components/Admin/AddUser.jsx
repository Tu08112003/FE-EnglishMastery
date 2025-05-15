import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button.jsx";
import ModalWrapper from "../ModalWrapper.jsx";
import { useDispatch} from "react-redux";
import { fetchAddUser, fetchAllUsers} from "../../redux/slice/adminSlice.js";
import { validateAddUser } from "../../utils/validate.js";
import { toast } from "react-toastify";
const AddUser = ({ show, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    const errors = validateAddUser(updatedFormData);
    setFormErrors(errors);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateAddUser(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      await dispatch(
        fetchAddUser({
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        })
      ).unwrap();
      toast.success("Thêm người dùng thành công");
      setFormData({
        userName: "",
        email: "",
        password: "",
        role: "USER",
      });
      dispatch(fetchAllUsers());
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi thêm người dùng");
    }
  };
  return (
    <ModalWrapper show={show} onClose={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto bg-white border-2 border-gray-200 shadow-lg rounded-2xl px-6 sm:px-4 pt-6 pb-6 max-h-[95vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex flex-col items-center p-3">
          <div className="flex items-center justify-between w-full mb-1">
            <h2 className="text-xl font-medium text-center sm:text-2xl">
              Thêm người dùng
            </h2>
            <button
              onClick={onClose}
              type="button"
              className="flex items-center justify-center w-8 h-8 hover:bg-gray-200 hover:rounded-lg transition-all duration-200 ease-in-out"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                size="lg"
                style={{ color: "#565E6C" }}
              />
            </button>
          </div>
          <p className="flex justify-start w-full text-sm text-muted-foreground text-gray-600 font-medium">
            Thêm mới người dùng vào hệ thống
          </p>
        </div>
        {/* Tên người dùng */}
        <div className="flex flex-col space-y-3 items-center justify-center w-full mb-4 p-3">
          <div className="flex w-full flex-col gap-2">
            <label className="w-full font-semibold">Tên người dùng</label>
            <input
              type="text"
              value={formData.userName}
              name="userName"
              onChange={handleChange}
              className={`w-full text-gray-600 font-medium px-4 py-2.5 border ${
                formErrors.userName
                  ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              } rounded-lg `}
            />
            {formErrors.userName && (
              <div className="text-sm text-red-500 font-medium">
                {formErrors.userName}
              </div>
            )}
          </div>
          {/* Email */}
          <div className="flex w-full flex-col gap-2">
            <label className="w-full  font-semibold">Email</label>
            <input
              type="text"
              value={formData.email}
              onChange={handleChange}
              name="email"
              className={`w-full text-gray-600 font-medium px-4 py-2.5 border ${
                formErrors.email
                   ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              } rounded-lg `}
            />
            {formErrors.email && (
              <div className="text-sm text-red-500 font-medium">
                {formErrors.email}
              </div>
            )}
          </div>
          {/* Mật khẩu */}
          <div className="flex w-full flex-col gap-2">
            <label className="w-full  font-semibold">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                name="password"
                className={`w-full px-4 py-2.5 text-gray-600 font-medium  border ${
                  formErrors.password
                    ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                } rounded-lg `}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon="fa-solid fa-eye" size="sm" />
                ) : (
                  <FontAwesomeIcon icon="fa-solid fa-eye-slash" size="sm" />
                )}
              </span>
            </div>
            {formErrors.password && (
              <div className="text-sm text-red-500 font-medium">
                {formErrors.password}
              </div>
            )}
          </div>
          {/* Loại người dùng */}
          <div className="flex w-full flex-col gap-2">
            <label className="w-full font-semibold">Loại người dùng</label>
            <select className="flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400">
              <option value="user">User</option>
            </select>
          </div>
        </div>
        {/* Button*/}
        <div className="flex gap-4 justify-end p-3">
          <Button text="Hủy" variant="default" size="sm" onClick={onClose} />
          <Button text="Lưu" variant="primary" size="sm" type="submit"/>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddUser;
