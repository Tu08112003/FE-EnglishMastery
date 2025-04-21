import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button.jsx';
import ModalWrapper from '../ModalWrapper.jsx';

const VocabularyForm = ({ show, onClose, vocabularyData, onSubmit }) => {
  const [word, setWord] = useState(vocabularyData?.word || '');
  const [meaning, setMeaning] = useState(vocabularyData?.meaning || '');
  const [ipa, setIpa] = useState(vocabularyData?.ipa || '');
  const [example, setExample] = useState(vocabularyData?.example || '');
  const [topic, setTopic] = useState(vocabularyData?.topic || '');
  const [status, setStatus] = useState(vocabularyData?.status || '');
  const [note, setNote] = useState(vocabularyData?.note || '');

  // Đồng bộ dữ liệu khi vocabularyData thay đổi
  useEffect(() => {
    setWord(vocabularyData?.word || '');
    setMeaning(vocabularyData?.meaning || '');
    setIpa(vocabularyData?.ipa || '');
    setExample(vocabularyData?.example || '');
    setTopic(vocabularyData?.topic || '');
    setStatus(vocabularyData?.status || '');
    setNote(vocabularyData?.note || '');
  }, [vocabularyData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      id: vocabularyData?.id || null, // ID sẽ được tạo ở Note nếu là thêm mới
      word,
      meaning,
      ipa,
      example,
      topic,
      status,
      note,
    };
    onSubmit(formData);
    onClose(); // Đóng form sau khi submit
  };

  return (
    <ModalWrapper show={show} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl mx-auto bg-white border-2 border-gray-200 shadow-lg rounded-2xl px-6 sm:px-4 pt-6 pb-6 max-h-[95vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex flex-col items-center p-3">
          <div className="flex items-center justify-between w-full mb-1">
            <h2 className="text-xl font-medium text-center sm:text-2xl">
              {vocabularyData ? 'Chỉnh sửa từ vựng' : 'Thêm từ vựng'}
            </h2>
            <button
              onClick={onClose}
              type="button"
              className="flex items-center justify-center w-8 h-8 hover:bg-gray-200 hover:rounded-lg transition-all duration-200 ease-in-out"
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" size="lg" style={{ color: '#565E6C' }} />
            </button>
          </div>
          <p className="flex justify-start w-full text-sm text-muted-foreground text-gray-600 font-medium">
            {vocabularyData
              ? 'Chỉnh sửa thông tin từ vựng'
              : 'Nhập thông tin từ vựng bạn muốn lưu trữ và học tập'}
          </p>
        </div>
        {/* Từ vựng */}
        <div className="flex flex-col space-y-3 items-center justify-center w-full mb-4 p-3">
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Từ vựng</label>
            <input
              type="text"
              className="flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              required
            />
          </div>
          {/* Nghĩa */}
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Nghĩa</label>
            <input
              type="text"
              className="flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              required
            />
          </div>
          {/* Phát âm */}
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Phát âm</label>
            <input
              type="text"
              className="flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={ipa}
              onChange={(e) => setIpa(e.target.value)}
            />
          </div>
          {/* Ví dụ */}
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Ví dụ</label>
            <textarea
              rows={5}
              className="flex-1 w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={example}
              onChange={(e) => setExample(e.target.value)}
            />
          </div>
          {/* Chủ đề */}
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Chủ đề</label>
            <select
              className="flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="">-- Chọn chủ đề --</option>
              <option value="work">Công việc</option>
              <option value="life">Cuộc sống</option>
              <option value="study">Học tập</option>
            </select>
          </div>
          {/* Trạng thái */}
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Trạng thái</label>
            <select
              className="flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">-- Chọn trạng thái --</option>
              <option value="learning">Đang học</option>
              <option value="learned">Đã học</option>
            </select>
          </div>
          {/* Ghi chú */}
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Ghi chú</label>
            <textarea
              rows={5}
              className="flex-1 p-3 w-full border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        {/* Button */}
        <div className="flex gap-4 justify-end p-3">
          <Button text="Hủy" variant="default" size="sm" onClick={onClose} />
          <Button text="Lưu" variant="primary" size="sm" type="submit" />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default VocabularyForm;