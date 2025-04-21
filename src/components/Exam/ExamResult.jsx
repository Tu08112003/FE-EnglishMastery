import React from "react";
import image_result from "../../assets/images/img-result-test.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import { Link } from "react-router-dom";
const ExamResult = () => {
  return (
    <main className="container mx-auto py-10 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl border-2 border-gray-300 shadow-lg p-8 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Test 1 Practice 2024
        </h1>

        <div className="flex flex-col md:flex-row gap-7 w-full">
          <div className="md:w-1/3 border-2 border-gray-300 rounded-2xl">
            <img
              src={image_result}
              alt="Kết quả bài thi"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>

          <div className="md:w-2/3 grid grid-cols-2 gap-6 text-sm sm:text-base">
            <div className="space-y-2">
              <div>
                <p className="text-gray-600">Tên người dùng:</p>
                <p className="font-semibold">Anhdaden</p>
              </div>
              <div>
                <p className="text-gray-600">Ngày làm:</p>
                <p className="font-semibold">16/4/2025</p>
              </div>
              <div>
                <p className="text-gray-600">Thời gian hoàn thành:</p>
                <p className="font-semibold">2:00:00</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-gray-600">Số câu đúng:</p>
                <p className="font-semibold text-green-600">2</p>
              </div>
              <div>
                <p className="text-gray-600">Số câu sai:</p>
                <p className="font-semibold text-red-500">3</p>
              </div>
              <div>
                <p className="text-gray-600">Số câu bỏ qua:</p>
                <p className="font-semibold">2</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-gray-600">Listening:</p>
                <p>
                  <span className="font-semibold ">30/100</span> |{" "}
                  <span className="font-semibold text-[#2C99E2]">300 điểm</span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">Reading:</p>
                <p>
                  <span className="font-semibold ">30/100</span> |{" "}
                  <span className="font-semibold text-[#2C99E2]">300 điểm</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
              <div className="text-center">
                <p className="text-gray-600">Tổng điểm</p>
                <p className="text-4xl sm:text-5xl font-extrabold text-[#2C99E2]">
                  600
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-end w-full">
          <Button
            text="Hiện đáp án chi tiết"
            variant="default"
            size="sm"
            icon={<FontAwesomeIcon icon="fa-solid fa-book" />}
          />
          <Link to={"/exam"}>
            <Button
              text="Đề khác"
              variant="primary"
              size="sm"
              icon={<FontAwesomeIcon icon="fa-solid fa-angle-right" />}
            />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ExamResult;
