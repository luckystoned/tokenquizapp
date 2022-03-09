import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

import Button from '@mui/material/Button';

export default function QuizGame({ handleSendQuiz, survey }) {

  //set questions and answers
  const questions = survey.questions;
  const lifeTimeMiliSeconds = questions.map(question => question.lifetimeSeconds * 1000);

  //QUiz UI states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [contractAnswer, setSetContractAnswer] = useState([]);
 
  //handle answers
  const handleAnswerOption = useCallback((answer) => {

    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  }, [currentQuestion, selectedOptions]);

  //handle prev question
  const handlePrevious = () => {

    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  //handle next question
  const handleNext = useCallback(() => {

    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  }, [currentQuestion, questions]);

  //handle set score to contract and score
  const handleSetQuizzScore = () => {

    //set score to show 
    let quizScore = selectedOptions.filter(option => typeof option?.answerByUser == 'number').length = 0 ? selectedOptions.filter(option => typeof option?.answerByUser == 'number').length : 0;

    //set score contract, add set value 0 if answer was not selected.
    let contractScore = selectedOptions.map(option => {

      return typeof option?.answerByUser == 'number' ? option?.answerByUser : 0;
    })

    console.log("contractScore", contractScore)

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
                  ? handleSetQuizzScore
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