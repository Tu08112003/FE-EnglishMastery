import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PackageForm from "../../components/Admin/PackageForm";
import ModalConfirm from "../../components/ConfirmModal";
import DetailPayment from "../../components/Admin/DetailPayment";
import Pagination from "../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchRevenue, fetchTransaction } from "../../redux/slice/adminSlice";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
const ManagePayment = () => {
  const {
    revenue,
    transactions,
    loadingRevenue,
    loadingTransaction,
    errorRevenue,
    errorTransaction,
  } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRevenue());
    dispatch(fetchTransaction());
  }, [dispatch]);

  const [packages, setPackages] = useState([
    {
      id: "PG001",
      name: "Lifetime",
      description: "Full bộ đề TOEIC các năm",
      cost: "500.000 VNĐ",
      duration: "Trọn đời",
    },
  ]);

  const [currentPagePayments, setCurrentPagePayments] = useState(1);
  const [currentPagePackages, setCurrentPagePackages] = useState(1);
  const [searchQueryPayments, setSearchQueryPayments] = useState("");
  const itemsPerPage = 4;

  const [showForm, setShowForm] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailPayment, setShowDetailPayment] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  const handleEditPackage = (packageData) => {
    console.log("Editing package:", packageData);
    setCurrentPackage(packageData);
  };

  useEffect(() => {
    if (currentPackage) {
      setShowForm(true);
    }
  }, [currentPackage]);

  const handleAddOrUpdatePackage = (formData) => {
    if (currentPackage) {
      setPackages(
        packages.map((pkg) => (pkg.id === formData.id ? formData : pkg))
      );
    } else {
      const newPackage = {
        ...formData,
        id: `PG${(packages.length + 1).toString().padStart(3, "0")}`,
      };
      setPackages([...packages, newPackage]);
    }
    setShowForm(false);
    setCurrentPackage(null);
  };

  const handleDeletePackage = (packageData) => {
    setPackageToDelete(packageData);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setPackages(packages.filter((pkg) => pkg.id !== packageToDelete.id));
    setShowModal(false);
    setPackageToDelete(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setPackageToDelete(null);
  };
  // Search payment
  const filteredPayments = transactions.filter((payment) => {
    const id = payment.id || "";
    const userName = payment.userName || "";
    const query = searchQueryPayments.toLowerCase();
    return (
      id.toLowerCase().includes(query) || userName.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    setCurrentPagePayments(1);
  }, [searchQueryPayments]);

  const totalPayments = transactions.length;
  const totalPaymentPages = Math.ceil(totalPayments / itemsPerPage);
  const startIndexPayments = (currentPagePayments - 1) * itemsPerPage;
  const endIndexPayments = startIndexPayments + itemsPerPage;
  const currentPayments = filteredPayments.slice(
    startIndexPayments,
    endIndexPayments
  );

  const totalPackages = packages.length;
  const totalPackagePages = Math.ceil(totalPackages / itemsPerPage);
  const startIndexPackages = (currentPagePackages - 1) * itemsPerPage;
  const endIndexPackages = startIndexPackages + itemsPerPage;
  const currentPackages = packages.slice(startIndexPackages, endIndexPackages);

  return (
    <main className="max-w-6xl w-full mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-bold">Quản lý thanh toán</h1>
      <section className="mx-auto max-w-4xl flex flex-col space-y-3">
        {loadingRevenue ? (
          <div className="text-center font-semibold text-lg text-gray-600">
            Đang tải...
          </div>
        ) : errorRevenue ? (
          <div className="text-center font-semibold text-lg text-red-600">
            {errorRevenue}
          </div>
        ) : (
          <>
            <div className="flex border-2 border-gray-200 rounded-xl space-x-5 shadow-md p-5 items-center justify-around">
              <div className="flex gap-2 items-center justify-center text-md text-gray-600 font-semibold">
                <span>Tổng số giao dịch:</span>
                <span className="font-bold text-[#2C99E2]">
                  {revenue.numberTransaction}
                </span>
              </div>
              <div className="flex gap-2 items-center text-md justify-center text-gray-600 font-semibold">
                <span>Doanh thu:</span>
                <span className="font-bold text-[#2C99E2]">
                  {formatCurrency(revenue.totalAmount)}
                </span>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="flex flex-col py-5 px-8 gap-5 border-2 border-gray-200 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">Danh sách giao dịch</h1>
        <div className="flex flex-row gap-4 w-full px-6">
          <SearchBar
            text="Tìm kiếm giao dịch theo id hoặc tên người dùng"
            focusBorderColor="focus:ring-gray-400"
            value={searchQueryPayments}
            onChange={(e) => setSearchQueryPayments(e.target.value)}
          />
        </div>
        {loadingTransaction ? (
          <div className="text-center font-semibold text-lg text-gray-600">
            Đang tải...
          </div>
        ) : errorTransaction ? (
          <div className="text-center font-semibold text-lg text-red-600">
            {errorTransaction}
          </div>
        ) : (
          <>
            <table className="w-full min-w-[600px] text-center border-2 border-gray-300 rounded-2xl overflow-hidden border-separate border-spacing-0">
              <thead className="bg-gray-200">
                <tr className="text-black font-bold">
                  <th className="py-3 px-4">Payment ID</th>
                  <th className="py-3 px-4">Tên người dùng</th>
                  <th className="py-3 px-4">Số tiền</th>
                  <th className="py-3 px-4">Ngày giao dịch</th>
                  <th className="py-3 px-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.length > 0 ? (
                  currentPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-100">
                      <td className="px-4 py-4 text-gray-600 font-semibold">
                        {payment.id}
                      </td>
                      <td className="px-4 py-4 text-gray-600 font-semibold">
                        {payment.userName}
                      </td>
                      <td className="px-4 py-4 font-bold text-[#2C99E2]">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-4 py-4 text-gray-600 font-semibold">
                        {formatDate(payment.date)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Button
                          text="Xem Chi tiết"
                          variant="primary"
                          size="sm"
                          icon={<FontAwesomeIcon icon="fa-solid fa-eye" />}
                          onClick={() => setShowDetailPayment(true)}
                        />
                        <DetailPayment
                          show={showDetailPayment}
                          onClose={() => setShowDetailPayment(false)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 text-gray-600 font-semibold"
                    >
                      Không tìm thấy giao dịch phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {totalPayments > 0 && (
              <div className="flex justify-between items-center p-4">
                <span className="text-sm text-gray-600 font-semibold">
                  Hiển thị từ {startIndexPayments + 1} đến{" "}
                  {Math.min(endIndexPayments, totalPayments)} trong số{" "}
                  {totalPayments} giao dịch
                </span>
                <Pagination
                  currentPage={currentPagePayments}
                  totalPages={totalPaymentPages}
                  onPageChange={(page) => setCurrentPagePayments(page)}
                />
              </div>
            )}
          </>
        )}
      </section>

      <section className="flex flex-col py-5 px-8 gap-5 border-2 border-gray-200 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">Danh sách gói học</h1>
        <div className="flex flex-row gap-4 w-full px-6 py-3">
          <SearchBar
            text="Tìm kiếm gói học theo tên"
            focusBorderColor="focus:ring-gray-400"
          />
          <Button
            text="Thêm mới"
            variant="primary"
            size="sm"
            icon={<FontAwesomeIcon icon="fa-solid fa-plus" />}
            onClick={() => {
              setCurrentPackage(null);
              setShowForm(true);
            }}
          />
        </div>
        <table className="w-full min-w-[600px] text-center border-2 border-gray-300 rounded-2xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-gray-200">
            <tr className="text-black font-bold">
              <th className="py-3 px-4">Package ID</th>
              <th className="py-3 px-4">Tên gói</th>
              <th className="py-3 px-4">Mô tả</th>
              <th className="py-3 px-4">Chi phí</th>
              <th className="py-3 px-4">Thời hạn</th>
              <th className="py-3 px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentPackages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-gray-100">
                <td className="px-4 py-4 text-gray-600 font-semibold">
                  {pkg.id}
                </td>
                <td className="px-4 py-4 font-bold text-[#2C99E2]">
                  {pkg.name}
                </td>
                <td className="px-4 py-4 text-gray-600 font-semibold">
                  {pkg.description}
                </td>
                <td className="px-4 py-4 font-bold text-[#2C99E2]">
                  {pkg.cost}
                </td>
                <td className="px-4 py-4 text-gray-600 font-semibold">
                  {pkg.duration}
                </td>
                <td className="px-4 py-4 text-center flex items-center justify-center gap-2">
                  <Button
                    text="Chỉnh sửa"
                    variant="default"
                    size="sm"
                    icon={<FontAwesomeIcon icon="fa-solid fa-pencil" />}
                    onClick={() => handleEditPackage(pkg)}
                  />
                  <Button
                    text="Xóa"
                    variant="delete"
                    size="sm"
                    hoverBg="hover:bg-red-700"
                    icon={<FontAwesomeIcon icon="fa-solid fa-trash" />}
                    onClick={() => handleDeletePackage(pkg)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPackages > 0 && (
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-600 font-semibold">
              Hiển thị từ {startIndexPackages + 1} đến{" "}
              {Math.min(endIndexPackages, totalPackages)} trong số{" "}
              {totalPackages} gói học
            </span>
            <Pagination
              currentPage={currentPagePackages}
              totalPages={totalPackagePages}
              onPageChange={(page) => setCurrentPagePackages(page)}
            />
          </div>
        )}
      </section>

      <PackageForm
        show={showForm}
        onClose={() => {
          setShowForm(false);
          setCurrentPackage(null);
        }}
        packageData={currentPackage}
        onSubmit={handleAddOrUpdatePackage}
      />

      {showModal && (
        <ModalConfirm
          show={showModal}
          title="Xác nhận xóa gói học"
          description={`Bạn có chắc chắn muốn xóa gói học '${packageToDelete?.name}'? Hành động này không thể hoàn tác.`}
          hoverBgConfirm="hover:bg-red-700"
          onCancel={handleCancel}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  );
};

export default ManagePayment;
