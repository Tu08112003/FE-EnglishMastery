import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button.jsx';
import ModalWrapper from '../ModalWrapper.jsx';
import { addVocabulary } from '../../redux/slice/noteSlice.js';
import { toast } from 'react-toastify';

const VocabularyForm = ({ show, onClose, vocabularyData }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('access_token') || '';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [word, setWord] = useState(vocabularyData?.word || '');
  const [description, setDescription] = useState(vocabularyData?.description || '');
  const [pronounce, setPronounce] = useState(vocabularyData?.pronounce || '');
  const [example, setExample] = useState(vocabularyData?.example || '');
  const [learned, setLearned] = useState(vocabularyData?.learned);
  const [note, setNote] = useState(vocabularyData?.note || '');

  // Đồng bộ dữ liệu khi vocabularyData thay đổi
  useEffect(() => {
    setWord(vocabularyData?.word || '');
    setDescription(vocabularyData?.description || '');
    setPronounce(vocabularyData?.pronounce || '');
    setExample(vocabularyData?.example || '');
    setLearned(vocabularyData?.learned);
    setNote(vocabularyData?.note || '');
  }, [vocabularyData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = {
      word,
      description,
      pronounce,
      learned,
      note,
      example,
    };
    try {
      await dispatch(addVocabulary({ ...formData, accessToken })).unwrap();
      onClose();
    } catch (err) {
      console.error('Error adding vocabulary:', err);
      toast.error("Không thể thêm mới từ vựng. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
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
        {/* Input Fields */}
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
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Nghĩa</label>
            <input
              type="text"
              className="flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Phát âm</label>
            <input
              type="text"
              className="flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={pronounce}
              onChange={(e) => setPronounce(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Ví dụ</label>
            <textarea
              rows={5}
              className="flex-1 w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={example}
              onChange={(e) => setExample(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Trạng thái</label>
            <select
              className="flex-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={learned ? 'learned' : 'learning'}
              onChange={(e) => setLearned(e.target.value === 'learned')}
            >
              <option value="learning">Chưa học</option>
              <option value="learned">Đã học</option>
            </select>
          </div>
          <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="w-full sm:w-1/5 font-semibold">Ghi chú</label>
            <textarea
              rows={5}
              className="flex-1 w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
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
