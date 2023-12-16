import { useEffect, useState } from "react";
export default function QuestionTimer({ timer, onTimerEnd }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    console.log("Set timer");
    const handler = setTimeout(onTimerEnd, timer);

    return () => {
      clearTimeout(handler);
    };
  }, [timer, onTimerEnd]);

  useEffect(() => {
    console.log("Set Interval");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval)
    };
  }, []);

  return <progress id="question-time" max={timer} value={remainingTime} />;
}
