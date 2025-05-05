import React from "react";
import AudioPlayer from "./AudioPlayer";
import AnswerOptions from "./AnswerOptions";

const QuestionDisplay = ({ part, questionData, userAnswers, onAnswer }) => {
  if (!questionData) {
    return (
      <p className="text-red-600">Invalid question data for part {part}</p>
    );
  }

  if (!Number.isInteger(part) || part < 1 || part > 7) {
    return <p className="text-red-600">Invalid part: {part}</p>;
  }

  if (part === 1) {
    return (
      <div className="w-full flex flex-col gap-6 p-5">
        <AudioPlayer audioSrc={questionData.audio} autoPlay={true} />
        <div className="flex gap-10 mx-3">
          <img
            src={questionData.image}
            alt="Question"
            className="mb-4 max-w-full rounded-lg"
          />
          <AnswerOptions
            options={["A", "B", "C", "D"]}
            selected={userAnswers[questionData.idQuestion] || ""}
            onChange={(answer) => onAnswer(questionData.idQuestion, answer)}
          />
        </div>
      </div>
    );
  } else if (part === 2) {
    return (
      <div className="w-full p-5 mx-3">
        <AudioPlayer audioSrc={questionData.audio} autoPlay={true} />
        <AnswerOptions
          options={["A", "B", "C"]}
          selected={userAnswers[questionData.idQuestion] || ""}
          onChange={(answer) => onAnswer(questionData.idQuestion, answer)}
        />
      </div>
    );
  } else if (part === 3 || part === 4) {
    return (
      <div className="w-full h-full p-5 flex flex-col gap-4">
        <AudioPlayer audioSrc={questionData.audio} autoPlay={true} />
        {questionData.image ? (
          <div className="w-full h-full flex flex-row gap-10">
            <div className="w-1/2 h-full flex items-center p-2 justify-center border-2 border-gray-300 rounded-lg">
              <img
                src={questionData.image}
                alt="Question"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="w-1/2 flex flex-col px-3">
              {questionData.listQuestion?.length > 0 ? (
                questionData.listQuestion.map((q) => {
                  const currentAnswerChar = userAnswers[q.idQuestion] || ""; // Get 'A', 'B', etc.
                  let selectedValueForOptions = ""; // Giá trị để truyền vào AnswerOptions

                  // Map ký tự lại thành text đầy đủ (hoặc giá trị mà AnswerOptions hiểu)
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
                      <p className="text-md font-bold mb-2">
                        {parseInt(q.idQuestion) + 1}. {q.questionText}
                      </p>
                      <AnswerOptions
                        options={[
                          q.answerA,
                          q.answerB,
                          q.answerC,
                          q.answerD,
                        ].filter(Boolean)}
                        // Truyền text đầy đủ tương ứng với ký tự đã lưu
                        selected={selectedValueForOptions}
                        onChange={(answer) => onAnswer(q.idQuestion, answer)}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-red-600">
                  No questions available for part {part}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col px-2">
            {questionData.listQuestion?.length > 0 ? (
              questionData.listQuestion.map((q) => {
                const currentAnswerChar = userAnswers[q.idQuestion] || ""; // Get 'A', 'B', etc.
                let selectedValueForOptions = ""; // Giá trị để truyền vào AnswerOptions

                // Map ký tự lại thành text đầy đủ (hoặc giá trị mà AnswerOptions hiểu)
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
                    <p className="text-md font-bold mb-2">
                      {parseInt(q.idQuestion) + 1}. {q.questionText}
                    </p>
                    <AnswerOptions
                      options={[
                        q.answerA,
                        q.answerB,
                        q.answerC,
                        q.answerD,
                      ].filter(Boolean)}
                      // Truyền text đầy đủ tương ứng với ký tự đã lưu
                      selected={selectedValueForOptions}
                      onChange={(answer) => onAnswer(q.idQuestion, answer)}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-red-600">
                No questions available for part {part}
              </p>
            )}
          </div>
        )}
      </div>
    );
  } else if (part === 5) {
    return (
      <div className="w-full h-full flex flex-col mx-4 p-3">
        <p className="text-md font-bold mb-2">
          {parseInt(questionData.idQuestion) + 1}. {questionData.questionText}
        </p>
        <AnswerOptions
          options={[
            questionData.answerA,
            questionData.answerB,
            questionData.answerC,
            questionData.answerD,
          ].filter(Boolean)}
          selected={userAnswers[questionData.idQuestion] || ""}
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
        <h2 className="text-lg font-semibold mb-2">
          Questions {questionRange} refer to the following text.
        </h2>
        <div className="w-full flex gap-5 max-h-screen">
          <div className="w-2/3 mb-6 p-4 border-2 border-gray-300 rounded-lg hide-scrollbar overflow-y-auto max-h-[75vh]">
            <p className="whitespace-pre-line">{questionData.questionText}</p>
          </div>
          <div className="w-1/3 flex flex-col mx-3 overflow-y-auto max-h-[75vh]">
            {questionData.listQuestion?.length > 0 ? (
              questionData.listQuestion.map((q) => {
                const currentAnswerChar = userAnswers[q.idQuestion] || ""; // Get 'A', 'B', etc.
                let selectedValueForOptions = ""; // Giá trị để truyền vào AnswerOptions

                // Map ký tự lại thành text đầy đủ (hoặc giá trị mà AnswerOptions hiểu)
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
                    <p className="text-md font-bold mb-2">
                      {parseInt(q.idQuestion) + 1}. {q.questionText}
                    </p>
                    <AnswerOptions
                      options={[
                        q.answerA,
                        q.answerB,
                        q.answerC,
                        q.answerD,
                      ].filter(Boolean)}
                      // Truyền text đầy đủ tương ứng với ký tự đã lưu
                      selected={selectedValueForOptions}
                      onChange={(answer) => onAnswer(q.idQuestion, answer)}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-red-600">
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
      <div className="w-full max-h-screen flex flex-col px-2">
        <h2 className="text-lg font-semibold mb-2">
          Questions {questionRange} refer to the following text.
        </h2>
        <div className="w-full flex gap-5 max-h-screen">
          <div className="w-2/3 mb-6 p-4 border-2 border-gray-300 rounded-lg hide-scrollbar overflow-y-auto max-h-[75vh]">
            <p className="whitespace-pre-line">{questionData.questionText}</p>
          </div>
          <div className="w-1/3 flex flex-col mx-3 overflow-y-auto max-h-[75vh]">
            {questionData.listQuestion?.length > 0 ? (
              questionData.listQuestion.map((q) => {
                const currentAnswerChar = userAnswers[q.idQuestion] || ""; // Get 'A', 'B', etc.
                let selectedValueForOptions = ""; // Giá trị để truyền vào AnswerOptions

                // Map ký tự lại thành text đầy đủ (hoặc giá trị mà AnswerOptions hiểu)
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
                    <p className="text-md font-bold mb-2">
                      {parseInt(q.idQuestion) + 1}. {q.questionText}
                    </p>
                    <AnswerOptions
                      options={[
                        q.answerA,
                        q.answerB,
                        q.answerC,
                        q.answerD,
                      ].filter(Boolean)}
                      // Truyền text đầy đủ tương ứng với ký tự đã lưu
                      selected={selectedValueForOptions}
                      onChange={(answer) => onAnswer(q.idQuestion, answer)}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-red-600">
                No questions available for part {part}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
  return <p className="text-red-600">Invalid part: {part}</p>;
};

export default QuestionDisplay;
