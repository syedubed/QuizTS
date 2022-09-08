import React, { useState } from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import QuestionApi from "./components/api/questionApi";
import { QuestionState, Difficulty } from "./components/api/questionApi";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [load, setLoad] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setuserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setgameOver] = useState(true);
  const [message, setMessage] = useState(false);

  console.log(questions);

  const startQuiz = async () => {
    setLoad(true);
    setgameOver(false);
    setScore(0);

    const newQuestions = await QuestionApi(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setuserAnswers([]);
    setNumber(0);
    setLoad(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
        nextQuestion();
      }
      else {
        nextQuestion();
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
    }
  };
  console.log(!gameOver && !load && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1)
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setgameOver(true)
      setMessage(true)

    } else {
      setNumber(nextQuestion);
    }
  };
  return (
    <div className="App">
      <div className="header">Quiz App</div>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? <button onClick={startQuiz}> Start Quiz</button> : ""}
      <div>
        {!gameOver ? <p>score:{score}</p> : ""}

        {load && <p>Loading Questions ....</p>}
        {!load && !gameOver && (
          <div>
            <QuestionCard
              questionNumber={number + 1}
              totalQuestion={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          </div>
        )}
        {!gameOver && !load && number !== TOTAL_QUESTIONS - 1 ? (
          <p>
            <button type="button" onClick={nextQuestion}>
              Next Question
            </button>
          </p>
        ) : null}
        {gameOver && message === true && <h1>Game over <span>You Scored :{score}</span></h1>}
      </div>
    </div>
  );
}

export default App;
