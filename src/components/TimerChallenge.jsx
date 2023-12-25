import { useState, useRef } from "react";

import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function resetChallenge(){
    setTimeRemaining(targetTime * 1000);
  }

  function startTimer() {
    timer.current = setInterval(() => {
      setTimeRemaining((preValue) => {
        return preValue - 10;
      });
    }, 10);
  }

  function endTimer() {
    clearInterval(timer.current);
    dialog.current.open();
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        result={title}
        targetTime={targetTime}
        remaingTime={timeRemaining}
        resetHandler={resetChallenge}
      ></ResultModal>
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? endTimer : startTimer}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={ timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running...." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
