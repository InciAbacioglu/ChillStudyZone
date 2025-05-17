import React, { useState, useEffect } from "react";
import Clock from "./components/clock/Clock";
import Alarm from "./components/alarm/Alarm";
import ToDoList from "./components/to-do/ToDoList";
import Stopwatch from "./components/stopwatch/Stopwatch";
import Pomodoro from "./components/pomodoro/Pomodoro";
import Notes from "./components/notes/Notes";
import SoundPlayer from "./components/soundplayer/SoundPlayer";

import bg1 from "./assets/bg1.jpg";
import bg2 from "./assets/bg2.jpg";
import bg3 from "./assets/bg3.jpg";
import bg4 from "./assets/bg4.jpg";
import bg5 from "./assets/bg5.jpg";
import bg6 from "./assets/bg6.jpg";

import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());
  const [alarms, setAlarms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newtask, setNewTask] = useState("");
  const [stopwatch, setStopwatch] = useState(0);
  const [running, setRunning] = useState(false);
  const [background, setBackground] = useState(bg1);
  const [visibleComponent, setVisibleComponent] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAlarms(JSON.parse(localStorage.getItem("alarms")) || []);
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [alarms, tasks]);

  useEffect(() => {
    const currentTime = formatTime(time);
    alarms.forEach((alarm) => {
      if (currentTime === alarm) {
        alert(`⏰ Alarm ringing: ${alarm}`);
        const originalTitle = document.title;
        document.title = `⏰ Alarm: ${alarm}`;
        setTimeout(() => {
          document.title = originalTitle;
        }, 10000);
      }
    });
  }, [time, alarms]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setStopwatch((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const padZero = (num) => (num < 10 ? `0${num}` : num);

  const formatTime = (time) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(
      seconds
    )}${meridiem}`;
  };

  const toggleComponent = (name) => {
    setVisibleComponent((prev) => (prev === name ? null : name));
  };

  return (
    <div
      className="main"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <div className="navbar">
        <button onClick={() => toggleComponent("alarm")}>Alarms</button>
        <button onClick={() => toggleComponent("todo")}>To-Do</button>
        <button onClick={() => toggleComponent("stopwatch")}>Stopwatch</button>
        <button onClick={() => toggleComponent("pomodoro")}>Pomodoro</button>
        <button onClick={() => toggleComponent("notes")}>Notes</button>
        <button onClick={() => toggleComponent("sound")}>Sound</button>

        <select onChange={(e) => setBackground(e.target.value)}>
          <option value={bg1}>school</option>
          <option value={bg2}>lıvıng room</option>
          <option value={bg3}>techno kıtty's bedroom</option>
          <option value={bg4}>sunset ın the room</option>
          <option value={bg5}>japan streets </option>
          <option value={bg6}>cozy bedroom </option>
        </select>
      </div>

      <Clock time={time} />

      {visibleComponent === "alarm" && (
        <Alarm alarms={alarms} setAlarms={setAlarms} />
      )}
      {visibleComponent === "todo" && (
        <ToDoList
          tasks={tasks}
          setTasks={setTasks}
          newtask={newtask}
          setNewTask={setNewTask}
        />
      )}
      {visibleComponent === "stopwatch" && (
        <Stopwatch
          stopwatch={stopwatch}
          setStopwatch={setStopwatch}
          running={running}
          setRunning={setRunning}
        />
      )}
      {visibleComponent === "pomodoro" && <Pomodoro />}
      {visibleComponent === "notes" && <Notes />}
      {visibleComponent === "sound" && <SoundPlayer />}
    </div>
  );
}

export default App;
