import React, { useState, useEffect } from "react";
import StatisticsCard from "../../components/StatisticsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNumberOfTests,
  fetchNumberOfUsers,
  fetchAllHistoryTests,
} from "../../redux/slice/adminSlice";
const Dashboard = () => {
  const { numberOfUsers, numberOfTests, historyTests, loading } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNumberOfTests()).unwrap();
    dispatch(fetchNumberOfUsers()).unwrap();
    dispatch(fetchAllHistoryTests());
  }, [dispatch]);
  const recentPayments = [
    {
      id: "PAY001",
      name: "Nguyễn Văn A",
      amount: "1.000.000 VNĐ",
      date: "2025-04-01",
    },
    {
      id: "PAY002",
      name: "Trần Thị B",
      amount: "500.000 VNĐ",
      date: "2025-04-05",
    },
    {
      id: "PAY003",
      name: "Lê Văn C",
      amount: "750.000 VNĐ",
      date: "2025-04-10",
    },
  ];

  const [currentPagePayments, setCurrentPagePayments] = useState(1);
  const [currentPageExams, setCurrentPageExams] = useState(1);
  const itemsPerPage = 2;

  const totalPayments = recentPayments.length;
  const totalPaymentPages = Math.ceil(totalPayments / itemsPerPage);
  const startIndexPayments = (currentPagePayments - 1) * itemsPerPage;
  const endIndexPayments = startIndexPayments + itemsPerPage;
  const currentPayments = recentPayments.slice(
    startIndexPayments,
    endIndexPayments
  );

  const totalExams = historyTests.length;
  const totalExamPages = Math.ceil(totalExams / itemsPerPage);
  const startIndexExams = (currentPageExams - 1) * itemsPerPage;
  const endIndexExams = startIndexExams + itemsPerPage;
  const currentExams = historyTests.slice(startIndexExams, endIndexExams);

  return (
    <main className="max-w-6xl w-full mx-auto space-y-6 p-4">
      <section className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {loading ? (
          <div className="text-lg text-center font-semibold text-gray-600">
            Đang tải dữ liệu...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center items-center">
            <StatisticsCard
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-file"
                  size="4x"
                  style={{ color: "#2C99E2" }}
                />
              }
              value={numberOfTests}
              description="Số lượng đề thi"
            />
            <StatisticsCard
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-dollar-sign"
                  size="4x"
                  style={{ color: "#2C99E2" }}
                />
              }
              value="5.000.000 VNĐ"
              description="Doanh thu"
            />
            <StatisticsCard
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-users"
                  size="4x"
                  style={{ color: "#2C99E2" }}
                />
              }
              value={numberOfUsers}
              description="Người dùng"
            />
          </div>
        )}
      </section>

      <section className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Hoạt động gần đây</h1>
        <div className="space-y-6 border-2 border-gray-200 rounded-lg px-10 py-8 shadow-xl">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold mb-2">Giao dịch gần đây</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-center border-2 border-gray-300 rounded-2xl overflow-hidden border-separate border-spacing-0">
                <thead className="bg-gray-200">
                  <tr className="text-black font-bold">
                    <th className="py-3 px-4">Payment ID</th>
                    <th className="py-3 px-4">Tên người dùng</th>
                    <th className="py-3 px-4">Số tiền</th>
                    <th className="py-3 px-4">Ngày giao dịch</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 text-gray-600 font-semibold">
                        {payment.id}
                      </td>
                      <td className="px-4 py-2 text-gray-600 font-semibold">
                        {payment.name}
                      </td>
                      <td className="px-4 py-2 font-bold text-[#2C99E2]">
                        {payment.amount}
                      </td>
                      <td className="px-4 py-2 text-gray-600 font-semibold">
                        {payment.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold mb-2">
              Lịch sử làm đề gần đây
            </h2>
            {loading ? (
              <div className="text-lg text-center font-semibold text-gray-600">
                Đang tải dữ liệu...
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-center border-2 border-gray-300 rounded-2xl overflow-hidden border-separate border-spacing-0">
                    <thead className="bg-gray-200">
                      <tr className="text-black font-bold">
                        <th className="py-3 px-4">Exam ID</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Điểm</th>
                        <th className="py-3 px-4">Ngày làm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentExams.map((exam) => (
                        <tr key={exam.id} className="hover:bg-gray-100">
                          <td className="px-4 py-2 font-semibold text-gray-600">
                            {exam.id}
                          </td>
                          <td className="px-4 py-2 font-semibold text-gray-600">
                            {exam.email}
                          </td>
                          <td className="px-4 py-2 font-bold text-[#2C99E2]">
                            {exam.score}/990
                          </td>
                          <td className="px-4 py-2 font-semibold text-gray-600">
                            {exam.dateTest}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalExams > 0 && (
                  <div className="flex justify-between items-center p-4">
                    <span className="text-sm text-gray-600 font-semibold">
                      Hiển thị từ {startIndexExams + 1} đến{" "}
                      {Math.min(endIndexExams, totalExams)} trong số{" "}
                      {totalExams} bài thi
                    </span>
                    <Pagination
                      currentPage={currentPageExams}
                      totalPages={totalExamPages}
                      onPageChange={(page) => setCurrentPageExams(page)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
