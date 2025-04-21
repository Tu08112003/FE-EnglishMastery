import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../components/SearchBar.jsx';
import VocabularyCard from '../components/Note/VocabularyCard.jsx';
import VocabularyForm from '../components/Note/VocabularyForm.jsx';
import ModalConfirm from '../components/ConfirmModal.jsx';

const Note = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vocabularyToDelete, setVocabularyToDelete] = useState(null);
  const [currentVocabulary, setCurrentVocabulary] = useState(null);

  // Mock data cho từ vựng
  const [vocabularies, setVocabularies] = useState([
    {
      id: '1',
      word: 'Collaborate',
      ipa: '/kəˈlæbəreɪt/',
      meaning: 'hợp tác',
      example: 'Our teams will collaborate on this project.',
      note: 'Thường dùng trong môi trường làm việc',
      topic: 'Công việc',
      status: 'Chưa học',
    },
    {
      id: '2',
      word: 'Innovate',
      ipa: '/ˈɪnəveɪt/',
      meaning: 'đổi mới',
      example: 'The company aims to innovate its products.',
      note: 'Liên quan đến sáng tạo',
      topic: 'Công việc',
      status: 'Đã học',
    },
    {
      id: '3',
      word: 'Motivate',
      ipa: '/ˈmoʊtɪveɪt/',
      meaning: 'thúc đẩy',
      example: 'Good leaders motivate their teams.',
      note: 'Dùng trong quản lý',
      topic: 'Công việc',
      status: 'Đã học',
    },
  ]);

  const toggleFilter = () => setShowFilter((prev) => !prev);

  const handleAddOrUpdateVocabulary = (formData) => {
    if (formData.id) {
      // Cập nhật từ vựng
      setVocabularies(
        vocabularies.map((vocab) => (vocab.id === formData.id ? { ...formData } : vocab))
      );
    } else {
      // Thêm từ vựng mới
      const newVocabulary = {
        ...formData,
        id: `${vocabularies.length + 1}`, // Tạo ID đơn giản, thay bằng UUID hoặc API sau này
      };
      setVocabularies([...vocabularies, newVocabulary]);
    }
    setCurrentVocabulary(null);
  };

  const handleEditVocabulary = (vocabulary) => {
    setCurrentVocabulary(vocabulary);
    setShowAddForm(true);
  };

  const handleDelete = (vocabulary) => {
    setVocabularyToDelete(vocabulary);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setVocabularies(vocabularies.filter((vocab) => vocab.id !== vocabularyToDelete.id));
    setShowModal(false);
    setVocabularyToDelete(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setVocabularyToDelete(null);
  };

  return (
    <main className="container mx-auto py-6 px-4 flex-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-5">
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-3xl font-bold">Ghi chú từ vựng của bạn</h1>
          <p className="text-gray-600 font-medium">Lưu trữ và quản lý từ vựng Tiếng Anh dễ dàng</p>
        </div>
        <div className="flex justify-center">
          <Button
            text="Thêm từ mới"
            variant="primary"
            size="sm"
            icon={<FontAwesomeIcon icon="fa-solid fa-plus" size="md" style={{ color: '#ffffff' }} />}
            onClick={() => {
              setCurrentVocabulary(null);
              setShowAddForm(true);
            }}
          />
        </div>
      </div>

      {/* Status Card */}
      <div className="border-2 border-gray-200 shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <h2 className="text-gray-600 font-medium">Tổng số từ vựng</h2>
            <p className="text-2xl font-bold mt-2">{vocabularies.length}</p>
          </div>
          <div className="text-center">
            <h2 className="text-gray-600 font-medium">Số từ đã học</h2>
            <p className="text-2xl font-bold mt-2">
              {vocabularies.filter((v) => v.status === 'Đã học').length}/{vocabularies.length}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-gray-600 font-medium mb-2">Tiến độ học tập</h2>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black"
                style={{
                  width: `${
                    (vocabularies.filter((v) => v.status === 'Đã học').length / vocabularies.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <div className="font-bold mt-1 text-sm">
              {Math.round(
                (vocabularies.filter((v) => v.status === 'Đã học').length / vocabularies.length) * 100
              )}
              %
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-4 md:px-12">
        <SearchBar text="Tìm kiếm từ vựng" focusBorderColor="focus:ring-gray-400" />
        <div className="relative w-12 md:w-auto">
          <button
            onClick={toggleFilter}
            className="flex items-center justify-center w-full md:w-12 h-12 border-2 border-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-200 ease-in-out"
          >
            <FontAwesomeIcon icon="fa-solid fa-filter" size="lg" />
          </button>
          {showFilter && (
            <ul className="absolute top-14 -right-14 bg-white border-2 border-gray-200 rounded-lg shadow-lg w-40 z-10">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-medium">
                Trạng thái
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-medium">Chủ đề</li>
            </ul>
          )}
        </div>
      </div>

      {/* Vocabulary Cards */}
      <div className="mt-6 max-h-[calc(100vh-100px)] w-full p-2 overflow-y-auto">
        <div className="grid overflow-y-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vocabularies.map((vocab) => (
            <VocabularyCard
              key={vocab.id}
              word={vocab.word}
              ipa={vocab.ipa}
              meaning={vocab.meaning}
              example={vocab.example}
              note={vocab.note}
              topic={vocab.topic}
              status={vocab.status}
              onEdit={() => handleEditVocabulary(vocab)}
              onDelete={() => handleDelete(vocab)}
              onStudy={() => console.log('Study', vocab.word)}
            />
          ))}
        </div>
      </div>

      <VocabularyForm
        show={showAddForm}
        onClose={() => {
          setShowAddForm(false);
          setCurrentVocabulary(null);
        }}
        vocabularyData={currentVocabulary}
        onSubmit={handleAddOrUpdateVocabulary}
      />

      {showModal && (
        <ModalConfirm
          show={showModal}
          onClose={() => setShowModal(false)}
          title="Xác nhận xóa từ vựng"
          description={`Bạn có chắc chắn muốn xóa từ vựng '${vocabularyToDelete?.word}'? Hành động này không thể hoàn tác.`}
          onCancel={handleCancel}
          onConfirm={handleConfirmDelete}
          hoverBgConfirm="hover:bg-red-700"
        />
      )}
    </main>
  );
};

export default Note;