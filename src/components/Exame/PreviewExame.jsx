import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../Button.jsx'

const testStructure = {
  listening: [
    { part: "Part 1", description: "Mô tả hình ảnh", number: "6 câu" },
    { part: "Part 2", description: "Hỏi đáp", number: "25 câu" },
    { part: "Part 3", description: "Hội thoại ngắn", number: "39 câu" },
    { part: "Part 4", description: "Bài nói chuyện ngắn", number: "30 câu" }
  ],
  reading: [
    { part: "Part 5", description: "Hoàn thành câu", number: "30 câu" },
    { part: "Part 6", description: "Hoàn thành đoạn văn", number: "18 câu" },
    { part: "Part 7", description: "Đọc hiểu đoạn văn", number: "52 câu" }
  ]
}

const PreviewExame = ({ title, onClose }) => {
  return (
    <div className='fixed inset-0 w-full h-full flex items-center justify-center bg-black/30 z-10 p-4'>
      <form className='container mx-auto w-full max-w-3xl bg-white border-2 border-gray-200 shadow-lg rounded-2xl px-6 py-6 max-h-[95vh] overflow-y-auto custom-scrollbar'>

        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-semibold'>{title}</h1>
          <button onClick={onClose} type="button" className='flex items-center justify-center w-8 h-8 hover:bg-gray-200 rounded-full transition'>
            <FontAwesomeIcon icon="fa-solid fa-xmark" size="lg" style={{ color: "#565E6C" }} />
          </button>
        </div>

        <div className='flex flex-col gap-6'>

          {/* Listening */}
          <div className='w-full overflow-x-auto'>
            <table className='w-full text-sm md:text-base border-collapse table-auto'>
              <thead>
                <tr className='border-b-2 text-base md:text-lg border-gray-200 font-bold text-[#2C99E2]'>
                  <th className='px-4 py-2 text-left whitespace-nowrap'>Phần nghe: 45 phút</th>
                  <th className='w-full'></th>
                  <th className='px-4 py-2 text-right whitespace-nowrap'>100 câu</th>
                </tr>
              </thead>
              <tbody>
                {testStructure.listening.map((item, index) => (
                  <tr key={index} className='border-b-2 cursor-pointer border-gray-200 hover:bg-blue-50 transition'>
                    <td className='px-4 py-2'>{item.part}</td>
                    <td className='px-4 py-2'>{item.description}</td>
                    <td className='px-4 py-2 text-right'>{item.number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reading */}
          <div className='w-full overflow-x-auto'>
            <table className='w-full text-sm md:text-base border-collapse table-auto'>
              <thead>
                <tr className='border-b-2 text-base md:text-lg border-gray-200 font-bold text-[#2C99E2]'>
                  <th className='px-4 py-2 text-left whitespace-nowrap'>Phần đọc: 75 phút</th>
                  <th className='w-full'></th>
                  <th className='px-4 py-2 text-right whitespace-nowrap'>100 câu</th>
                </tr>
              </thead>
              <tbody>
                {testStructure.reading.map((item, index) => (
                  <tr key={index} className='border-b-2 cursor-pointer border-gray-200 hover:bg-blue-50 transition'>
                    <td className='px-4 py-2'>{item.part}</td>
                    <td className='px-4 py-2'>{item.description}</td>
                    <td className='px-4 py-2 text-right'>{item.number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Time*/}
        <div className='flex flex-col sm:flex-row justify-end items-start sm:items-center gap-2 mt-6'>
            <span className='font-medium'>Chọn thời gian làm bài</span>
            <select
                className='border-2 border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#2C99E2] focus:ring-1 focus:ring-[#2C99E2]'  
                defaultValue="120"
            >
                {[...Array(12)].map((_, i) => {
                const time = (i + 1) * 10;
                return <option key={time} value={time}>{time} phút</option>
                })}
            </select>
        </div>

        {/* Buttons */}
        <div className='flex justify-end gap-2 items-center mt-6'>
          <Button
            text="Quay lại"
            variant='default'
            icon={<FontAwesomeIcon icon="fa-solid fa-angle-left" />}
            size='sm'
            onClick={onClose}
          />
          <Button
            text="Bắt đầu làm"
            variant='primary'
            icon={<FontAwesomeIcon icon="fa-solid fa-angle-right" />}
            size='sm'
          />
        </div>
      </form>
    </div>
  )
}

export default PreviewExame
