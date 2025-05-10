import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/slice/adminSlice'; 
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import AddUser from '../../components/Admin/AddUser';
import DetailUser from '../../components/Admin/DetailUser';
import EditUser from '../../components/Admin/EditUser';
import ModalConfirm from '../../components/ConfirmModal';
import { toast } from 'react-toastify';

const ManageUser = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin); 

  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Gọi API khi component mount
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Hiển thị thông báo lỗi nếu có
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Lọc người dùng theo query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    if (filterType === 'userName') {
      return user.userName?.toLowerCase().includes(query);
    } else if (filterType === 'email') {
      return user.email?.toLowerCase().includes(query);
    } else {
      return (
        user.userName?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
      );
    }
  });

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  const totalUsers = filteredUsers.length;

  // Hàm lưu thông tin người dùng đã chỉnh sửa
  const handleSaveUser = (updatedUser) => {
    toast.success(`Cập nhật thông tin người dùng ${updatedUser.name} thành công`);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <main className="max-w-6xl w-full mx-auto space-y-6 p-4">
      {/* Header */}
      <section className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <Button
          text="Thêm mới"
          variant="primary"
          size="sm"
          icon={<FontAwesomeIcon icon="fa-solid fa-plus" />}
          onClick={() => setShowAddForm(true)}
        />
        <AddUser show={showAddForm} onClose={() => setShowAddForm(false)} />
      </section>

      {/* Thanh tìm kiếm + lọc */}
      <section className="flex flex-row justify-between items-end border-2 border-gray-200 p-5 rounded-lg shadow-md">
        <div className="flex flex-row gap-4 w-full">
          <SearchBar
            text="Tìm kiếm bằng tên hoặc email"
            focusBorderColor="focus:ring-gray-400"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="flex gap-2 items-center">
            <label htmlFor="filterType" className="text-sm font-medium">
              Lọc theo:
            </label>
            <select
              id="filterType"
              name="filterType"
              className="border-2 border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Tất cả</option>
              <option value="userName">Tên</option>
              <option value="email">Email</option>
            </select>
          </div>
        </div>
      </section>

      {/* Bảng danh sách người dùng */}
      <section className="flex max-h-screen flex-col border-2 text-gray-600 font-semibold border-gray-200 rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center py-4 text-gray-600 font-semibold text-lg">Đang tải...</div>
        ) : (
          <>
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Loại người dùng</th>
                  <th className="px-4 py-3">Tên người dùng</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t-2 border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-2 text-gray-600 font-semibold">{user.userId}</td>
                    <td className="px-4 py-2 text-gray-600 font-semibold">User</td>
                    <td className="px-4 py-2 text-gray-600 font-semibold">{user.userName}</td>
                    <td className="px-4 py-2 text-gray-600 font-semibold">{user.email}</td>
                    <td className="px-4 py-2 text-center flex items-center justify-center gap-2">
                      {/* <Button
                        text="Xem chi tiết"
                        variant="primary"
                        size="sm"
                        icon={<FontAwesomeIcon icon="fa-solid fa-eye" />}
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDetailModal(true);
                        }}
                      /> */}
                      <Button
                        text="Chỉnh sửa"
                        variant="default"
                        size="sm"
                        icon={<FontAwesomeIcon icon="fa-solid fa-pencil" />}
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                      />
                      <Button
                        text="Xóa"
                        variant="delete"
                        size="sm"
                        hoverBg="hover:bg-red-700"
                        icon={<FontAwesomeIcon icon="fa-solid fa-trash" />}
                        onClick={() => {
                          setShowModal(true);
                          setSelectedUser(user);
                        }}
                      />
                    </td>
                  </tr>
                ))}
                {currentUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-600 font-semibold py-4">
                      Không tìm thấy người dùng.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <DetailUser
              show={showDetailModal}
              onClose={() => setShowDetailModal(false)}
              user={selectedUser}
            />
            <EditUser
              show={showEditModal}
              onClose={() => setShowEditModal(false)}
              user={selectedUser}
              onSave={handleSaveUser}
            />
            {showModal && (
              <ModalConfirm
                show={showModal}
                title="Xác nhận xóa người dùng"
                description={`Bạn có chắc chắn muốn xóa người dùng '${selectedUser?.name}'? Hành động này không thể hoàn tác.`}
                hoverBgConfirm="hover:bg-red-700"
                onCancel={handleCancel}
              />
            )}
            {/* Phân trang */}
            <div className="flex justify-between items-center p-4">
              <span className="text-sm text-gray-600 font-semibold">
                Hiển thị từ {startIndex + 1} đến {Math.min(endIndex, totalUsers)}{' '}
                trong số {totalUsers} người dùng
              </span>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default ManageUser;