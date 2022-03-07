import Button from '@mui/material/Button';

export default function QuizGame({ handleSendQuiz }) {

  return (
    <>
        <h1>QUIZ!</h1>
        <br />
        <Button variant="contained" onClick={ handleSendQuiz }>Enviar QUIZ</Button >
    </>
  )
}
