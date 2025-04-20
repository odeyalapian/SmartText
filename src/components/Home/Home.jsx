import React, { useState } from 'react';
import styles from './Home.module.css';
import TextEdit from '../TextEdit/TextEdit';
import NotesBoard from '../NotesBoard/NotesBoard';  
import { CiLogout } from "react-icons/ci";

function Home({username, setIsConnected}) {
  const [text, setText] = useState([]);
  const [color, setColor] = useState("black");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("18");
  const [direction, setDirection] = useState("ltr");
  const [highlightedIndexes, setHighlightedIndexes] = useState([]);
  const [focusTarget, setFocusTarget] = useState('text');
  const [history, setHistory] = useState([]);

  
  return (
    <div className={styles.app}>
      <div className={styles.header}>
      <label className={styles.helloSpan}>!Hello {username}</label>
      <CiLogout className={styles.signOut}size={(35)} onClick={()=>setIsConnected(false)}/>
      </div>
      
    <div className={styles.splitContainer}>
      <div className={styles.topHalf}>
        <NotesBoard
        username={username}
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

export default Home;
