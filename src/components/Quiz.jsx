import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import TrophyImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

const TIMER = 3000;
export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  let quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          selectedAnswer("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

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
        {/* we set key property here to make QuestionTimer component re-created for each question */}
        <QuestionTimer
          onTimerEnd={handleSkipAnswer}
          timer={TIMER}
          key={activeQuestionIndex}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            let cssClass = "";
            const isSelected = userAnswers[userAnswers.length - 1] === answer ;

            if (answerState === 'answered' && isSelected) {
              cssClass = 'selected';
            }

            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
              cssClass = answerState;
            }

            // if you use index as a key, click on answer for a question => the answer at the same index
            // for the next question will be marked as well.
            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectedAnswer(answer)}
                  className={cssClass}
                >
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
