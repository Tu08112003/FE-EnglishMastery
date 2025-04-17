import React, { useState } from "react";
import Logo from "../assets/images/logo-bg_white.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Button from "../components/Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = true;
  const [showFilter, setShowFilter] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleFilter = () => setShowFilter((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      <header className="border-b border-gray-200">
        <div className="mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="" className="h-14 w-auto" />
            <span className="font-bold text-lg -ml-2">EnglishMastery</span>
          </div>

          {/* Navbar */}
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
              to="/exam"
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

          {/* Mobile menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 focus:outline-none"
            >
              <FontAwesomeIcon icon="fa-solid fa-bars" size="lg" />
            </button>
          </div>

          {/* Button / User Profile */}
          {!isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <Button
                text="Đăng nhập"
                variant="primary"
                size="sm"
                onClick={() => {
                  console.log("Nút Đăng nhập đã được click!");
                  navigate("/login");
                }}
              />
              <Button
                text="Đăng ký"
                variant="default"
                size="sm"
                onClick={() => {
                  console.log("Nút Đăng ký đã được click!");
                  navigate("/signup");
                }}
              />
            </div>
          ) : (
            <div className="relative cursor-pointer">
              <div
                onClick={toggleFilter}
                className="flex items-center justify-center gap-2 text-gray-600 "
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-600">
                  <FontAwesomeIcon icon="fa-solid fa-user" size="lg" />
                </div>
                <span className="font-bold">Anhdaden</span>
                <FontAwesomeIcon icon="fa-solid fa-angle-down" />
              </div>

              {showFilter && (
                <ul className="absolute top-12 left-3 bg-white border-2 border-gray-200 rounded-lg shadow-lg w-35 z-10">
                  <Link to="/account-info">
                    <li className="flex text-gray-600 items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm font-semibold cursor-pointer">
                      <FontAwesomeIcon icon="fa-solid fa-user" className="w-4 h-4" />
                      <span>Hồ sơ</span>
                    </li>
                  </Link>
                  <li className="flex items-center text-red-500 gap-3 px-4 py-2 hover:bg-gray-100 text-sm font-semibold">
                    <FontAwesomeIcon
                      icon="fa-solid fa-right-from-bracket"
                      className="w-4 h-4"
                    />
                    <span>Đăng xuất</span>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Navbar mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/40 z-50">
          {/* Slide-in menu */}
          <div
            className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform transform duration-300 rounded-l-xl p-4
              ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >          
            <div className="flex justify-end mb-4">
              <button onClick={toggleMobileMenu} className="text-gray-600">
                <FontAwesomeIcon icon="fa-solid fa-xmark" size="lg" />
              </button>
            </div>
            <nav className="flex flex-col space-y-3 border-b-2 border-gray-200 pb-4 mb-5">
              <NavLink
                to="/"
                onClick={toggleMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#2C99E2] text-white font-bold px-4 py-2 rounded-lg"
                    : "text-gray-600 font-medium hover:text-[#2C99E2] px-4 py-2 rounded-lg"
                }
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/exam"
                onClick={toggleMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#2C99E2] text-white font-bold px-4 py-2 rounded-lg"
                    : "text-gray-600 font-medium hover:text-[#2C99E2] px-4 py-2 rounded-lg"
                }
              >
                Đề thi
              </NavLink>
              <NavLink
                to="/dictionary"
                onClick={toggleMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#2C99E2] text-white font-bold px-4 py-2 rounded-lg"
                    : "text-gray-600 font-medium hover:text-[#2C99E2] px-4 py-2 rounded-lg"
                }
              >
                Từ điển
              </NavLink>
              <NavLink
                to="/note"
                onClick={toggleMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#2C99E2] text-white font-bold px-4 py-2 rounded-lg"
                    : "text-gray-600 font-medium hover:text-[#2C99E2] px-4 py-2 rounded-lg"
                }
              >
                Ghi chú
              </NavLink>
            </nav>

            {isLoggedIn ? (
                <div className="flex md:hidden items-center justify-center">
                  <Button
                    text="Đăng nhập"
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      console.log("Nút Đăng nhập đã được click!");
                      navigate("/login");
                    }}
                  />
                </div>
              ) : (
                <div className="relative cursor-pointer w-full">
                  <div
                    onClick={toggleFilter}
                    className="flex items-center justify-center gap-2 text-gray-600 "
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-600">
                      <FontAwesomeIcon icon="fa-solid fa-user" size="lg" />
                    </div>
                    <span className="font-bold">Anhdaden</span>
                    <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                  </div>

                  {showFilter && (
                    <ul className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <li className="flex text-gray-600 items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm font-semibold">
                        <FontAwesomeIcon
                          icon="fa-solid fa-user"
                          className="w-4 h-4"
                        />
                        <span>Hồ sơ</span>
                      </li>
                      <li className="flex items-center text-red-500 gap-3 px-4 py-2 hover:bg-gray-100 text-sm font-semibold">
                        <FontAwesomeIcon
                          icon="fa-solid fa-right-from-bracket"
                          className="w-4 h-4"
                        />
                        <span>Đăng xuất</span>
                      </li>
                    </ul>
                  )}
                </div>
              )}
          </div>
        </div>
      )}

    </>
  );
};

export default Header;
