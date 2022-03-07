import { useState } from 'react';
import Button from '@mui/material/Button';

export default function QuizGame({ handleSendQuiz, survey }) {

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handlePrevious = () => {
        const prevQues = currentQuestion - 1;
        prevQues >= 0 && setCurrentQuestion(prevQues);
    };

    const handleNext = () => {
        const nextQues = currentQuestion + 1;
        nextQues < questions.length && setCurrentQuestion(nextQues);
    };

    return (
        <>
            <h1>QUIZ!</h1>
            <br />

            <div className="flex flex-col items-start w-full">
            <h4 className="mt-10 text-xl text-white/60">
                Question {currentQuestion + 1} of {questions.length}
            </h4>
            <div className="mt-4 text-2xl text-white">
                {questions[currentQuestion].question}
            </div>
            </div>
            <button
                onClick={handlePrevious}
                className="w-[49%] py-3 bg-indigo-600 rounded-lg"
            >
                Previous
            </button>
            <button
                onClick={handleNext}
                className="w-[49%] py-3 bg-indigo-600 rounded-lg"
            >
                Next
            </button>
            <Button variant="contained" onClick={ handleSendQuiz }>Enviar QUIZ</Button >
        </>
    )
}
