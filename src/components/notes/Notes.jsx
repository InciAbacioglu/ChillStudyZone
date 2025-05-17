import React, { useState, useEffect } from "react";
import "./Notes.css";

function Notes() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (note.trim() === "") return;
    const newNote = {
      id: Date.now(),
      text: note.trim(),
      category: category.trim() || "General",
      date: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
    setNote("");
    setCategory("General");
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.text.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="notes-container">
      <h2>📝 Notes</h2>

      <div className="note-form">
        <textarea
          placeholder="Write a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category (e.g. Work, Idea)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={handleAddNote}>➕ Add</button>
      </div>

      <input
        type="text"
        className="note-search"
        placeholder="🔍 Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredNotes.length === 0 ? (
        <p className="empty-text">No notes found.</p>
      ) : (
        <ul className="notes-list">
          {filteredNotes.map((note) => (
            <li key={note.id} className="note-item">
              <div className="note-text">{note.text}</div>
              <div className="note-footer">
                <span>
                  {note.category} • {note.date}
                </span>
                <button onClick={() => handleDelete(note.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notes;
