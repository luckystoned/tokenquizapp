import Head from "next/head";
import { useState } from "react";

export default function QuizGame({ handleSendQuiz, survey }) {

  const myQuestions = survey.questions;
  //console.log(myQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const handleSubmitButton = () => {
    let newScore = selectedOptions.length
    setScore(newScore);
    setShowScore(true);
  };

  return (
    <div >
      <Head>
        <title>Quiz App</title>
      </Head>
      {showScore ? (
        <h1>
          You scored {score} out of {myQuestions.length}
        </h1>
      ) : (
        <>
          <div>
            <h4 >
              Question {currentQuestion + 1} of {myQuestions.length}
            </h4>
            <div>
              {myQuestions[currentQuestion].text}
            </div>
          </div>
          <div>
            {myQuestions[currentQuestion].options.map((answer, index) => (
              <div
                key={index}
                onClick={(e) => handleAnswerOption(answer.text)}
              >
                <input
                  type="radio"
                  name={answer.text}
                  value={index}
                  checked={
                    index ===
                    selectedOptions[currentQuestion]?.answerByUser
                  }
                  onChange={(e) => handleAnswerOption(index)}
                />
                <p>{answer.text}</p>
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              onClick={
                currentQuestion + 1 === myQuestions.length
                  ? handleSubmitButton
                  : handleNext
              }
            >
              {currentQuestion + 1 === myQuestions.length ? "Submit" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}