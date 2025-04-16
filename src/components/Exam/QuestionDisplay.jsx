import React from 'react'
import AudioPlayer from './AudioPlayer';
import AnswerOptions from './AnswerOptions';
const QuestionDisplay = ({ part, questionData, userAnswers, onAnswer }) => {
    if (part === 1) {
      return (
        <div className="w-full flex flex-col gap-6 p-5">
            <AudioPlayer audioSrc={questionData.audio} autoPlay={true} />
            <div className='flex gap-10 mx-3'>
                <img src={questionData.image} alt="Question" className="mb-4 max-w-full rounded-lg" />
                <AnswerOptions
                    options={["A", "B", "C", "D"]}
                    selected={userAnswers[questionData.id] || ""}
                    onChange={(answer) => onAnswer(questionData.id, answer)}
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
            selected={userAnswers[questionData.id] || ""}
            onChange={(answer) => onAnswer(questionData.id, answer)}
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
                        <img src={questionData.image} alt="Question" className="h-full w-auto object-contain" />
                    </div>
                    <div className="w-1/2 flex flex-col px-3">
                        {questionData.questions.map((q) => (
                        <div key={q.id} className="mb-3">
                            <p className="text-md font-bold mb-2">{q.id}. {q.title}</p>
                            <AnswerOptions
                            options={[q.answer_0, q.answer_1, q.answer_2, q.answer_3]}
                            selected={userAnswers[q.id] || ""}
                            onChange={(answer) => onAnswer(q.id, answer)}
                            />
                        </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col px-2">
                {questionData.questions.map((q) => (
                    <div key={q.id} className="mb-3">
                        <p className="text-md font-bold mb-2">{q.id}. {q.title}</p>
                        <AnswerOptions
                            options={[q.answer_0, q.answer_1, q.answer_2, q.answer_3]}
                            selected={userAnswers[q.id] || ""}
                            onChange={(answer) => onAnswer(q.id, answer)}
                        />
                    </div>
                ))}
                </div>
            )}
        </div>
      );
    } else if (part === 5) {
      return (
        <div className="w-full h-full flex flex-col mx-4 p-3">
          <p className="text-md font-bold mb-2">{questionData.id}. {questionData.question_title}</p>
          <AnswerOptions
            options={[
              questionData.question_answer_0,
              questionData.question_answer_1,
              questionData.question_answer_2,
              questionData.question_answer_3,
            ]}
            selected={userAnswers[questionData.id] || ""}
            onChange={(answer) => onAnswer(questionData.id, answer)}
          />
        </div>
      );
    } else if (part === 6) {
      return (
        <div className="w-full max-h-screen flex flex-col px-2">
            <h2 className="text-lg font-semibold mb-2">
                Questions {questionData.range} refer to the following text.
            </h2>
            <div className="w-full flex gap-5 max-h-screen">
                <div className="w-2/3 mb-6 p-4 border-2 border-gray-300 rounded-lg hide-scrollbar overflow-y-auto max-h-[75vh]">
                    <p className="whitespace-pre-line">{questionData.question_group_title}</p>
                </div>
                <div className="w-1/3 flex flex-col mx-3 overflow-y-auto max-h-[75vh]">
                    {questionData.questions.map((q, idx) => (
                        <div key={q.id} className="mb-2">
                            <p className="text-md font-bold mb-2">{q.id}. (Fill in blank {131 + idx})</p>
                            <AnswerOptions
                                options={[q.answer_0, q.answer_1, q.answer_2, q.answer_3]}
                                selected={userAnswers[q.id] || ""}
                                onChange={(answer) => onAnswer(q.id, answer)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
    } else if (part === 7) {
      return (
        <div className="w-full max-h-screen flex flex-col px-2">
            <h2 className="text-lg font-semibold mb-2">
                Questions {questionData.range} refer to the following text.
            </h2>
            <div className="w-full flex gap-5 max-h-screen">
                <div className="w-2/3 mb-6 p-4 border-2 border-gray-300 rounded-lg hide-scrollbar overflow-y-auto max-h-[75vh]">
                    <p className="whitespace-pre-line">{questionData.question_group_title}</p>
                </div>
                <div className="w-1/3 flex flex-col mx-3 overflow-y-auto max-h-[75vh]">
                    {questionData.questions.map((q) => (
                        <div key={q.id} className="mb-2">
                        <p className="text-md font-bold mb-2">{q.id}. {q.title}</p>
                        <AnswerOptions
                            options={[q.answer_0, q.answer_1, q.answer_2, q.answer_3]}
                            selected={userAnswers[q.id] || ""}
                            onChange={(answer) => onAnswer(q.id, answer)}
                        />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
    }
    return null;
  };
  

export default QuestionDisplay