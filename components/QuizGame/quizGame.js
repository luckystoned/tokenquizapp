import { useState, useCallback } from "react";
import Countdown from "react-countdown";
import Image from "next/image";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
    nextQues < questions.length && setCurrentQuestion(nextQues)

  }, [currentQuestion, questions, nextQuestion]);

  //handle set score to contract and score
  const handleSetQuizzScore = () => {

    //set score to show 
    let quizScore = selectedOptions.filter(option => typeof option?.answerByUser == 'number').length = 0 ? selectedOptions.filter(option => typeof option?.answerByUser == 'number').length : 0;

    //set score contract, add set value 0 if answer was not selected.
    let contractScore = selectedOptions.map(option => {

      return typeof option?.answerByUser == 'number' ? option?.answerByUser : 0;
    })

    //set UI States
    setShowScore(true);
    setScore(quizScore);
    setSetContractAnswer(contractScore)
  };

  // Renderer callback with condition
  const renderer = ({ seconds }) => {

    return (
      <Box textAlign="center" mt={2}>
        <Typography variant="h6" component="div" gutterBottom>
         Limit Time <br /> {seconds}
        </Typography>
      </Box>
    );

  };

  //Render LifeTime component
  function LifeTime({ lifeTime }) {
    const lifeTimeSeconds = lifeTime * 1000;

    return   <Countdown onComplete={() => { handleAnswerOption("Unanswered"); handleNext() }} date={Date.now() + lifeTimeSeconds} renderer={renderer} />

  }
  
  return (
    <Box >
      {showScore ? (
        <>
          <Typography variant="h1" component="div" gutterBottom>
            You scored {score} out of {questions.length}
          </Typography>
          {
            selectedOptions.map((answer, index) => (
              <p key={index}>
                Question nro {index + 1}
                <br />
                Answer {answer.answerByUser}
              </p>
            ))
          }
          <Button variant="contained" onClick={ (e) => handleSendQuiz(contractAnswer) }>Send QUIZ</Button >
        </>
      ) : (
        <>
          <Box>
            <Typography variant="h2" component="div" gutterBottom>
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <Box textAlign='center'>
              <Typography variant="h4" component="div" gutterBottom>
                {questions[currentQuestion].text}
              </Typography>
              <Image src={questions[currentQuestion].image} alt={questions[currentQuestion].text} width="100%" height="100%"></Image>
            </Box>
          {nextQuestion !== questions.length ? (<LifeTime lifeTime={limitTime} />) : "Limit Time!"}
          </Box>
          <FormGroup>
            {questions[currentQuestion].options.map((answer, index) => (
              <Box
              key={index}
              sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 0.3fr)' }}
              mt={5}
              >
              <Typography variant="h5" component="div" gutterBottom>
                {answer.text}
              </Typography>
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
              </Box>
            ))}
          </FormGroup>
          <Box mt={5} textAlign="center">
            <Button variant="contained" onClick={
                currentQuestion + 1 === questions.length
                  ? handleSetQuizzScore
                  : handleNext
              }>
              {currentQuestion + 1 === questions.length ? "Submit" : "Next"}  
            </Button >
          </Box>
        </>
      )}
    </Box>
  );
}