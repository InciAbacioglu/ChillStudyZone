import React, { useState } from "react";
import "./Alarm.css";

function Alarm({ alarms, setAlarms }) {
  const [isSetVisible, setIsSetVisible] = useState(false);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [meridiem, setMeridiem] = useState("AM");
  const [message, setMessage] = useState("");

  const padZero = (num) => (num < 10 ? `0${num}` : num);

  const handleAddAlarm = (e) => {
    e.preventDefault();

    const newAlarm = {
      time: `${padZero(hour)}:${padZero(minute)}:${padZero(second)}${meridiem}`,
      active: true,
      message: message.trim(),
    };

    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9](AM|PM)$/i;

    if (regex.test(newAlarm.time)) {
      setAlarms([...alarms, newAlarm]);
      setHour("");
      setMinute("");
      setSecond("");
      setMeridiem("AM");
      setMessage("");
      setIsSetVisible(false);
    } else {
      alert("Invalid format. Try like '09:30:45AM'");
    }
  };

  const handleToggle = (index) => {
    const updated = [...alarms];
    updated[index].active = !updated[index].active;
    setAlarms(updated);
  };

  const handleEdit = (index) => {
    const current = alarms[index].time;
    const updated = prompt("Edit alarm", current);
    if (updated) {
      const updatedAlarms = [...alarms];
      updatedAlarms[index].time = updated;
      setAlarms(updatedAlarms);
    }
  };

  const handleDelete = (index) =>
    setAlarms(alarms.filter((_, i) => i !== index));

  return (
    <div className="alarm-container">
      <h2>Alarm List ⏰</h2>

      {!isSetVisible ? (
        <button onClick={() => setIsSetVisible(true)}>➕ Add Alarm</button>
      ) : (
        <form onSubmit={handleAddAlarm} className="alarm-form">
          <input
            type="number"
            placeholder="HH"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            min="1"
            max="12"
            required
          />
          <input
            type="number"
            placeholder="MM"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            min="0"
            max="59"
            required
          />
          <input
            type="number"
            placeholder="SS"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            min="0"
            max="59"
            required
          />
          <select
            value={meridiem}
            onChange={(e) => setMeridiem(e.target.value)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          <input
            type="text"
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Set</button>
        </form>
      )}

      {alarms.length === 0 ? (
        <p>No alarms set.</p>
      ) : (
        alarms.map((alarm, i) => (
          <div
            key={i}
            className={`alarm-item ${alarm.active ? "active" : "inactive"}`}
          >
            <div>
              <span>{alarm.time}</span>
              {alarm.message && (
                <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                  {alarm.message}
                </p>
              )}
            </div>
            <div className="alarm-buttons">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alarm.active}
                  onChange={() => handleToggle(i)}
                />
                <span className="slider" />
              </label>
              <button onClick={() => handleEdit(i)}>✏️</button>
              <button onClick={() => handleDelete(i)}>🗑️</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Alarm;
