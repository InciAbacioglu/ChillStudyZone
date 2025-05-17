import React, { useState, useEffect } from "react";
import "./SoundPlayer.css";

import deniz from "../../assets/denizdalgasesi.mp3";
import doga from "../../assets/doğa sesi.mp3";
import kafesesi from "../../assets/kafesesi.mp3";
import somine from "../../assets/şöminesesi.mp3";

const soundOptions = [
  { label: "Ocean 🌊", file: deniz },
  { label: "Forest 🌿", file: doga },
  { label: "Cafe ☕", file: kafesesi },
  { label: "Fireplace 🔥", file: somine },
];

function SoundPlayer() {
  const [sounds, setSounds] = useState(
    soundOptions.map((s) => ({
      ...s,
      isPlaying: false,
      volume: 0.5,
      audio: null,
    }))
  );

  useEffect(() => {
    setSounds((prev) =>
      prev.map((s) => ({
        ...s,
        audio: new Audio(s.file),
      }))
    );
  }, []);

  useEffect(() => {
    sounds.forEach((s) => {
      if (s.audio) {
        s.audio.loop = true;
        s.audio.volume = s.volume;
      }
    });
  }, [sounds]);

  const togglePlay = (index) => {
    setSounds((prev) =>
      prev.map((s, i) => {
        if (i === index) {
          if (s.isPlaying) {
            s.audio.pause();
          } else {
            s.audio.play();
          }
          return { ...s, isPlaying: !s.isPlaying };
        }
        return s;
      })
    );
  };

  const handleVolumeChange = (index, value) => {
    setSounds((prev) =>
      prev.map((s, i) => {
        if (i === index) {
          if (s.audio) s.audio.volume = value;
          return { ...s, volume: value };
        }
        return s;
      })
    );
  };

  return (
    <div className="sound-player-container">
      <h2>Background Sounds & Playlist 🎵</h2>

      <div className="sound-layout">
        <div className="sound-box">
          <div className="sound-list-column">
            {sounds.map((s, i) => (
              <div key={i} className="sound-item">
                <div className="sound-header">
                  <strong>{s.label}</strong>
                  <button onClick={() => togglePlay(i)}>
                    {s.isPlaying ? "⏸️" : "▶️"}
                  </button>
                </div>
                <div className="slider-row">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={s.volume}
                    onChange={(e) =>
                      handleVolumeChange(i, parseFloat(e.target.value))
                    }
                  />
                  <span className="volume-display">
                    {Math.round(s.volume * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="spotify-box">
          <iframe
            style={{ borderRadius: "12px", width: "100%", height: "352px" }}
            src="https://open.spotify.com/embed/playlist/3kdLlqjXGalnELLEVNNekv?utm_source=generator&theme=0"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default SoundPlayer;
