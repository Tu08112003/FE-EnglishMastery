import React from "react";
import Logo from "../assets/images/logo-bg_white.png";
import { Link,NavLink } from "react-router-dom";
import Button from "../components/Button.jsx";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="" className="h-14 w-auto" />
          <span className="font-bold text-lg -ml-2">EnglishMastery</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2C99E2] font-bold border-b-2 border-[#2C99E2] py-2"
                  : "text-gray-600 font-semibold py-2 hover:text-[#2C99E2] hover:font-bold"
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/test"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2C99E2] font-bold border-b-2 border-[#2C99E2] py-2"
                  : "text-gray-600 font-semibold py-2 hover:text-[#2C99E2] hover:font-bold"
              }
            >
              Đề thi
            </NavLink>
            <NavLink
              to="/dictionary"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2C99E2] font-bold border-b-2 border-[#2C99E2] py-2"
                  : "text-gray-600 font-semibold py-2 hover:text-[#2C99E2] hover:font-bold"
              }
            >
              Từ điển
            </NavLink>
            <NavLink
              to="/note"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2C99E2] font-bold border-b-2 border-[#2C99E2] py-2"
                  : "text-gray-600 font-semibold py-2 hover:text-[#2C99E2] hover:font-bold"
              }
            >
              Ghi chú
            </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Button text="Đăng nhập" variant="default" size="sm" />
          <Button text="Đăng ký" variant="primary" size="sm" />
        </div>
      </div>
    </header>
  );
};

export default Header;
