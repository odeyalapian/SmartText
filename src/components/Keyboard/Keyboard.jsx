import React from 'react';
import './Keyboard.css';



function Keyboard(props) {
  const keyboards = {
    English: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
    ],
    Hebrew: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['/', '\'', 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
      ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
      ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '.']
    ],
    Emoji: [
      ['😀', '😂', '😍', '🤔', '😎', '😊', '😢', '😡', '🙄', '😴'],
      ['👍', '👎', '👌', '👋', '✌️', '🤞', '🙏', '💪', '🤝', '👏'],
      ['❤️', '💔', '💯', '🔥', '✨', '💫', '🌟', '💥', '💦', '🎵'],
      ['🍕', '🍔', '🍦', '🍫', '🍎', '🥑', '🍷', '🍺', '🎂', '🍿']
    ],
    Symbols: [
      ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
      ['-', '_', '=', '+', '[', ']', '{', '}', '|', '\\'],
      [':', '"', '\'', '<', '>', '?', '~', '`', '№', '€'],
      ['£', '¥', '©', '®', '™', '§', '¶', '•', '−', '×']
    ]
  };


  const currentStyle = {
    color: props.color,
    fontFamily: props.font,
    fontSize: props.fontSize
  };

  const handleClick = (char) => {

    if (props.focusTarget === 'text') {
      props.setHistory(prev => [...prev, [...props.text]]);
      props.setText(prevText => [...prevText, { char, style: currentStyle }]);
    } else if (props.focusTarget === 'search') {
      props.setSearchWord(prev => prev + char);
    } else if (props.focusTarget === 'replace') {
      props.setReplaceWord(prev => prev + char);
    }
  };
  return (
    <div className="keyboard-container">
      <div className="keyboard-wrapper">
        {keyboards[props.currentLanguage].map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((char, charIndex) => (
              <button
                key={charIndex}
                className="keyboard-key"
                onClick={() => handleClick(char)}
              >
                {char}
              </button>
            ))}
          </div>
        ))}
        <div className="keyboard-row">
          <button className="keyboard-key keyboard-space" onClick={() => handleClick(' ')}>
            Space
          </button>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;



