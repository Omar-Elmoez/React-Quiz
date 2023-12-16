import { useEffect, useState } from "react";
export default function QuestionTimer({timer, onTimerEnd}) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    }
  }, [onTimerEnd]);

  return <progress id="question-time" max={timer} value={remainingTime} />;
}
