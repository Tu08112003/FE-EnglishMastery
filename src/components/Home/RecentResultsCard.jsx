import React from 'react';
import Button from '../Button.jsx';

const RecentResultsCard = ({ data = [] }) => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
      <div className="max-h-[70vh] overflow-auto">
        <table className="w-full min-w-[600px] text-center">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr className="text-black font-bold">
              <th className="py-3 px-4 rounded-tl-2xl">ID</th>
              <th className="py-3 px-4">Điểm số</th>
              <th className="py-3 px-4">Ngày nộp bài</th>
              <th className="py-3 px-4 rounded-tr-2xl">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((result, index) => {
              const isLast = index === data.length - 1;
              const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-gray-100';
              return (
                <tr
                  key={index}
                  className={`${rowBg} hover:bg-[#E6F0FA] transition-colors`}
                >
                  <td
                    className={`py-3 px-4 text-gray-600 font-medium ${
                      isLast ? 'rounded-bl-2xl' : ''
                    }`}
                  >
                    {result.id}
                  </td>
                  <td className="py-3 px-4 text-[#2C99E2] font-bold">
                    {`${result.score}/${result.total}`}
                  </td>
                  <td className="py-3 px-4 text-gray-600 font-medium">
                    {result.date}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      isLast ? 'rounded-br-2xl' : ''
                    }`}
                  >
                    <Button text="Xem chi tiết" variant="primary" size="sm" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentResultsCard;
