import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex justify-center ">
    <form 
        className=" mt-10 h-1/4 space-y-6 w-full max-w-md p-8 border-2 border-gray-200 bg-white shadow-md rounded-lg"  
    >
      {/* Header */}
        <div className="flex items-center justify-center mb-7">
          <h1 className="text-2xl text-center font-bold">Đăng nhập</h1>
        </div>
        
        <div className="space-y-5">
          
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className='font-semibold' htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email"
              className="w-full text-[#49719C] font-medium px-4 py-2.5 placeholder-[#49719C] border border-[#CEDBE8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE] focus:border-[#7BA4CE]"
            />
            <div className="hidden text-sm text-red-500 font-medium"></div>

          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className='font-semibold' htmlFor="password">Mật khẩu</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2.5 text-[#49719C] font-medium placeholder-[#49719C] border border-[#CEDBE8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BA4CE] focus:border-[#7BA4CE]"
              />
                <span
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon="fa-solid fa-eye-slash" size="sm" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-eye" size="sm" />
                  )}
                </span>
            </div>
            <div className="hidden text-sm text-red-500 font-medium"></div>
          </div>

          {/* Forgot password */}
          <div className="text-right text-sm">
            <Link to="/forgotpassword" className="text-[#49719C] font-semibold hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        {/* Login Button */}
        <Button text="Đăng nhập" variant="primary" size="lg" />
        
        
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

        {/* Register */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground text-[#49719C]">Bạn chưa có tài khoản? </span>
          <Link to="/signup" className="text-[#49719C] font-bold hover:underline">
            Đăng ký
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
