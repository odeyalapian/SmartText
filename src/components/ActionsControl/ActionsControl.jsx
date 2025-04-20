import styles from './ActionControl.module.css';
import { FaUndo } from "react-icons/fa";


function ActionControl(props) {
  
  function deleteChar() {
    if (props.text.length > 0) {
      props.setHistory(prevHistory => [...prevHistory, [...props.text]]);
      props.setText(props.text.slice(0, -1));
    }
  }

  function deleteWord() {
    let newText = [...props.text];
    while (newText.length > 0) {
      const lastChar = newText[newText.length - 1].char;
      newText.pop();
      if (lastChar === ' ') break;
    }
    props.setHistory(prevHistory => [...prevHistory, [...props.text]]);
    props.setText(newText);
  }

  function deleteAll() {
    props.setHistory(prevHistory => [...prevHistory, [...props.text]]);
    props.setText([]);
  }

  const undo = () => {
    if (props.history.length === 0) {
      //props.setText([]);
    } else {
      const lastState = props.history[props.history.length - 1];
      props.setText([...lastState]);
      props.setHistory(prev => prev.slice(0, -1));
    }
  };

  const handleSearch = () => {
    const indexes = [];
    for (let i = 0; i <= props.text.length - props.searchWord.length; i++) {
      const segment = props.text.slice(i, i + props.searchWord.length);
      const segmentStr = segment.map(c => c.char).join('');
      if (segmentStr === props.searchWord) {
        for (let j = 0; j < props.searchWord.length; j++) {
          indexes.push(i + j);
        }
      }
    }
    props.setHighlightedIndexes(indexes);
  };

  const handleReplace = () => {
    const newText = [];
    let i = 0;
    while (i < props.text.length) {
      const segment = props.text.slice(i, i + props.searchWord.length);
      const segmentStr = segment.map(c => c.char).join('');
      if (segmentStr === props.searchWord) {
        const style = segment[0].style;
        for (let char of props.replaceWord) {
          newText.push({ char, style });
        }
        i += props.searchWord.length;
      } else {
        newText.push(props.text[i]);
        i++;
      }
    }
    props.setHistory(prevHistory => [...prevHistory, [...props.text]]);
    props.setText(newText);
    props.setHighlightedIndexes([]);
  };

  return (
    <div className={styles.actionsControls}>

    <button className={styles.undoBtn} onClick={undo}>Undo <FaUndo/> </button>

      <div className={styles.deleteSection}>
        <button onClick={deleteChar}>Delete char</button>
        <button onClick={deleteWord}>Delete word</button>
        <button onClick={deleteAll}>Delete all</button>
      </div>
      
     
      <div className={styles.searchSection}>
        <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
        <button className={styles.clearButton} onClick={() => props.setSearchWord('')}>✖</button>

        <input
          type="text"
          placeholder="Search..."
          value={props.searchWord}
          onClick={() => props.setFocusTarget('search')}
          readOnly
        />
        </div>
      
      <div className={styles.searchSection}>
        <button className={styles.searchBtn} onClick={handleReplace}>Replace</button>
        <button className={styles.clearButton} onClick={() => props.setReplaceWord('')}>✖</button>
        <input
          type="text"
          placeholder="Replace with..."
          value={props.replaceWord}
          onFocus={() => props.setFocusTarget('replace')}
          readOnly
        />
      </div>
    
    </div>
  );
}

export default ActionControl;
