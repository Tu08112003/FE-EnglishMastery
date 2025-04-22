import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
const ForgotPassword = () => {

    return (
      <div className="min-h-screen flex justify-center ">
      <form 
          className=" mt-10 h-1/4 space-y-6 w-full max-w-md p-8 border-2 border-gray-200 bg-white shadow-md rounded-lg"  
      >
        {/* Header */}
          <div className="flex items-center justify-center mb-7">
            <h1 className="text-2xl text-center font-bold">Quên mật khẩu</h1>
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
  
          </div>
  
          {/* Confirm Button */}
          <Button text="Xác nhận" variant="primary" size="lg" />
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground text-[#49719C]">Bạn chưa có muốn quay lại? </span>
            <Link to="/login" className="text-[#49719C] font-bold hover:underline">
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    );
  };

export default ForgotPassword