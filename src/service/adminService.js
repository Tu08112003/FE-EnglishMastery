import axios from "../utils/axios-customize";

// Lấy thông tin user
const getAllUser = () => {
  const URL_BACKEND = "user-service/getAllUser";
  return axios.get(URL_BACKEND);
};

// Lấy số lượng user
const getNumberOfUser = () => {
  const URL_BACKEND = "user-service/getNumberOfUser";
  return axios.get(URL_BACKEND);
};

// Lấy số lượng bài test
const getNumberOfTest = () => {
  const URL_BACKEND = "exam-service/getNumberOfTest";
  return axios.get(URL_BACKEND);
};

// Lấy lịch sử bài thi
const getAllHistoryTest = () => {
  const URL_BACKEND = "exam-service/getAllHistoryTest";
  return axios.get(URL_BACKEND);
};

// Lấy thông tin bài test
const getAllTest = () => {
  const URL_BACKEND = "exam-service/getAllTest";
  return axios.get(URL_BACKEND);
};

// Lấy quyền của user
const getPermissionOfUser = ({ idUser }) => {
  const URL_BACKEND = "user-service/getPermissionOfUser";
  const data = {
    idUser: idUser,
  };
  return axios.post(URL_BACKEND, data);
};

// Cập nhật quyền của user
const updatePermissionOfUser = ({ idUser, namePermission, typeUpdate }) => {
  const URL_BACKEND = "user-service/updatePermission";
  const data = {
    idUser: idUser,
    namePermission: namePermission,
    typeUpdate: typeUpdate,
  };
  return axios.post(URL_BACKEND, data);
};

// Thêm quyền cho user
const addPermissionForUser = ({ namePermission }) => {
  const URL_BACKEND = "user-service/addPermission";
  const data = {
    namePermission: namePermission,
  };
  return axios.post(URL_BACKEND, data);
};
// Xóa quyền của user
const detelePermissionOfUser = ({ permissionId }) => {
  const URL_BACKEND = "user-service/removePermission";
  const data = {
    permisstonId: permissionId,
  };
  return axios.post(URL_BACKEND, data);
};
// Thêm mới user
const addUser = ({ userName, email, password, role }) => {
  const URL_BACKEND = "user-service/addNewUser";
  const data = {
    userName: userName,
    email: email,
    password: password,
    role: role,
  };
  return axios.post(URL_BACKEND, data);
};

// Xóa user
const deleteUser = ({ userId }) => {
  const URL_BACKEND = "user-service/removeUser";
  const data = {
    userId: userId,
  };
  return axios.post(URL_BACKEND, data);
};

export {
  getAllUser,
  addUser,
  deleteUser,
  getNumberOfUser,
  getNumberOfTest,
  getAllHistoryTest,
  getAllTest,
  getPermissionOfUser,
  updatePermissionOfUser,
  addPermissionForUser,
  detelePermissionOfUser,
};
