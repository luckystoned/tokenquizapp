import { useState, useCallback, useEffect } from "react";
import Countdown from "react-countdown";
import Head from "next/head";
import Image from "next/image";

import Button from '@mui/material/Button';

export default function QuizGame({ handleSendQuiz, survey }) {

  //set questions and answers
  const questions = survey.questions;

  //QUiz UI states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [limitTime, setLimitTime] = useState(questions[currentQuestion].lifetimeSeconds);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [contractAnswer, setSetContractAnswer] = useState([]);
  const [nextQuestion, setNextQuestion] = useState(1);
 
  //handle answers
  const handleAnswerOption = useCallback((answer) => {


    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    handleNext()
  }, [currentQuestion, selectedOptions, handleNext]);

  //handle next question
  const handleNext = useCallback(() => {

    const nextQues = currentQuestion + 1;
    setNextQuestion(nextQues) 
    setLimitTime(questions[nextQuestion].lifetimeSeconds);
    console.log(limitTime)
    nextQues < questions.length && setCurrentQuestion(nextQues)

  }, [currentQuestion, questions, nextQuestion, limitTime]);

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

  // Renderer callback with condition
  const renderer = ({ seconds }) => {

    return (
      <h1>
        {seconds}
      </h1>
    );

  };

  //Render LifeTime component
  function LifeTime({ lifeTime }) {
    const lifeTimeSeconds = lifeTime * 1000;

    return   <Countdown onComplete={() => { handleAnswerOption("sin contestar"); handleNext() }} date={Date.now() + lifeTimeSeconds} renderer={renderer} />

  }
  
  console.log("questions", questions.length)
  console.log("nextQues", nextQuestion)
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
          {nextQuestion !== questions.length ? (<LifeTime lifeTime={limitTime} />) : "Limit Time!"}
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
                  disabled={nextQuestion == questions.length}
                />
                <p>{answer.text}</p>
              </div>
            ))}
          </div>
          <div>
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