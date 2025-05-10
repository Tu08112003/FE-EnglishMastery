import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import { validateLogin } from "../utils/validate.js";
import { authLogin } from "../service/authService.js";
import { useDispatch} from "react-redux";
import { loginSuccess } from "../redux/slice/authSlice";
import {toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    const errors = validateLogin(updatedFormData);
    setFormErrors(errors);
  };

  const handleLogin = async () => {
    const errors = validateLogin(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await authLogin({
          email: formData.email,
          password: formData.password,
        });
        console.log("API Response:", res);

        if (res && res.data) {
          const { accessToken, refreshToken, role } = res.data;

          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          localStorage.setItem("role", role);
          dispatch(loginSuccess({ role }));
          console.log(role)
          toast.success("Đăng nhập thành công");
          if (role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          const errorMessage = res?.data?.message || res?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
          toast.error(errorMessage);
        }
      } catch (error) {
        console.error("Login Error:", error);
        const message = error.response?.data?.message || "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.";
        toast.error(message);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="mt-10 h-1/4 space-y-6 w-full max-w-md p-8 border-2 border-gray-200 bg-white shadow-md rounded-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-7">
          <h1 className="text-2xl text-center font-bold">Đăng nhập</h1>
        </div>
        <div className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full text-[#49719C] font-medium px-4 py-2.5 placeholder-[#49719C] border ${
                formErrors.email
                  ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  : "border-[#CEDBE8]"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE] focus:border-[#7BA4CE]`}
            />
            {formErrors.email && (
              <div className="text-sm text-red-500 font-medium">
                {formErrors.email}
              </div>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="password">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 text-[#49719C] font-medium placeholder-[#49719C] border ${
                  formErrors.password
                    ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    : "border-[#CEDBE8]"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE] focus:border-[#7BA4CE]`}
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
          {/* Quên mật khẩu */}
          <div className="text-right text-sm">
            <Link
              to="/forgotpassword"
              className="text-[#49719C] font-semibold hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>
        {/* Đăng nhập */}
        <Button text="Đăng nhập" variant="primary" size="lg" type="submit" />
        {/* Divide */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-sm text-[#49719C]">hoặc</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>
        {/* Đăng nhập với Google */}
        <Button
          text="Đăng nhập với Google"
          variant="default"
          size="lg"
          icon={<FontAwesomeIcon icon="fa-brands fa-google" size="lg" />}
          iconPosition="left"
        />
        {/* Đăng ký */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground text-[#49719C]">
            Bạn chưa có tài khoản?{" "}
          </span>
          <Link
            to="/register"
            className="text-[#49719C] font-bold hover:underline"
          >
            Đăng ký
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
