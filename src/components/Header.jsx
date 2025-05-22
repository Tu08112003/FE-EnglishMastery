import React, { useState, useEffect } from "react";
import Logo from "../assets/images/logo-bg_white.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Button from "../components/Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { clearUserInfo } from "../redux/slice/userSlice";
import { fetchUserInfo } from "../redux/slice/userSlice";
import { authLogout } from "../service/authService";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserInfo());
    }
  }, [isLoggedIn, dispatch]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
    const res = await authLogout({ refreshToken: refresh_token });
    if (res.status === 200) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("role");
      dispatch(logout());
      dispatch(clearUserInfo());

      toast.success("Đăng xuất thành công!");
      navigate("/");
      setDropdownOpen(false);
      setIsMobileMenuOpen(false);
    } else {
      toast.error("Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.");
    }
  };
  return (
    <>
      <header className="border-b border-gray-200">
        <div className="mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
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

          {/* Mobile menu icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 flex items-center w-10 h-10 justify-center p-2 hover:bg-gray-200 rounded-full focus:outline-none cursor-pointer"
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
                onClick={() => navigate("/login")}
              />
              <Button
                text="Đăng ký"
                variant="default"
                size="sm"
                onClick={() => navigate("/register")}
              />
            </div>
          ) : (
            <div className="hidden md:flex relative cursor-pointer">
              <div
                onClick={toggleDropdown}
                className="flex items-center justify-center gap-2 text-gray-600"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-600">
                  <FontAwesomeIcon icon="fa-solid fa-user" size="lg" />
                </div>
                <span className="font-bold">{userInfo?.userName || ""}</span>
                <FontAwesomeIcon
                  icon="fa-solid fa-caret-down"
                  className={`ml-auto text-gray-600 transform transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </div>

              {dropdownOpen && (
                <ul
                  className={`absolute top-10 left-1 w-full border-2 border-gray-200 bg-white rounded-lg shadow-md mt-2 z-10 transition-all duration-300 ease-in-out transform ${dropdownOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                    }`}
                >
                  <Link
                    to="/account-info"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <li className="flex text-gray-600 items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm font-semibold cursor-pointer">
                      <FontAwesomeIcon
                        icon="fa-solid fa-user"
                        className="w-4 h-4"
                      />
                      <span>Hồ sơ</span>
                    </li>
                  </Link>
                  <li
                    onClick={handleLogout}
                    className="flex items-center text-red-500 gap-3 px-4 py-2 hover:bg-gray-100 text-sm font-semibold cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-arrow-right-from-bracket"
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
        <div
          className={`
            fixed inset-0 z-50 bg-black/40 transition-opacity duration-500 ease-in-out
            ${isMobileMenuOpen? "opacity-100": "opacity-0 pointer-events-none"}
          `}
          onClick={toggleMobileMenu}
        >
          <div
            className={`
              absolute right-0 w-64 h-full bg-white shadow-md transform transition-transform ease-in-out duration-300 rounded-l-xl p-4
              ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 flex items-center justify-center cursor-pointer w-10 h-10 p-2 rounded-full hover:bg-gray-200"
              >
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
              <div className="relative cursor-pointer w-full">
                <div
                  onClick={toggleDropdown}
                  className="flex items-center justify-center gap-2 text-gray-600"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-600">
                    <FontAwesomeIcon icon="fa-solid fa-user" size="lg" />
                  </div>
                  <span className="font-bold">
                    {userInfo?.userName || "User"}
                  </span>
                  <FontAwesomeIcon
                    icon="fa-solid fa-caret-down"
                    className={`text-gray-600 transform transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </div>

                {dropdownOpen && (
                  <ul className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50">
                    <Link to="/account-info">
                      <li className="flex text-gray-600 items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm font-semibold">
                        <FontAwesomeIcon
                          icon="fa-solid fa-user"
                          className="w-4 h-4"
                        />
                        <span>Hồ sơ</span>
                      </li>
                    </Link>
                    <li
                      onClick={handleLogout}
                      className="flex items-center text-red-500 gap-3 px-4 py-2 hover:bg-gray-100 text-sm font-semibold"
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-arrow-right-from-bracket"
                        className="w-4 h-4"
                      />
                      <span>Đăng xuất</span>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="flex md:hidden items-center justify-center">
                <Button
                  text="Đăng nhập"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigate("/login");
                    toggleMobileMenu();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
