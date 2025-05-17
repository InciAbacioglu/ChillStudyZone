import React from "react";
import "./Clock.css";

function Clock({ time }) {
  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  function formatTime() {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(
      seconds
    )}${meridiem}`;
  }

  return (
    <div className="clock-container">
      <h1 className="clock">{formatTime()}</h1>
    </div>
  );
}

export default Clock;
