import React, { useState } from "react";
import ModalWrapper from "../components/ModalWrapper";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalConfirm from "../components/ConfirmModal";

const Payment = ({ show, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

  return (
    <>
      <ModalWrapper show={show} onClose={onClose}>
        <div
          className="w-full max-w-2xl max-h-[100vh] border-2 border-gray-200 shadow-md rounded-2xl p-3 bg-white overflow-y-auto custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-5 p-4">
            <div className="flex items-center justify-between w-full mb-1">
              <h1 className="text-2xl flex-1 font-bold text-center">
                Thanh toán
              </h1>
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
            <div className="w-full flex items-center justify-center relative min-h-[256px]">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
              <img
                className={`w-sm h-sm max-w-full object-contain ${loading ? 'opacity-0' : 'opacity-100'}`}
                src="https://apiqr.web2m.com/api/generate/MBB/1512307060303/TRAN DUY THUC?amount=10000&memo=&is_mask=0&bg=3"
                alt="QR Code"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
            <Button
              text="Đã thanh toán"
              size="lg"
              variant="primary"
              onClick={handleShowModal}
            />
          </div>
        </div>
      </ModalWrapper>

      {showModal && (
        <ModalConfirm
          show={showModal}
          onClose={() => setShowModal(false)}
          title="Xác nhận thanh toán"
          description="Bạn có chắc chắn đã thanh toán"
          confirmVariant="primary"
          onCancel={handleCloseModal}
          className="z-[1000]"
        />
      )}
    </>
  );
};

export default Payment;