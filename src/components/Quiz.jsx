import { useState } from "react";
import QUESTIONS from "../questions";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  // To avoid change the original answers array in database, you must make a copy of it before suffle.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  const handleSelectedAnswer = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  };

  return (
    <div id="quiz">
      {userAnswers.length < QUESTIONS.length && (
        <div id="question">
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => {
              // if you use index as a key, click on answer for a question => the answer at the same index
              // for the next question will be marked as well.
              return (
                <li key={answer} className="answer">
                  <button onClick={() => handleSelectedAnswer(answer)}>
                    {answer}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {userAnswers.length === QUESTIONS.length && (
        <button id="finish">You finished</button>
      )}
    </div>
  );
}
