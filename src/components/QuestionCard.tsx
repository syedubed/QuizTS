import React, { useState } from "react";
import {AnswerObject} from "../App"

type props = {
  question: string;
  answers: string[];
  userAnswer:AnswerObject | undefined;
  totalQuestion: number;
  questionNumber: number;
  callback:(e: React.MouseEvent<HTMLButtonElement>) => void;
};
const QuestionCard: React.FC<props> = ({ question, answers, questionNumber, totalQuestion, userAnswer ,callback}) => {
  return (
    <div>                              
      <div>QuestionCard</div>
      <p>Question Number:{questionNumber}/{totalQuestion}</p>
      <p>{question}</p>
      <div>
        {answers.map((each) => (
          <div key={each} ><button value={each} onClick={callback}>{each}</button></div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
