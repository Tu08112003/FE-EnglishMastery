import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link ,useNavigate} from 'react-router-dom';
import Button from '../components/Button.jsx';
import { validateSignUp } from '../utils/validate.js'; 
import { authRegister } from '../service/authService.js';
import { toast } from 'react-toastify';
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    const updatedFormData = { ...formData, [id]: value }; 
    const validationErrors = validateSignUp(updatedFormData); 
    setErrors(validationErrors);
  };

  const handleSignup = async () => {
    const validationErrors = validateSignUp(formData);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await authRegister({
          userName: formData.username,
          email: formData.email,
          password: formData.password,
        });
  
        if (res.data) {
            toast.success('Đăng ký thành công!');
            setTimeout(() => {
              navigate("/login");
            }, 2500);
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    }
  };
  

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
          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className='font-semibold' htmlFor="username">Tên người dùng</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên"
              className={`w-full text-[#49719C] font-medium px-4 py-2.5 placeholder-[#49719C] border ${errors.username ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500' : 'border-[#CEDBE8]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE]`}
            />
            {errors.username && <div className="text-sm text-red-500 font-medium">{errors.username}</div>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className='font-semibold' htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className={`w-full text-[#49719C] font-medium px-4 py-2.5 placeholder-[#49719C] border ${errors.email ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500' : 'border-[#CEDBE8]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE]`}
            />
            {errors.email && <div className="text-sm text-red-500 font-medium">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className='font-semibold' htmlFor="password">Mật khẩu</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập ít nhất 8 ký tự"
                className={`w-full px-4 py-2.5 text-[#49719C] font-medium placeholder-[#49719C] border ${errors.password ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500' : 'border-[#CEDBE8]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE]`}
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
            {errors.password && <div className="text-sm text-red-500 font-medium">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className='font-semibold' htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu xác nhận"
                className={`w-full px-4 py-2.5 text-[#49719C] font-medium placeholder-[#49719C] border ${errors.confirmPassword ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500' : 'border-[#CEDBE8]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE]`}
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
            {errors.confirmPassword && <div className="text-sm text-red-500 font-medium">{errors.confirmPassword}</div>}
          </div>
        </div>

        {/* Register Button */}
        <Button text="Đăng ký" variant="primary" size="lg" type='submit' />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-sm text-[#49719C]">hoặc</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <Button
          text="Đăng nhập với Google"
          variant="default"
          size="lg"
          icon={<FontAwesomeIcon icon="fa-brands fa-google" size="lg" />}
          iconPosition="left"
        />

        {/* Login Link */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground text-[#49719C]">Bạn đã có tài khoản? </span>
          <Link to="/login" className="text-[#49719C] font-bold hover:underline">
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;