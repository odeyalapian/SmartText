import React from 'react';
import styles from './Note.module.css'; // תוודא שהקובץ נקרא נכון עם סיומת .css

function Note(props) {

  
  return (
    <div
      onClick={() => props.handleClick(props.index)}
      className={styles.textDisplayContainer} // השתמש ב־CSS Modules פה
    >
      <label>{props.noteName}</label>
      {props.isActive && <button className={styles.closeBtn} onClick={(e) => { e.stopPropagation(); props.closeNote(props.index)}}>✖</button>}
      <div
        className={styles.textDisplayContent} // השתמש ב־CSS Modules פה
        style={{ direction: props.direction }}
        onClick={() => props.setFocusTarget('text')}
      >
        {(props.currentIndex === props.index ? props.text : props.noteData).map(
          (item, index) => {
            const isHighlighted = props.highlightedIndexes.includes(index);
            const style = isHighlighted
              ? { ...item.style, backgroundColor: '#add8e6' }
              : item.style;

            return (
              <span className={styles.letter} key={index} style={style}>
                {item.char}
              </span>
            );
          }
        )}
      </div>
    </div>
  );
}

export default Note;
