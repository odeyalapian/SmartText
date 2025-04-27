import React, { useState } from 'react';
import styles from './NotesBoard.module.css';
import Note from '../Note/Note';
import { GrAdd } from "react-icons/gr";
import { IoIosSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";




// מקבל את המזהה הבא ושומר את המספר החדש ב-localStorage
const getNextNoteId = () => {
  const currentId = parseInt(localStorage.getItem('noteIdCounter') || '0', 10);
  const nextId = currentId + 1;
  localStorage.setItem('noteIdCounter', nextId.toString());
  return currentId;
};

function NotesBoard({ username, text, setText, color, font, fontSize, direction, highlightedIndexes, setFocusTarget, history, setHistory }) {

  const [savedNotes, setSavedNotes] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayNotes, setDisplayNotes] = useState([{
    id: getNextNoteId(),
    name: "<new note>",
    data: [],
    history: []
  }, -1, -1, -1]);
  const [currentIndex, setCurrentIndex]=useState(0);
  const [isActive, setIsActive] = useState([true,false,false,false]);

 

  const deleteNote = () => {
    if (displayNotes[currentIndex].name !== "<new note>") {
      const isConfirmed = confirm("האם אתה בטוח שברצונך למחוק את הפתק הזה?");
  
      if (isConfirmed) {
        const users = JSON.parse(localStorage.getItem('noteAppUsers') || '{}');
        const id = displayNotes[currentIndex].id;
  
        // נוודא שיש למשתמש פתקים
        if (users[username]?.notes && users[username].notes[id]) {
          delete users[username].notes[id];
          localStorage.setItem('noteAppUsers', JSON.stringify(users));
          setSavedNotes(users[username].notes);
          alert("הפתק נמחק בהצלחה!");
        } else {
          alert("הפתק לא נמצא או שכבר נמחק.");
        }
      }
    }
  console.log(currentIndex)
    closeNote(currentIndex);
  };
  

  const closeNote = (index) => {
    
    console.log("close");
    console.log(index);
  
    let notes = [...displayNotes];
    notes[index] = -1;
    const sortedNotes = notes.filter(n => n !== -1).concat(notes.filter(n => n === -1));
  
    setCurrentIndex(-1);
    console.log(sortedNotes);
    setDisplayNotes(sortedNotes);
  
    sortedNotes.map((note, index) => {
      console.log(note);
      console.log(index);
    });
  };
  

  const saveNote = () => {
    let name;
  
    // אם הפתק חדש, בקשת שם מהמשתמש
    if (displayNotes[currentIndex].name === "<new note>") {
      name = prompt('הכנס שם לפתק:');
      if (!name) return;
    } else {
      name = displayNotes[currentIndex].name;
    }
  
    const users = JSON.parse(localStorage.getItem('noteAppUsers') || '{}');
  
    // אם למשתמש אין עדיין notes, ניצור אחד
    const userNotes = users[username].notes || {};
    const id = displayNotes[currentIndex].id;
  
    // עדכון הפתק ברשימת הפתקים
    userNotes[id] = {
      id,
      name,
      data: text
    };
  
    // שמירת הפתקים החדשים במשתמש
    users[username].notes = userNotes;
  
    // שמירת כל המשתמשים בזיכרון
    localStorage.setItem('noteAppUsers', JSON.stringify(users));
  
    // עדכון סטייט
    const updatedNotes = [...displayNotes];
    updatedNotes[currentIndex].name = name;
    setDisplayNotes(updatedNotes);
    setSavedNotes(userNotes);
  
    alert(`הפתק "${name}" נשמר בהצלחה!`);
  };
  

  const toggleSidebar = () => {
    if (!sidebarOpen) {
      const users = JSON.parse(localStorage.getItem('noteAppUsers') || '{}');
      const notesFromStorage = users[username]?.notes || {};
      setSavedNotes(notesFromStorage);
    }
    setSidebarOpen(!sidebarOpen);
  };
  
  const addNewNote = () => {

    console.log(displayNotes)

    const emptySlot = displayNotes.findIndex(index => index === -1);
    if (emptySlot === -1) {
      alert("מצטערים, ניתן להציג מקסימום 4 פתקים. לא ניתן להציג פתק נוסף");
      return;
    }

    if(currentIndex!=-1){
        displayNotes[currentIndex].data=text;
    }
    console.log(currentIndex)
    setCurrentIndex(emptySlot);
    setText([])
    
    //כשעושים שמור בודקים אם התז נאל ואם כן מקצים תז חדש
    //כשעושים מחיקה כנל
    const newNote = {
      id: getNextNoteId(),
      name: "<new note>",
      data: [],
      history: []
    };

//בכל שמירה של פתק חדש או מחיקה צריך לעדכן את הallNotes ואת הloaclStorage
    console.log(displayNotes)
    const updatedDisplayNotes = [...displayNotes];
    updatedDisplayNotes[emptySlot] = newNote; // מצביע למיקום ב־allNotes
    setDisplayNotes(updatedDisplayNotes);
    console.log(displayNotes)

    let actives = Array(isActive.length).fill(false);
    actives[emptySlot] = true;
    setIsActive(actives);
  };

  const addNoteFromSidebar = (note) => {

    const index=displayNotes.findIndex(i => i.id==note.id);
    if(index !== -1){
      alert("This note is already opened!")
      return
    }
    const emptySlot = displayNotes.findIndex(index => index === -1);
    if (emptySlot === -1) {
      alert("מצטערים, ניתן להציג מקסימום 4 פתקים. לא ניתן להציג פתק נוסף");
      return;
    }

    if (currentIndex !== -1) {
      displayNotes[currentIndex].data = text;
    
    }

    setCurrentIndex(emptySlot);
    setText(note.data);

    
    const newNote = {
      id: note.id,
      name: note.name,
      data: note.data,
      history: []
    };

    console.log(newNote);

    const updatedDisplayNotes = [...displayNotes];
    updatedDisplayNotes[emptySlot] = newNote;
    setDisplayNotes(updatedDisplayNotes);
    let actives = Array(isActive.length).fill(false);
    actives[emptySlot] = true;
    setIsActive(actives);
  };

  function handleClick(index) {

    if(currentIndex!==-1){
      let actives = [...isActive]
      actives[currentIndex]=false
      setIsActive(actives);
      let updatedNotes=[...displayNotes]
      updatedNotes[currentIndex].data=text;
      updatedNotes[currentIndex].history=history;
      setDisplayNotes(updatedNotes);
    }

    let newActives = Array(isActive.length).fill(false);  // כל הפתקים כבויים
    newActives[index] = true; // הפתק הנבחר הוא true
    setIsActive(newActives);
    setCurrentIndex(index);
    setText(displayNotes[index].data)
    setHistory(displayNotes[index].history)

    console.log(isActive);
  };


  return (
    
    <div className={styles.wrapper}>
      {/* Sidebar */}
      
      <button className={styles.sidebarToggle} onClick={toggleSidebar}>☰</button>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        {sidebarOpen && (
          <ul className={styles.noteList}>
            {Object.entries(savedNotes).map(([id, note]) => (
              <li key={id}>
                <button className={styles.noteButton} onClick={() => {note.id=id; console.log(note); addNoteFromSidebar(note)}}>
                  {note.name || `פתק ${id}`}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Board */}
      <div className={styles.board}>
        <div className={styles.AllButtons}>
         <button className={styles.actButton} onClick={addNewNote}><GrAdd size={20} className="myIcon" title="Add"/></button>
        <button onClick={saveNote} className={styles.actButton}><IoIosSave size={20}  className="myIcon" title="Save"/></button>
        <button onClick={deleteNote} className={styles.actButton}><MdDelete size={20}  className="myIcon" title="Delete"/></button>
        </div>
       

        <div className={styles.grid}>
          {displayNotes.map((note, index) =>
            note !== -1 ? (
              <div key={note.id} className={`${styles.cell} ${isActive[index] ? styles.selectedNote : ''}`}>
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
                  direction={direction}
                  highlightedIndexes={highlightedIndexes}
                  setFocusTarget={setFocusTarget}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesBoard;
