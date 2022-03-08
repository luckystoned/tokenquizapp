import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

import Button from '@mui/material/Button';

export default function QuizGame({ handleSendQuiz, survey }) {

  //set questions and answers
  const questions = survey.questions;

  //QUiz UI states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [contractAnswer, setSetContractAnswer] = useState([]);

  //handle answers
  const handleAnswerOption = (answer) => {

    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  //handle prev question
  const handlePrevious = () => {

    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  //handle next question
  const handleNext = () => {

    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  //handle set score to contract and score
  const handleSetQuizz = () => {

    //set score to show 
    let quizScore = selectedOptions.filter(option => typeof option.answerByUser == 'number').length

    //set score to send, add value 0 if answer was not selected.
    let contractScore = selectedOptions.map(option => {

      if (typeof option.answerByUser == 'number') {
        return option.answerByUser;
      }else return 0
    })

    //set UI States
    setShowScore(true);
    setScore(quizScore);
    setSetContractAnswer(contractScore)
  };
  
  return (
    <div >
      <Head>
        <title>Quiz App</title>
      </Head>
      {showScore ? (
        <>
          <h1>
            You scored {score} out of {questions.length}
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
          <Button variant="contained" onClick={ (e) => handleSendQuiz(contractAnswer) }>Enviar QUIZ</Button >
        </>
      ) : (
        <>
          <div>
            <h4 >
              Question {currentQuestion + 1} of {questions.length}
            </h4>
            <div>
              {questions[currentQuestion].text}
            </div>
            <div>
              <Image src={questions[currentQuestion].image} alt={questions[currentQuestion].text} width="100%" height="100%"></Image>
            </div>
          </div>
          <div>
            {questions[currentQuestion].options.map((answer, index) => (
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
                currentQuestion + 1 === questions.length
                  ? handleSetQuizz
                  : handleNext
              }
            >
              {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}