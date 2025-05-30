
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
const validateRegister = ({ userName, email, password, confirmPassword }) => {
  const errors = {};

  if (!userName || userName.trim().length < 2) {
    errors.userName = 'Tên người dùng phải có ít nhất 2 ký tự';
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

// Hàm validate cho Add/Update Vocabulary
const validateAddUpdateVocabulary = ({ word, description, pronounce, note, example }) => {
  const errors = {};

  if (!word || !word.trim()) {
    errors.word = 'Vui lòng nhập từ vựng';
  }
  if (!description || !description.trim()) {
    errors.description = 'Vui lòng nhập nghĩa của từ';
  }
  if (!pronounce || !pronounce.trim()) {
    errors.pronounce = 'Vui lòng nhập cách phát âm';
  }
  if (!example || !example.trim()) {
    errors.example = 'Vui lòng nhập ví dụ';
  }
  if (!note || !note.trim()) {
    errors.note = 'Vui lòng nhập ghi chú';
  }

  return errors;
};

// Hàm validate cho đổi mật khẩu
const validateChangePassword = ({ password, newPassword, confirmPassword }) => {
  const errors = {};

  if (!password) {
    errors.password = 'Mật khẩu không được để trống';
  } else if (password.length < 8) {
    errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
  }

  if (!newPassword) {
    errors.newPassword = 'Mật khẩu mới không được để trống';
  } else if (newPassword.length < 8) {
    errors.newPassword = 'Mật khẩu mới phải có ít nhất 8 ký tự';
  }else if (newPassword === password) {
    errors.newPassword = 'Mật khẩu mới không được giống mật khẩu cũ';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
  } else if (confirmPassword !== newPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
  }

  return errors;
};

// Hàm validate thông tin người dùng

const validateUpdateInforUser = ({userName}) => {
    const error = {};
    if (!userName || userName.trim().length < 2) {
      error.userName = 'Tên người dùng phải có ít nhất 2 ký tự';
    }
    return error;    
}

// Hàm validate cho quên mật khẩu
const validateForgotPassword = ({ email, otpCode, newPassword }) => {
  const errors = {};
  const numberRegex = /^\d+$/;
  
  if(!email) {
    errors.email = 'Email không được để trống';
  }else if (!emailRegex.test(email)) {
    errors.email = 'Email không hợp lệ';
  }

  if(!otpCode) {
    errors.otpCode = 'Mã OTP không được để trống';
  }else if (otpCode.length < 6) {
    errors.otpCode = 'Mã OTP phải có ít nhất 6 ký tự';
  }else if (!numberRegex.test(otpCode)) {
    errors.otpCode = 'Mã OTP phải là số';
  }
  
  if(!newPassword) {
    errors.newPassword = 'Mật khẩu mới không được để trống';
  }else if (newPassword.length < 8) {
    errors.newPassword = 'Mật khẩu mới phải có ít nhất 8 ký tự';
  }
  return errors;
}

// Hàm validate thêm user 
const validateAddUser = ({ userName, email, password }) => {
  const errors = {};

  if (!userName || userName.trim().length < 2) {
    errors.userName = 'Tên người dùng phải có ít nhất 2 ký tự';
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



  return errors;
};
export {
    validateLogin, validateRegister, validateAddUpdateVocabulary, validateChangePassword, validateUpdateInforUser, validateForgotPassword,validateAddUser
}