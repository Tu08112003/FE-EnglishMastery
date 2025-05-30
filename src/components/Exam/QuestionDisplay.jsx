import React from "react";
import AudioPlayer from "./AudioPlayer";
import AnswerOptions from "./AnswerOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionDisplay = ({ part, questionData, userAnswers, onAnswer, handleNext }) => {
      const audioSrc = questionData.audio || "";
      if (part === 1) {
        return (
          <div className="w-full h-full flex flex-col gap-6 p-4 lg:p-5">
            {audioSrc ? (
              <div className="hidden">
                <AudioPlayer
                  audioSrc={audioSrc}
                  autoPlay={true}
                  handleNext={handleNext}
                  part={part}
                />
              </div>
            ) : (
              <p className="text-red-600 font-semibold text-md">
                Không có âm thanh
              </p>
            )}
            <div className="w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-10 mx-2 lg:mx-3">
              <div className="w-full h-full max-h-[55vh] lg:max-h-[75vh] lg:w-1/2 border-2 border-gray-300 p-3 lg:p-4 rounded-lg">
                <img
                  src={questionData.image}
                  alt="Question"
                  className="mb-4 w-full h-full object-contain"
                />
              </div>
              <div key={questionData.idQuestion} className="w-full h-full lg:w-1/2">
                <p className="text-md font-bold mb-2 flex items-center gap-1.5">
                  <FontAwesomeIcon
                    icon="fa-regular fa-bookmark"
                    style={{ color: "#2C99E2" }}
                  />{" "}
                  {parseInt(questionData.idQuestion) + 1}.
                </p>
                <AnswerOptions
                  options={["A", "B", "C", "D"]}
                  selected={userAnswers[questionData.idQuestion] || ""}
                  onChange={(answer) => onAnswer(questionData.idQuestion, answer)}
                />
              </div>
            </div>
          </div>
        );
      } else if (part === 2) {
        return (
          <div className="w-full h-full py-4 lg:py-5 px-4 lg:px-6">
            {audioSrc ? (
              <div className="hidden">
                <AudioPlayer
                  audioSrc={audioSrc}
                  autoPlay={true}
                  handleNext={handleNext}
                  part={part}
                />
              </div>
            ) : (
              <p className="text-red-600 font-semibold text-md">
                Không có âm thanh
              </p>
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
                options={["A", "B", "C"]}
                selected={userAnswers[questionData.idQuestion] || ""}
                onChange={(answer) => onAnswer(questionData.idQuestion, answer)}
              />
            </div>
          </div>
        );
      } else if (part === 3 || part === 4) {
        return (
          <div className="w-full h-full p-4 lg:p-5 flex flex-col gap-4">
            {audioSrc ? (
              <div className="hidden">
                <AudioPlayer
                  audioSrc={audioSrc}
                  autoPlay={true}
                  handleNext={handleNext}
                  part={part}
                />
              </div>
            ) : (
              <p className="text-red-600 font-semibold text-md">
                Không có âm thanh
              </p>
            )}
            {questionData.image ? (
              <div className="w-full h-full flex flex-col lg:flex-row xl:flex-row gap-8 lg:gap-10 max-h-[75vh]">
                <div className="w-full lg:w-1/2 xl:w-1/2 h-full max-h-[70vh] lg:max-h-[75vh] flex items-center p-2 justify-center border-2 border-gray-300 rounded-lg">
                  <img
                    src={questionData.image}
                    alt="Question"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="w-full lg:w-1/2 xl:w-1/2 flex flex-col px-2 max-h-[70vh] lg:max-h-[75vh] overflow-y-auto lg:px-3">
                  {questionData.listQuestion?.length > 0 ? (
                    questionData.listQuestion.map((q) => {
                      const currentAnswerChar = userAnswers[q.idQuestion] || "";
                      let selectedValueForOptions = "";
                      if (currentAnswerChar === "A")
                        selectedValueForOptions = q.answerA;
                      else if (currentAnswerChar === "B")
                        selectedValueForOptions = q.answerB;
                      else if (currentAnswerChar === "C")
                        selectedValueForOptions = q.answerC;
                      else if (currentAnswerChar === "D")
                        selectedValueForOptions = q.answerD;

                      return (
                        <div key={q.idQuestion} className="mb-3">
                          <p className="text-md font-bold mb-2 flex items-center gap-1.5">
                            <FontAwesomeIcon
                              icon="fa-regular fa-bookmark"
                              style={{ color: "#2C99E2" }}
                            />
                            {parseInt(q.idQuestion) + 1}. {q.questionText}
                          </p>
                          <AnswerOptions
                            options={[
                              q.answerA,
                              q.answerB,
                              q.answerC,
                              q.answerD,
                            ].filter(Boolean)}
                            selected={selectedValueForOptions}
                            onChange={(answer) => onAnswer(q.idQuestion, answer)}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-red-600 text-md">
                      Không có câu hỏi nào cho phần {part}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col px-2">
                {questionData.listQuestion?.length > 0 ? (
                  questionData.listQuestion.map((q) => {
                    const currentAnswerChar = userAnswers[q.idQuestion] || "";
                    let selectedValueForOptions = "";
                    if (currentAnswerChar === "A")
                      selectedValueForOptions = q.answerA;
                    else if (currentAnswerChar === "B")
                      selectedValueForOptions = q.answerB;
                    else if (currentAnswerChar === "C")
                      selectedValueForOptions = q.answerC;
                    else if (currentAnswerChar === "D")
                      selectedValueForOptions = q.answerD;

                    return (
                      <div key={q.idQuestion} className="mb-3">
                        <p className="text-md font-bold mb-2 flex items-center gap-1.5">
                          <FontAwesomeIcon
                            icon="fa-regular fa-bookmark"
                            style={{ color: "#2C99E2" }}
                          />
                          {parseInt(q.idQuestion) + 1}. {q.questionText}
                        </p>
                        <AnswerOptions
                          options={[
                            q.answerA,
                            q.answerB,
                            q.answerC,
                            q.answerD,
                          ].filter(Boolean)}
                          selected={selectedValueForOptions}
                          onChange={(answer) => onAnswer(q.idQuestion, answer)}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-red-600 text-md">
                    Không có câu hỏi nào cho phần {part}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      } else if (part === 5) {
        const currentAnswerChar = userAnswers[questionData.idQuestion] || "";
        let selectedValueForOptions = "";
        if (currentAnswerChar === "A")
          selectedValueForOptions = questionData.answerA;
        else if (currentAnswerChar === "B")
          selectedValueForOptions = questionData.answerB;
        else if (currentAnswerChar === "C")
          selectedValueForOptions = questionData.answerC;
        else if (currentAnswerChar === "D")
          selectedValueForOptions = questionData.answerD;

        return (
          <div className="w-full h-full flex flex-col mx-3 lg:mx-4 p-3 lg:p-4">
            <p className="text-md font-bold mb-2 flex items-center gap-1.5">
              <FontAwesomeIcon
                icon="fa-regular fa-bookmark"
                style={{ color: "#2C99E2" }}
              />
              {parseInt(questionData.idQuestion) + 1}. {questionData.questionText}
            </p>
            <AnswerOptions
              options={[
                questionData.answerA,
                questionData.answerB,
                questionData.answerC,
                questionData.answerD,
              ].filter(Boolean)}
              selected={selectedValueForOptions}
              onChange={(answer) => onAnswer(questionData.idQuestion, answer)}
            />
          </div>
        );
      } else if (part === 6) {
        const questionRange = questionData.listQuestion?.length
          ? `${parseInt(questionData.listQuestion[0].idQuestion) + 1} - ${
              parseInt(
                questionData.listQuestion[questionData.listQuestion.length - 1]
                  .idQuestion
              ) + 1
            }`
          : "";
        return (
          <div className="w-full max-h-screen flex flex-col px-2">
            <h2 className="text-lg lg:text-lg font-semibold mb-2">
              Questions {questionRange} refer to the following text.
            </h2>
            <div className="w-full flex flex-col lg:flex-row xl:flex-row gap-4 lg:gap-5 max-h-[75vh]">
              <div className="w-full lg:w-2/3 xl:w-2/3 mb-4 lg:mb-6 p-3 lg:p-4 border-2 border-gray-300 rounded-lg hide-scrollbar overflow-y-auto max-h-[65vh] lg:max-h-[75vh]">
                <p className="whitespace-pre-line text-md">
                  {questionData.questionText}
                </p>
              </div>
              <div className="w-full lg:w-1/3 xl:w-1/3 flex flex-col mx-2 lg:mx-3 overflow-y-auto max-h-[70vh] lg:max-h-[75vh]">
                {questionData.listQuestion?.length > 0 ? (
                  questionData.listQuestion.map((q) => {
                    const currentAnswerChar = userAnswers[q.idQuestion] || "";
                    let selectedValueForOptions = "";
                    if (currentAnswerChar === "A")
                      selectedValueForOptions = q.answerA;
                    else if (currentAnswerChar === "B")
                      selectedValueForOptions = q.answerB;
                    else if (currentAnswerChar === "C")
                      selectedValueForOptions = q.answerC;
                    else if (currentAnswerChar === "D")
                      selectedValueForOptions = q.answerD;

                    return (
                      <div key={q.idQuestion} className="mb-3">
                        <p className="text-md font-bold mb-2 flex items-center gap-1.5">
                          <FontAwesomeIcon
                            icon="fa-regular fa-bookmark"
                            style={{ color: "#2C99E2" }}
                          />
                          {parseInt(q.idQuestion) + 1}. {q.questionText}
                        </p>
                        <AnswerOptions
                          options={[
                            q.answerA,
                            q.answerB,
                            q.answerC,
                            q.answerD,
                          ].filter(Boolean)}
                          selected={selectedValueForOptions}
                          onChange={(answer) => onAnswer(q.idQuestion, answer)}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-red-600 text-md">
                    No questions available for part {part}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      } else if (part === 7) {
        const questionRange = questionData.listQuestion?.length
          ? `${parseInt(questionData.listQuestion[0].idQuestion) + 1} - ${
              parseInt(
                questionData.listQuestion[questionData.listQuestion.length - 1]
                  .idQuestion
              ) + 1
            }`
          : "";
        return (
          <div className="w-full h-full flex flex-col px-2">
            <h2 className="text-lg lg:text-lg font-semibold mb-2">
              Questions {questionRange} refer to the following text.
            </h2>
            <div className="w-full h-full flex flex-col lg:flex-row xl:flex-row gap-4 lg:gap-5 max-h-[75vh]">
              <div className="w-full lg:w-2/3 xl:w-2/3 mb-4 lg:mb-6 p-3 lg:p-4 border-2 border-gray-300 rounded-lg hide-scrollbar overflow-y-auto max-h-[65vh] lg:max-h-[75vh]">
                <p className="whitespace-pre-line text-md">
                  {questionData.questionText}
                </p>
              </div>
              <div className="w-full lg:w-1/3 xl:w-1/3 flex flex-col mx-2 lg:mx-3 overflow-y-auto max-h-[70vh] lg:max-h-[75vh]">
                {questionData.listQuestion?.length > 0 ? (
                  questionData.listQuestion.map((q) => {
                    const currentAnswerChar = userAnswers[q.idQuestion] || "";
                    let selectedValueForOptions = "";
                    if (currentAnswerChar === "A")
                      selectedValueForOptions = q.answerA;
                    else if (currentAnswerChar === "B")
                      selectedValueForOptions = q.answerB;
                    else if (currentAnswerChar === "C")
                      selectedValueForOptions = q.answerC;
                    else if (currentAnswerChar === "D")
                      selectedValueForOptions = q.answerD;

                    return (
                      <div key={q.idQuestion} className="mb-3">
                        <p className="text-md font-bold mb-2 flex items-center gap-1.5">
                          <FontAwesomeIcon
                            icon="fa-regular fa-bookmark"
                            style={{ color: "#2C99E2" }}
                          />
                          {parseInt(q.idQuestion) + 1}. {q.questionText}
                        </p>
                        <AnswerOptions
                          options={[
                            q.answerA,
                            q.answerB,
                            q.answerC,
                            q.answerD,
                          ].filter(Boolean)}
                          selected={selectedValueForOptions}
                          onChange={(answer) => onAnswer(q.idQuestion, answer)}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-red-600 text-md">
                    Không có câu hỏi nào cho phần {part}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      }
      return <p className="text-red-600 text-md">Phần không hợp lệ: {part}</p>;
    };

export default QuestionDisplay;