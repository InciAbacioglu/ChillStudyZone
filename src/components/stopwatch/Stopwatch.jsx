import React from "react";
import "./Stopwatch.css";

function Stopwatch({ stopwatch, setStopwatch, running, setRunning }) {
  const padZero = (num) => (num < 10 ? `0${num}` : num);

  const formatStopwatch = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
  };

  const handleReset = () => {
    setRunning(false);
    setStopwatch(0);
  };

  return (
    <div className="stopwatch-container">
      <h2>Stopwatch</h2>
      <h3>{formatStopwatch(stopwatch)}</h3>

      <div className="stopwatch-buttons">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
