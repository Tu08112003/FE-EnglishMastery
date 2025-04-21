import React, { useState } from 'react';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from "../assets/images/logo-bg_white.png";

const AdminLayout = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded transition-all duration-200 transform ${
      isActive
        ? 'bg-[#E6F2FF] text-[#2C99E2] font-bold'
        : 'text-gray-600 font-bold hover:bg-gray-100 hover:text-[#2C99E2] hover:scale-[1.02]'
    }`;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-row">
        {/* Sidebar */}
        <aside className="w-64 border-r-2 border-gray-200 p-4 space-y-4 sticky top-0 h-screen overflow-y-auto scroll-smooth">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="" className="h-14 w-auto" />
            <span className="font-bold text-lg -ml-2">EnglishMastery</span>
          </div>
          {/* Navbar */}
          <nav className="flex flex-col space-y-2">
            <NavLink to="/admin" end className={linkClass}>
              <span className="flex gap-4 items-center">
                <FontAwesomeIcon icon="fa-solid fa-table" className="w-5 h-5" />
                Dashboard
              </span>
            </NavLink>
            <NavLink to="/admin/exam" className={linkClass}>
              <span className="flex gap-4 items-center">
                <FontAwesomeIcon icon="fa-solid fa-file" className="w-5 h-5" />
                Quản lý đề thi
              </span>
            </NavLink>
            <NavLink to="/admin/user" className={linkClass}>
              <span className="flex gap-4 items-center">
                <FontAwesomeIcon icon="fa-solid fa-user" className="w-5 h-5" />
                Quản lý người dùng
              </span>
            </NavLink>
            <NavLink to="/admin/payment" className={linkClass}>
              <span className="flex gap-4 items-center">
                <FontAwesomeIcon icon="fa-solid fa-money-bills" className="w-5 h-5" />
                Quản lý thanh toán
              </span>
            </NavLink>
          </nav>

          {/* Admin info + Dropdown */}
          <div className="relative mt-auto">
            <div
              className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2C99E2] text-white font-bold">
                AD
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Admin</span>
                <span className="text-sm text-gray-600">Quản trị viên</span>
              </div>
              <FontAwesomeIcon
                icon="fa-solid fa-caret-down"
                className={`ml-auto text-gray-600 transform transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </div>

            <div
              className={`absolute left-0 w-full bg-white rounded shadow mt-2 z-10 transition-all duration-300 ease-in-out transform ${
                dropdownOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <NavLink
                to="/account-info"
                className="flex gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition duration-200"
              >
                <span className="flex items-center justify-center w-5 h-5">
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </span>
                <span>Hồ sơ</span>
              </NavLink>
              <button
                className="flex gap-2 w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100 transition duration-200"
                onClick={() => {
                  console.log('Đăng xuất');
                }}
              >
                <span className="flex items-center justify-center w-5 h-5">
                  <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
                </span>
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
