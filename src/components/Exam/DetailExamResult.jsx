import React from 'react'
import ModalWrapper from '../ModalWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DetailExamResult = ({ show, onClose, item }) => {
    return (
      <ModalWrapper show={show} onClose={onClose}>
        <div
          className="w-full max-w-2xl mx-auto bg-white border-2 border-gray-200 shadow-lg rounded-2xl px-6 sm:px-4 pt-6 pb-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center p-3 gap-4">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl font-medium sm:text-2xl">
                Question {item.id}
              </h2>
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
            <p className="text-gray-600 font-bold text-lg w-full px-2">{item.question}</p>
            {item.image && (
              <div className="mb-4">
                <img
                  src={item.image}
                  alt={`Question ${item.id} image`}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            )}
            <div className="space-y-2 px-2 w-full">
              {["A", "B", "C", "D"].map((option) => (
                <div
                  key={option}
                  className={`p-2 rounded ${
                    item.correctAnswer === option
                      ? "bg-green-100 text-green-800 font-semibold"
                      : item.userAnswer === option && !item.correct
                      ? "bg-red-100 text-red-800 font-semibold"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {option}: {item.options[option]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModalWrapper>
    );
  };

export default DetailExamResult