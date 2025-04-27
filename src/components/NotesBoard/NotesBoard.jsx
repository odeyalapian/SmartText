import React, { useState } from "react";
import styles from "./NotesBoard.module.css";
import Note from "../Note/Note";
import { GrAdd } from "react-icons/gr";
import { IoIosSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";

// רכיב לוח הפתקים - מאפשר ניהול פתקים, כולל הוספה, שמירה, מחיקה ותצוגה של פתקים למשתמש
function NotesBoard({
  username,
  text,
  setText,
  color,
  font,
  fontSize,
  direction,
  setDirection,
  highlightedIndexes,
  setFocusTarget,
  history,
  setHistory,
}) {


  
  // פונקציה ליצירת מזהה ייחודי לפתק חדש ושמירתו ב-localStorage
  const getNextNoteId = () => {
    const currentId = parseInt(
      localStorage.getItem("noteIdCounter") || "0",
      10,
    );
    const nextId = currentId + 1;
    localStorage.setItem("noteIdCounter", nextId.toString());
    return currentId;
  };

  // מצב לשמירת הפתקים שנשמרו ב-localStorage
  const [savedNotes, setSavedNotes] = useState({});
  // מצב לשליטה על פתיחה/סגירה של הסרגל הצידי
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // מצב לניהול הפתקים המוצגים (עד 4 פתקים, עם אפשרות לסימון חריץ ריק כ--1)
  const [displayNotes, setDisplayNotes] = useState([
    {
      id: getNextNoteId(),
      name: "<new note>",
      data: [],
      history: [],
    },
    -1,
    -1,
    -1,
  ]);
  // מצב לשמירת האינדקס של הפתק הנוכחי שנבחר
  const [currentIndex, setCurrentIndex] = useState(0);
  // מצב לשמירת מצב הפעילות של כל פתק (איזה פתק מסומן כפעיל)
  const [isActive, setIsActive] = useState([true, false, false, false]);

  if(currentIndex!=-1){
    displayNotes[currentIndex].direction=direction;
  }
  
  // פונקציה למחיקת פתק מ-localStorage ומהתצוגה
  const deleteNote = () => {
    if (displayNotes[currentIndex].name !== "<new note>") {
      const isConfirmed = confirm("Are you sure you want to delete this note?");
      if (isConfirmed) {
        const users = JSON.parse(localStorage.getItem("noteAppUsers") || "{}");
        const id = displayNotes[currentIndex].id;
        if (users[username]?.notes && users[username].notes[id]) {
          delete users[username].notes[id];
          localStorage.setItem("noteAppUsers", JSON.stringify(users));
          setSavedNotes(users[username].notes);
          alert("The note deleted succesfully!");
        }
      }
    }
    closeNote(currentIndex);
  };

  // פונקציה לסגירת פתק והסרתו מהתצוגה (מסמן את החריץ כ--1)
  const closeNote = (index) => {
    let notes = [...displayNotes];
    notes[index] = -1;
    const sortedNotes = notes
      .filter((n) => n !== -1)
      .concat(notes.filter((n) => n === -1));
    setCurrentIndex(-1);
    setDisplayNotes(sortedNotes);
  };

  // פונקציה לשמירת פתק ב-localStorage, כולל בקשת שם לפתק חדש
  const saveNote = () => {
    let name;
    if (displayNotes[currentIndex].name === "<new note>") {
      name = prompt("Enter note's name");
      if (!name) return;
    } else {
      name = displayNotes[currentIndex].name;
    }
    const users = JSON.parse(localStorage.getItem("noteAppUsers") || "{}");
    const userNotes = users[username].notes || {};
    const id = displayNotes[currentIndex].id;
    userNotes[id] = { id, name, data: text, direction };
    users[username].notes = userNotes;
    localStorage.setItem("noteAppUsers", JSON.stringify(users));
    const updatedNotes = [...displayNotes];
    updatedNotes[currentIndex].name = name;
    setDisplayNotes(updatedNotes);
    setSavedNotes(userNotes);
    alert(`The note "${name}" saved succesfully!`);
  };

  // פונקציה לפתיחה/סגירה של הסרגל הצידי ועדכון הפתקים השמורים
  const toggleSidebar = () => {
    if (!sidebarOpen) {
      const users = JSON.parse(localStorage.getItem("noteAppUsers") || "{}");
      const notesFromStorage = users[username]?.notes || {};
      setSavedNotes(notesFromStorage);
    }
    setSidebarOpen(!sidebarOpen);
  };

  // פונקציה להוספת פתק חדש בתצוגה (עד 4 פתקים מקסימום)
  const addNewNote = () => {
    const emptySlot = displayNotes.findIndex((index) => index === -1);
    if (emptySlot === -1) {
      alert("We are sorry. Only 4 notes can be displayed.");
      return;
    }
    if (currentIndex != -1) {
      displayNotes[currentIndex].data = text;
      displayNotes[currentIndex].history = history;
    }
    setCurrentIndex(emptySlot);
    setText([]);
    setHistory([]);
    const newNote = {
      id: getNextNoteId(),
      name: "<new note>",
      data: [],
      history: [],
      direction:direction
    };
    const updatedDisplayNotes = [...displayNotes];
    updatedDisplayNotes[emptySlot] = newNote;
    setDisplayNotes(updatedDisplayNotes);
    let actives = Array(isActive.length).fill(false);
    actives[emptySlot] = true;
    setIsActive(actives);
  };

  // פונקציה לפתיחת פתק קיים מהסרגל הצידי בתצוגה
  const addNoteFromSidebar = (note) => {
    const index = displayNotes.findIndex((i) => i.id == note.id);
    if (index !== -1) {
      alert("This note is already opened!");
      return;
    }
    const emptySlot = displayNotes.findIndex((index) => index === -1);
    if (emptySlot === -1) {
      alert("We are sorry. Only 4 notes can be displayed.");
      return;
    }
    if (currentIndex !== -1) {
      displayNotes[currentIndex].data = text;
      displayNotes[currentIndex].history = history;
      displayNotes[currentIndex].direction = direction;
    }
    setCurrentIndex(emptySlot);
    setText(note.data);
    setHistory([]);
    setDirection(note.direction);
    const newNote = {
      id: note.id,
      name: note.name,
      data: note.data,
      history: [],
      direction: note.direction
    };
    const updatedDisplayNotes = [...displayNotes];
    updatedDisplayNotes[emptySlot] = newNote;
    setDisplayNotes(updatedDisplayNotes);
    let actives = Array(isActive.length).fill(false);
    actives[emptySlot] = true;
    setIsActive(actives);
  };

  // פונקציה לטיפול בלחיצה על פתק - מעדכנת את הפתק הפעיל ואת התוכן המוצג
  function handleClick(index) {
    if (currentIndex !== -1) {
      let actives = [...isActive];
      actives[currentIndex] = false;
      setIsActive(actives);
      let updatedNotes = [...displayNotes];
      updatedNotes[currentIndex].data = text;
      updatedNotes[currentIndex].history = history;
      setDisplayNotes(updatedNotes);
    }
    let newActives = Array(isActive.length).fill(false);
    newActives[index] = true;
    setIsActive(newActives);
    setCurrentIndex(index);
    setText(displayNotes[index].data);
    setHistory(displayNotes[index].history);
    setDirection(displayNotes[index].direction);
  }

  // ממשק המשתמש של הלוח
  return (
    <div className={styles.wrapper}>
      {/* כפתור לפתיחת/סגירת הסרגל הצידי */}
      <button className={styles.sidebarToggle} onClick={toggleSidebar}>
        ☰
      </button>
      {/* הסרגל הצידי - מציג את הפתקים השמורים */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        {sidebarOpen && (
          <ul className={styles.noteList}>
            {Object.entries(savedNotes).map(([id, note]) => (
              <li key={id}>
                <button
                  className={styles.noteButton}
                  onClick={() => {
                    note.id = id;
                    addNoteFromSidebar(note);
                  }}
                >
                  {note.name || `פתק ${id}`}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* אזור התצוגה הראשי של הפתקים */}
      <div className={styles.board}>
        {/* כפתורים לפעולות: הוספה, שמירה ומחיקה */}
        <div className={styles.AllButtons}>
          <button className={styles.actButton} onClick={addNewNote}>
            <GrAdd size={20} className="myIcon" title="Add" />
          </button>
          <button onClick={saveNote} className={styles.actButton}>
            <IoIosSave size={20} className="myIcon" title="Save" />
          </button>
          <button onClick={deleteNote} className={styles.actButton}>
            <MdDelete size={20} className="myIcon" title="Delete" />
          </button>
        </div>

        {/* רשת התצוגה של עד 4 פתקים */}
        <div className={styles.grid}>
          {displayNotes.map((note, index) =>
            note !== -1 ? (
              <div
                key={note.id}
                className={`${styles.cell} ${isActive[index] ? styles.selectedNote : ""}`}
              >
                {/* רכיב הפתק הבודד */}
                <Note
                  isActive={isActive[index]}
                  closeNote={closeNote}
                  handleClick={handleClick}
                  index={index}
                  currentIndex={currentIndex}
                  text={text}
                  noteData={note.data}
                  noteName={note.name}
                  noteId={note.id}
                  color={color}
                  font={font}
                  fontSize={fontSize}
                  direction={note.direction}
                  highlightedIndexes={highlightedIndexes}
                  setFocusTarget={setFocusTarget}
                />
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesBoard;
