
// Regex cho email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hàm validate form đăng nhập
const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email không được để trống';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Email không hợp lệ';
  }

  if (!password) {
    errors.password = 'Mật khẩu không được để trống';
  }

  return errors;
};

// Hàm validate form đăng ký
const validateSignUp = ({ username, email, password, confirmPassword }) => {
  const errors = {};

  if (!username || username.trim().length < 2) {
    errors.username = 'Tên người dùng phải có ít nhất 2 ký tự';
  }

  if (!email) {
    errors.email = 'Email không được để trống';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Email không hợp lệ';
  }

  if (!password) {
    errors.password = 'Mật khẩu không được để trống';
  } else if (password.length < 8) {
    errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
  }

  return errors;
};

export {
    validateLogin, validateSignUp
}