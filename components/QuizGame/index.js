import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function QuizGame({ handleSendQuiz, survey }) {

  const myQuestions = survey.questions;
  //console.log(myQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [qtyOfAnswers, setQtyOfAnswers] = useState([]);
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
    nextQues < myQuestions.length && setCurrentQuestion(nextQues);
  };

  
  const handleSubmitButton = () => {
    setScore(selectedOptions.filter(option => typeof option.answerByUser == 'number').length);
    setShowScore(true);
  };
  
  return (
    <div >
      <Head>
        <title>Quiz App</title>
      </Head>
      {showScore ? (
        <>
          <h1>
            You scored {score} out of {myQuestions.length}
          </h1>
          {
            selectedOptions.map((answer, index) => (
              <p key={index}>
                Pregunta nro {index + 1}
                <br />
                Respuesta {answer.answerByUser}
              </p>
            ))
          }
        </>
      ) : (
        <>
          <div>
            <h4 >
              Question {currentQuestion + 1} of {myQuestions.length}
            </h4>
            <div>
              {myQuestions[currentQuestion].text}
            </div>
            <div>
              <Image src={myQuestions[currentQuestion].image} alt={myQuestions[currentQuestion].text} width="100%" height="100%"></Image>
            </div>
          </div>
          <div>
            {myQuestions[currentQuestion].options.map((answer, index) => (
              <div
                key={index}
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
                <button  onClick={(e) => handleAnswerOption("sin contestar")}>lifetime</button>
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