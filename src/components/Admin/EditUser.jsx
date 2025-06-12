import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalWrapper from "../ModalWrapper";
import Button from "../../components/Button.jsx";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination";
import ModalConfirm from "../ConfirmModal.jsx";
import {
  fetchUpdatePermissionOfUser,
  fetchAddPermissionForUser,
  fetchPermissionOfUser,
  fetchDeletePermissionOfUser,
} from "../../redux/slice/adminSlice.js";
import { toast } from "react-toastify";

const EditUser = ({ show, onClose, user }) => {
  const { permissionOfUser, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showAllowModal, setShowAllowModal] = useState(false);
  const [permissionInput, setPermissionInput] = useState("");
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil((permissionOfUser?.length || 0) / itemsPerPage);

  // Cập nhật quyền của user
  const handleUpdatePermissionUser = async ({
    idUser,
    namePermission,
    typeUpdate,
  }) => {
    try {
      await dispatch(
        fetchUpdatePermissionOfUser({
          idUser,
          namePermission,
          typeUpdate,
        })
      ).unwrap();
      await dispatch(fetchPermissionOfUser({ idUser: user.userId })).unwrap();
      toast.success("Cập nhật quyền thành công!");
    } catch (err) {
      toast.error(err || "Cập nhật quyền thất bại");
    }
  };

  // Thêm quyền cho user
  const handleAddPermissionUser = async () => {
    try {
      if (!permissionInput.trim()) {
        toast.error("Vui lòng nhập URL quyền");
        return;
      }
      await dispatch(
        fetchAddPermissionForUser({
          namePermission: permissionInput,
        })
      ).unwrap();
      await dispatch(fetchPermissionOfUser({ idUser: user.userId })).unwrap();
      toast.success("Thêm quyền thành công!");
      setPermissionInput("");
      setCurrentPage(1);
    } catch (err) {
      toast.error(err || "Thêm quyền thất bại");
    }
  };

  // Xóa quyền của user
  const handleDeletePermissionUser = async (permissionId) => {
    try {
      await dispatch(
        fetchDeletePermissionOfUser({
          permissionId: permissionId,
        })
      ).unwrap();
      await dispatch(fetchPermissionOfUser({ idUser: user.userId })).unwrap();
      toast.success("Xóa quyền thành công!");
      setShowDeleteModal(false);
      setSelectedPermission(null);
      setCurrentPage(1);
    } catch (err) {
      toast.error(err || "Xóa quyền thất bại");
    }
  };

  // Xử lý chặn quyền
  const handleBlockPermission = async () => {
    try {
      await handleUpdatePermissionUser({
        idUser: user.userId,
        namePermission: selectedPermission.name,
        typeUpdate: "BLOCK",
      });
      setShowBlockModal(false);
      setSelectedPermission(null);
    } catch (err) {
      toast.error(err || "Chặn quyền thất bại");
    }
  };

  // Xử lý bỏ chặn quyền
  const handleAllowPermission = async () => {
    try {
      await handleUpdatePermissionUser({
        idUser: user.userId,
        namePermission: selectedPermission.name,
        typeUpdate: "ALLOW",
      });
      setShowAllowModal(false);
      setSelectedPermission(null);
    } catch (err) {
      toast.error(err || "Bỏ chặn quyền thất bại");
    }
  };

  return (
    <ModalWrapper show={show} onClose={onClose}>
      <div
        className="w-full max-w-4xl mx-auto flex flex-col bg-white border-2 border-gray-200 shadow-lg rounded-2xl px-6 sm:px-4 pt-6 pb-6 max-h-[95vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col items-center p-3">
          <div className="flex items-center justify-between w-full mb-1">
            <h2 className="text-xl font-medium text-center sm:text-2xl">
              Chỉnh sửa quyền truy cập của người dùng
            </h2>
            <button
              onClick={onClose}
              type="button"
              className="flex items-center justify-center w-8 h-8 hover:bg-gray-200 hover:rounded-lg transition-all duration-200 ease-in-out"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                size="lg"
                style={{ color: "#565E6C" }}
              />
            </button>
          </div>
          <p className="flex justify-start w-full text-sm text-muted-foreground text-gray-600 font-medium">
            Cập nhật quyền của người dùng {user?.userId}
          </p>
        </div>
        {/* Thông tin user */}
        <div className="w-full px-8 py-6 flex flex-col gap-6 bg-white">
          <div className="grid grid-cols-2 p-2 gap-5">
            <div className="space-y-2">
              <p className="font-semibold text-gray-600">ID</p>
              <p className="font-bold">{user?.userId}</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-600">Tên người dùng</p>
              <p className="font-bold">{user?.userName}</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-600">Email</p>
              <p className="font-bold">{user?.email}</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-600">Loại người dùng</p>
              <p className="font-bold">User</p>
            </div>
          </div>
          {/* Danh sách các quyền */}
          <div className="w-full flex flex-col gap-4 border-gray-200 py-3">
            <h1 className="font-semibold">Danh sách các quyền</h1>
            <div className="w-full flex gap-2 items-center justify-center">
              <input
                type="text"
                id="url"
                placeholder="Nhập URL quyền (ví dụ: /api/endpoint)"
                className="w-full flex-1 border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-300"
                value={permissionInput}
                onChange={(e) => setPermissionInput(e.target.value)}
              />
              <Button
                text="Thêm quyền"
                size="sm"
                variant="primary"
                icon={<FontAwesomeIcon icon="fa-solid fa-plus" />}
                onClick={handleAddPermissionUser}
              />
            </div>
            <div className="w-full">
              {loading ? (
                <div className="text-center py-4 text-gray-600 font-semibold text-lg">
                  Đang tải...
                </div>
              ) : permissionOfUser?.length > 0 ? (
                <>
                  <table className="w-full text-center border-2 border-gray-200 shadow-lg rounded-2xl border-separate border-spacing-0 overflow-hidden">
                    <thead>
                      <tr className="bg-gray-200 text-black font-bold">
                        <th className="px-2 py-4">URL</th>
                        <th className="px-2 py-4">Trạng thái</th>
                        <th className="px-2 py-4">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissionOfUser
                        .slice(startIndex, endIndex)
                        .map((permission, index) => (
                          <tr key={index}>
                            <td className="px-2 py-4">{permission.name}</td>
                            <td className="px-2 py-4 justify-center items-center">
                              <span
                                className={`justify-center items-center rounded-3xl border-2 px-4 py-1 
                                ${
                                  permission.allowed
                                    ? " bg-green-50 text-green-700 border-green-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }
                              `}
                              >
                                {permission.allowed ? "Hoạt động" : "Bị chặn"}
                              </span>
                            </td>
                            <td className="flex gap-2 items-center justify-center px-2 py-4">
                              {permission.allowed ? (
                                <Button
                                  text="Chặn"
                                  size="sm"
                                  type="button"
                                  variant="delete"
                                  textColor="text-red-600"
                                  border="border-2 border-red-600"
                                  bg="bg-white"
                                  icon={<FontAwesomeIcon icon="fa-solid fa-ban" />}
                                  onClick={() => {
                                    setSelectedPermission(permission);
                                    setShowBlockModal(true);
                                  }}
                                />
                              ) : (
                                <Button
                                  text="Bỏ chặn"
                                  type="button"
                                  size="sm"
                                  variant="default"
                                  border="border-2"
                                  icon={<FontAwesomeIcon icon="fa-solid fa-check" />}
                                  onClick={() => {
                                    setSelectedPermission(permission);
                                    setShowAllowModal(true);
                                  }}
                                />
                              )}
                              <Button
                                text="Xóa"
                                type="button"
                                size="sm"
                                variant="delete"
                                textColor="text-red-600"
                                border="border-2 border-red-600"
                                bg="bg-white"
                                icon={<FontAwesomeIcon icon="fa-solid fa-trash" />}
                                onClick={() => {
                                  setSelectedPermission(permission);
                                  setShowDeleteModal(true);
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center p-4">
                    <span className="text-sm text-gray-600 font-semibold">
                      Hiển thị từ {startIndex + 1} đến{" "}
                      {Math.min(endIndex, permissionOfUser.length)} trong số{" "}
                      {permissionOfUser.length} quyền của người dùng
                    </span>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-gray-600 font-semibold text-lg">
                  Không có quyền nào
                </div>
              )}
            </div>

            {/* Modal xác nhận xóa */}
            {showDeleteModal && (
              <ModalConfirm
                show={showDeleteModal}
                title="Xác nhận xóa quyền"
                description={`Bạn có chắc chắn muốn xóa quyền '${selectedPermission.name}'? Hành động này không thể hoàn tác.`}
                hoverBgConfirm="hover:bg-red-700"
                onCancel={() => {
                  setShowDeleteModal(false);
                  setSelectedPermission(null);
                }}
                onConfirm={() => handleDeletePermissionUser(selectedPermission.id)}
              />
            )}

            {/* Modal xác nhận chặn */}
            {showBlockModal && (
              <ModalConfirm
                show={showBlockModal}
                title="Xác nhận chặn quyền"
                description={`Bạn có chắc chắn muốn chặn quyền '${selectedPermission.name}'?`}
                hoverBgConfirm="hover:bg-red-700"
                onCancel={() => {
                  setShowBlockModal(false);
                  setSelectedPermission(null);
                }}
                onConfirm={handleBlockPermission}
              />
            )}

            {/* Modal xác nhận bỏ chặn */}
            {showAllowModal && (
              <ModalConfirm
                show={showAllowModal}
                title="Xác nhận bỏ chặn quyền"
                description={`Bạn có chắc chắn muốn bỏ chặn quyền '${selectedPermission.name}'?`}
                confirmVariant="primary"
                onCancel={() => {
                  setShowAllowModal(false);
                  setSelectedPermission(null);
                }}
                onConfirm={handleAllowPermission}
              />
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button text="Hủy" variant="default" size="sm" onClick={onClose} />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditUser;