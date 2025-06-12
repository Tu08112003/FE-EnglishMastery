import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import { validateRegister } from "../utils/validate.js";
import { authRegister, authGoogleLogin } from '../service/authService.js';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slice/authSlice";
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleButton = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedFormData = { ...formData, [id]: value };
    setFormData(updatedFormData);
    const validationErrors = validateRegister(updatedFormData);
    setErrors(validationErrors);
  };

  const handleSignup = async () => {
    const validationErrors = validateRegister(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await authRegister({
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
        });
        if (res && res.data) {
          toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
          navigate('/login');
        } else {
          toast.error(res.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Signup Error:', error);
        const message = error.response?.data?.message || 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.';
        toast.error(message);
      }
    }
  };

  const handleGoogleCallbackResponse = async (response) => {
    const idToken = response.credential;
    try {
      const res = await authGoogleLogin({ idToken });
      if (res && res.data) {
        const { accessToken, refreshToken, role } = res.data;

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("role", role);
        dispatch(loginSuccess({ role }));
        
        toast.success("Đăng nhập thành công với Google");
        if (role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Xác thực với Google thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      const message =
        error.response?.data?.message ||
        "Đã xảy ra lỗi khi đăng nhập bằng Google.";
      toast.error(message);
    }
  };

  const handleCustomGoogleLogin = () => {
    if (googleButton.current) {
      const clickableElement = googleButton.current.querySelector('[role="button"]');
      if (clickableElement) {
        clickableElement.click();
      }
    }
  };

  useEffect(() => {
    /* global google */
    if (window.google && google.accounts) {
      google.accounts.id.initialize({
        client_id: "495739615131-v8oqk6va02oc5oevr08r5a5a4hrb5ctb.apps.googleusercontent.com", 
        callback: handleGoogleCallbackResponse,
      });

      google.accounts.id.renderButton(
        googleButton.current,
        { theme: "outline", size: "large" } 
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center mb-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
        className="mt-10 space-y-6 w-full max-w-md p-8 border-2 border-gray-200 bg-white shadow-md rounded-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-7">
          <h1 className="text-2xl text-center font-bold">Đăng ký</h1>
        </div>

        <div className="space-y-5">
          {/* userName */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="userName">
              Tên người dùng
            </label>
            <input
              id="userName"
              type="text"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Nhập tên"
              className={`w-full text-[#49719C] font-medium px-4 py-2.5 placeholder-[#49719C] border ${
                errors.userName
                  ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  : "border-[#CEDBE8]"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE]`}
            />
            {errors.userName && (
              <div className="text-sm text-red-500 font-medium">
                {errors.userName}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className={`w-full text-[#49719C] font-medium px-4 py-2.5 placeholder-[#49719C] border ${
                errors.email
                  ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  : "border-[#CEDBE8]"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE]`}
            />
            {errors.email && (
              <div className="text-sm text-red-500 font-medium">
                {errors.email}
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
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập ít nhất 8 ký tự"
                className={`w-full px-4 py-2.5 text-[#49719C] font-medium placeholder-[#49719C] border ${
                  errors.password
                    ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    : "border-[#CEDBE8]"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE]`}
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
            {errors.password && (
              <div className="text-sm text-red-500 font-medium">
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="confirmPassword">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu xác nhận"
                className={`w-full px-4 py-2.5 text-[#49719C] font-medium placeholder-[#49719C] border ${
                  errors.confirmPassword
                    ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    : "border-[#CEDBE8]"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE]`}
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
            {errors.confirmPassword && (
              <div className="text-sm text-red-500 font-medium">
                {errors.confirmPassword}
              </div>
            )}
          </div>
        </div>

        {/* Register Button */}
        <Button text="Đăng ký" variant="primary" size="lg" type="submit" />
        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-sm text-[#49719C]">hoặc</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>
        {/* Đăng nhập bằng Google */}
        <Button
          text="Đăng nhập với Google" 
          type="button" 
          variant="default"
          size="lg"
          icon={<FontAwesomeIcon icon={faGoogle} size="lg" />} 
          onClick={handleCustomGoogleLogin} 
        />

        <div ref={googleButton} style={{ display: "none" }}></div>

        {/* Login Link */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground text-[#49719C]">
            Bạn đã có tài khoản?{" "}
          </span>
          <Link
            to="/login"
            className="text-[#49719C] font-bold hover:underline"
          >
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;