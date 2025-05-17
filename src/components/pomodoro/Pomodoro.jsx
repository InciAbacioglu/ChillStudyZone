import React, { useState, useEffect, useRef } from "react";
import "./Pomodoro.css";
import dingSound from "../../assets/ding.mp3";

function Pomodoro() {
  const [workDuration, setWorkDuration] = useState("");
  const [breakDuration, setBreakDuration] = useState("");
  const [targetPomodoros, setTargetPomodoros] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [started, setStarted] = useState(false);

  const audioRef = useRef(new Audio(dingSound));

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            handlePomodoroEnd();
            return isBreak
              ? parseInt(workDuration) * 60
              : parseInt(breakDuration) * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

  const handlePomodoroEnd = () => {
    audioRef.current.play();
    if (!isBreak) setCompletedPomodoros((prev) => prev + 1);
    setIsBreak(!isBreak);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (
      isNaN(workDuration) ||
      isNaN(breakDuration) ||
      isNaN(targetPomodoros) ||
      workDuration <= 0 ||
      breakDuration < 0 ||
      targetPomodoros <= 0
    ) {
      alert("Please enter valid numbers for all fields.");
      return;
    }
    setTimeLeft(parseInt(workDuration) * 60);
    setStarted(true);
  };

  const progressPercentage =
    targetPomodoros > 0
      ? Math.min((completedPomodoros / targetPomodoros) * 100, 100)
      : 0;

  return (
    <div className="pomodoro-container">
      {!started ? (
        <div className="target-input">
          <h2>Customize Your Pomodoro</h2>
          <input
            type="number"
            value={workDuration}
            onChange={(e) => setWorkDuration(e.target.value)}
            placeholder="Work duration (minutes)"
          />
          <input
            type="number"
            value={breakDuration}
            onChange={(e) => setBreakDuration(e.target.value)}
            placeholder="Break duration (minutes)"
          />
          <input
            type="number"
            value={targetPomodoros}
            onChange={(e) => setTargetPomodoros(e.target.value)}
            placeholder="Number of pomodoros"
          />
          <button onClick={handleStart}>Start</button>
        </div>
      ) : (
        <>
          <h2>{isBreak ? "Break Time 💤" : "Focus Time 🔥"}</h2>
          <h1>{formatTime(timeLeft)}</h1>

          <div className="controls">
            <button onClick={() => setIsRunning(true)}>Start</button>
            <button onClick={() => setIsRunning(false)}>Pause</button>
            <button
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(isBreak ? breakDuration * 60 : workDuration * 60);
              }}
            >
              Reset
            </button>
          </div>

          <div className="progress">
            <div className="bar">
              <div
                className="fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p>
              {completedPomodoros}/{targetPomodoros} pomodoros completed
            </p>
            {completedPomodoros >= targetPomodoros && (
              <p className="celebrate">
                🎯 Congrats! You’ve completed your goal!
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Pomodoro;
