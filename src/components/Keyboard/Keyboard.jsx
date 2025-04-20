import React from 'react';
import styles from './keyboard.module.css';

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

    console.log(props.focusTarget)
    
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
    <div className={styles.keyboardContainer}>
      <div className={styles.keyboardWrapper}>
        {keyboards[props.currentLanguage].map((row, rowIndex) => (
          <div key={rowIndex} className={styles.keyboardRow}>
            {row.map((char, charIndex) => (
              <button
                key={charIndex}
                className={styles.keyboardKey}
                onClick={() => handleClick(char)}
              >
                {char}
              </button>
            ))}
          </div>
        ))}
        <div className={styles.keyboardRow}>
          <button className={`${styles.keyboardKey} ${styles.keyboardSpace}`} onClick={() => handleClick(' ')}>
            Space
          </button>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
