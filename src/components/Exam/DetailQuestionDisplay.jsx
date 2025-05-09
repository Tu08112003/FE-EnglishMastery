import React from "react";
import AudioPlayer from "./AudioPlayer";
import AnswerOptions from "./AnswerOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DetailQuestionDisplay = ({
  part,
  questionData,
  userAnswer,
  correctAnswer,
}) => {
  const audioSrc = questionData.audio || "";

  if (part === 1) {
    return (
      <div className="w-full flex flex-col gap-6 p-5">
        {audioSrc ? (
          <AudioPlayer audioSrc={audioSrc} autoPlay={true} />
        ) : (
          <p className="text-red-600 font-semibold">Không có âm thanh</p>
        )}
        <div className="flex gap-10 mx-3">
          <img
            src={questionData.image}
            alt="Question"
            className="mb-4 max-w-full rounded-lg"
          />
          <div key={questionData.idQuestion} className="mb-3">
            <p className="text-md font-bold mb-2 flex items-center gap-1.5">
              <FontAwesomeIcon
                icon="fa-regular fa-bookmark"
                style={{ color: "#2C99E2" }}
              />{" "}
              {parseInt(questionData.idQuestion) + 1}.
            </p>
            <AnswerOptions
              options={questionData.options}
              userAnswer={userAnswer}
              correctAnswer={correctAnswer}
            />
          </div>
        </div>
      </div>
    );
  } else if (part === 2) {
    return (
      <div className="w-full h-full py-5 px-6">
        {audioSrc ? (
          <AudioPlayer audioSrc={audioSrc} autoPlay={true} />
        ) : (
          <p className="text-red-600 font-semibold">Không có âm thanh</p>
        )}
        <div key={questionData.idQuestion} className="mb-3">
          <p className="text-md font-bold mb-2 flex items-center gap-1.5">
            <FontAwesomeIcon
              icon="fa-regular fa-bookmark"
              style={{ color: "#2C99E2" }}
            />{" "}
            {parseInt(questionData.idQuestion) + 1}.
          </p>
          <AnswerOptions
            options={questionData.options}
            userAnswer={userAnswer}
            correctAnswer={correctAnswer}
          />
        </div>
      </div>
    );
  } else if (part === 3 || part === 4) {
    return (
      <div className="w-full h-full p-5 flex flex-col gap-4">
        {audioSrc ? (
          <AudioPlayer audioSrc={audioSrc} autoPlay={true} />
        ) : (
          <p className="text-red-600 font-semibold">Không có âm thanh</p>
        )}
        {questionData.image ? (
          <div className="w-full h-full flex flex-col gap-5">
            <div className="w-full flex items-center p-2 justify-center border-2 border-gray-300 rounded-lg">
              <img
                src={questionData.image}
                alt="Question"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="w-full px-3">
              <div className="mb-3">
                <p className="text-md font-bold mb-2 flex items-center gap-1.5">
                  <FontAwesomeIcon
                    icon="fa-regular fa-bookmark"
                    style={{ color: "#2C99E2" }}
                  />
                  {parseInt(questionData.idQuestion) + 1}.{" "}
                  {questionData.questionText}
                </p>
                <AnswerOptions
                  // options={q.options}
                  userAnswer={userAnswer}
                  correctAnswer={correctAnswer}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col px-2">
            <div className="mb-3">
              <p className="text-md font-bold mb-2 flex items-center gap-1.5">
                <FontAwesomeIcon
                  icon="fa-regular fa-bookmark"
                  style={{ color: "#2C99E2" }}
                />
                {parseInt(questionData.idQuestion) + 1}.{" "}
                {questionData.questionText}
              </p>
              <AnswerOptions
                // options={q.options}
                userAnswer={userAnswer}
                correctAnswer={correctAnswer}
              />
            </div>
          </div>
        )}
      </div>
    );
  } else if (part === 5) {
    return (
      <div className="w-full h-full flex flex-col mx-4 p-3">
        <p className="text-md font-bold mb-2 flex items-center gap-1.5">
          <FontAwesomeIcon
            icon="fa-regular fa-bookmark"
            style={{ color: "#2C99E2" }}
          />
          {parseInt(questionData.idQuestion) + 1}. {questionData.questionText}
        </p>
        <AnswerOptions
          options={questionData.options}
          userAnswer={userAnswer}
          correctAnswer={correctAnswer}
        />
      </div>
    );
  } else if (part === 6 || part === 7) {
  
    const passageToDisplay = questionData.passageText || "";
    let htmlPassage = passageToDisplay;

    if (part === 6 && passageToDisplay && typeof passageToDisplay === 'string') {
        const questionDisplayNumber = questionData.idQuestion + 1;
        const placeholderRegex = /_____\((\d+)\)/g; 

        htmlPassage = passageToDisplay.replace(placeholderRegex, (match, p1) => {
            if (parseInt(p1) === questionDisplayNumber) {
                return `<strong class="text-gray-700">(${questionDisplayNumber})</strong>`;
            }
            return match; 
        });
    }

    return (
      <div className="w-full flex flex-col p-4 gap-4"> 
        {passageToDisplay && (
             <div className="w-full p-3 border border-gray-300 rounded-lg hide-scrollbar overflow-y-auto max-h-[45vh] bg-gray-50">
                <h2 className="text-sm font-semibold mb-2 text-gray-700">
                  {part === 6 ? "Complete the following text." : "Read the following text."}
                </h2>
                <div className="whitespace-pre-line text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: htmlPassage }} />
            </div>
        )}
        <div className="w-full"> 
            <p className="text-md font-bold mb-2 flex items-center gap-1.5">
            <FontAwesomeIcon
                icon="fa-regular fa-bookmark"
                style={{ color: "#2C99E2" }}
            />
            {questionData.idQuestion + 1}. {questionData.questionText}
            </p>
            <AnswerOptions
                // options={displayOptions}
                userAnswer={userAnswer}
                correctAnswer={correctAnswer}
                part={part}
            />
        </div>
      </div>
    );
  }
};

export default DetailQuestionDisplay;
