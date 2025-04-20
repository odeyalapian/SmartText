import React, { useState } from 'react';
import styles from './App.module.css';
import TextEdit from './components/TextEdit/TextEdit';
import NotesBoard from './components/NotesBoard/NotesBoard';  

function App() {
  const [text, setText] = useState([]);
  const [color, setColor] = useState("black");
  const [font, setFont] = useState("Ariel");
  const [fontSize, setFontSize] = useState("12px");
  const [direction, setDirection] = useState("ltr");
  const [highlightedIndexes, setHighlightedIndexes] = useState([]);
  const [focusTarget, setFocusTarget] = useState('text');
  const [history, setHistory] = useState([]);

  
  return (
    <div className={styles.app}>
    <div className={styles.splitContainer}>
      <div className={styles.topHalf}>
        <NotesBoard
          history={history}
          setHistory={setHistory}
          text={text}
          setText={setText}
          color={color}
          font={font}
          fontSize={fontSize}
          direction={direction}
          highlightedIndexes={highlightedIndexes}
          setFocusTarget={setFocusTarget}
        />
      </div>
      <div className={styles.bottomHalf}>
        <TextEdit
          history={history}
          setHistory={setHistory}
          setText={setText}
          text={text}
          setColor={setColor}
          color={color}
          font={font}
          fontSize={fontSize}
          setFont={setFont}
          setFontSize={setFontSize}
          setDirection={setDirection}
          setHighlightedIndexes={setHighlightedIndexes}
          focusTarget={focusTarget}
          setFocusTarget={setFocusTarget}
        />
      </div>
    </div>
  </div>
  
  );
}

export default App;
