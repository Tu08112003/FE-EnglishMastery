import React from 'react';
import ModalWrapper from '../ModalWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DetailQuestionDisplay from './DetailQuestionDisplay';

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
                style={{ color: '#565E6C' }}
              />
            </button>
          </div>
      
          <DetailQuestionDisplay
            part={item.part} 
            questionData={item.questionData}
            userAnswer={item.userAnswer}
            correctAnswer={item.correctAnswer}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DetailExamResult;