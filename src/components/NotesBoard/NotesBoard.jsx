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

function NotesBoard({ text, setText, color, font, fontSize, direction, highlightedIndexes, setFocusTarget, history, setHistory }) {

  const [savedNotes, setSavedNotes] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayNotes, setDisplayNotes] = useState([-1, -1, -1, -1, -1]);
  const [currentIndex, setCurrentIndex]=useState(-1);
  const [isActive, setIsActive] = useState([false,false,false,false,false]);

 

  const deleteeNote = () =>{
    
    if (displayNotes[currentIndex].name!=="<new note>"){

      
      const isConfirmed = confirm("האם אתה בטוח שברצונך למחוק את הפתק הזה?");

      if (isConfirmed) {
        const notes = JSON.parse(localStorage.getItem('notes') || '{}');
        const id=displayNotes[currentIndex].id;
        delete notes[id];
        localStorage.setItem('notes', JSON.stringify(notes));
        setSavedNotes(notes);
        alert("הפתק נמחק בהצלחה!");
      }
    }
    closeNote(currentIndex);
  }

  const closeNote = (index) => {
    console.log("close")
    let notes=[...displayNotes];
    notes[index]=-1;
    const sortedNotes = notes.filter(n => n !== -1).concat(notes.filter(n => n === -1));

    setCurrentIndex(-1);
    console.log(currentIndex)
    setDisplayNotes(sortedNotes);
  }


  const saveNote = () => {
      let name; 
      if (displayNotes[currentIndex].name=="<new note>"){
        name = prompt('הכנס שם לפתק:');
        if (!name) return;
      }
      else{
        name=displayNotes[currentIndex].name;
      }
      console.log(currentIndex)
      const notes = JSON.parse(localStorage.getItem('notes') || '{}');
      const id=displayNotes[currentIndex].id;
      notes[id] = {
        id,
        name,
        data: text
      };
      localStorage.setItem('notes', JSON.stringify(notes));
      let updatedNotes=[...displayNotes];
      updatedNotes[currentIndex].name=name;
      setDisplayNotes(updatedNotes);
      alert(`הפתק "${name}" נשמר בהצלחה!`);
  };
  

  const toggleSidebar = () => {
    if (!sidebarOpen) {
      const notesFromStorage = JSON.parse(localStorage.getItem('notes') || '{}');
      setSavedNotes(notesFromStorage);
    }
    setSidebarOpen(!sidebarOpen);
  };
  

  const addNewNote = () => {

    console.log(displayNotes)


    const emptySlot = displayNotes.findIndex(index => index === -1);
    if (emptySlot === -1) {
      alert("מצטערים, ניתן להציג מקסימום 5 פתקים. לא ניתן להציג פתק נוסף");
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

  };

  const addNoteFromSidebar = (note) => {

    const index=displayNotes.findIndex(i => i.id==note.id);
    if(index !== -1){
      alert("This note is already opened!")
      return
    }
    const emptySlot = displayNotes.findIndex(index => index === -1);
    if (emptySlot === -1) {
      alert("מצטערים, ניתן להציג מקסימום 5 פתקים. לא ניתן להציג פתק נוסף");
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
  };

  function handleClick(index) {

    if(currentIndex!==-1){
      let actives = [...isActive]
      actives[currentIndex]=false
      setIsActive(actives);
      displayNotes[currentIndex].data=text;
      displayNotes[currentIndex].history=history;
      
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
      <button className={styles.sidebarToggle} onClick={toggleSidebar}>
        {sidebarOpen ? '✖' : '☰'}
      </button>
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
         <button className={styles.actButton} onClick={addNewNote}><GrAdd size={20} className="myIcon" />
         </button>
        <button onClick={saveNote} className={styles.actButton}><IoIosSave size={20}  className="myIcon" />
        </button>
        <button onClick={deleteeNote} className={styles.actButton}><MdDelete size={20}  className="myIcon" />
        </button>
        </div>
       

        <div className={styles.grid}>
          {displayNotes.map((note, index) =>
            note !== -1 ? (
              <div key={note.id} className={`${styles.cell} ${isActive[index] ? styles.selectedNote : ''}`}>
                <Note
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
