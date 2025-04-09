import React, { useState } from 'react';

function ActionControl(props) {
  
  const [showReplaceInput, setShowReplaceInput] = useState(false);

  
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
      props.setText([]);
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

    props.setText(newText);
    props.setHighlightedIndexes([]);
    setShowReplaceInput(false)
  };
  


  return (
    <div className='actions-controls'>
      <button onClick={deleteChar}>delete char</button>
      <button onClick={deleteWord}>delete word</button>
      <button onClick={deleteAll}>delete all</button>
      <button onClick={undo}>undo</button>
      <input
        type="text"
        placeholder="Search..."
        value={props.searchWord}
        onFocus={() => props.setFocusTarget('search')}
        readOnly
      />
      <button onClick={handleSearch}>חפש</button>
      <button onClick={() => setShowReplaceInput(true)}>חפש והחלף</button>

      {showReplaceInput && (
        <>
          <input
            type="text"
            placeholder="החלף ב..."
            value={props.replaceWord}
            onFocus={() => props.setFocusTarget('replace')}
            readOnly 
          />
          <button onClick={handleReplace}>בצע החלפה</button>
        </>
      )}
    </div>
  );
}

export default ActionControl;
