import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalWrapper from "../ModalWrapper.jsx";
import Button from "../Button.jsx";

const AddExam = ({ show, onClose, onImport }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!show) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type !== "application/json") {
      alert("Vui lòng chọn file JSON hợp lệ!");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const handleImport = () => {
    if (selectedFile) {
      onImport(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  // Hàm đóng modal và reset file
  const handleClose = () => {
    setSelectedFile(null); // Reset file khi đóng modal
    onClose();
  };

  return (
    <ModalWrapper show={show} onClose={handleClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl py-6 px-10 w-full max-w-2xl shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Thêm mới đề thi</h2>
          <button
            onClick={handleClose}
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
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Chọn file JSON
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full hidden cursor-pointer"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="w-full p-2 border-2 border-gray-300 rounded-lg bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50"
            >
              <span className="text-gray-600">
                {selectedFile ? selectedFile.name : "Chọn file JSON..."}
              </span>
              <FontAwesomeIcon icon="fa-solid fa-upload" className="text-gray-500" />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button text="Hủy" variant="default" size="sm" onClick={handleClose} />
          <Button
            text="Thêm"
            variant="primary"
            size="sm"
            onClick={handleImport}
            disabled={!selectedFile}
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddExam;