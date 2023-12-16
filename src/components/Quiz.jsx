import { useState } from "react";
import QUESTIONS from "../questions";
import TrophyImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  let quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  };

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={TrophyImg} alt="Trophy image" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // To avoid change the original answers array in database, you must make a copy of it before suffle.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
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
    </div>
  );
}
