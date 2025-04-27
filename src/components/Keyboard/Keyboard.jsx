import React from "react";
import styles from "./keyboard.module.css";

function Keyboard(props) {
  const keyboards = {
    English: [
      ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
      ["p", "o", "i", "u", "y", "t", "r", "e", "w", "q"],
      [";", "l", "k", "j", "h", "g", "f", "d", "s", "a"],
      ["/", ".", ",", "m", "n", "b", "v", "c", "x", "z"],
    ],
    Hebrew: [
      ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
      ["פ", "ם", "ן", "ו", "ט", "א", "ר", "ק", "'", "/"],
      ["ף", "ך", "ל", "ח", "י", "ע", "כ", "ג", "ד", "ש"],
      [".", "ץ", "ת", "צ", "מ", "נ", "ה", "ב", "ס", "ז"],
    ],
    Emoji: [
      ["😀", "😂", "😍", "🤔", "😎", "😴", "😢", "😡", "🙄", "😊"],
      ["👍", "👎", "👌", "👋", "✌️", "🤞", "🙏", "💪", "🤝", "👏"],
      ["❤️", "💔", "💯", "🔥", "✨", "💫", "🌟", "💥", "💦", "🎵"],
      ["🍕", "🍔", "🍦", "🍫", "🍎", "🥑", "🍷", "🍺", "🎂", "🍿"],
    ],
    Symbols: [
      ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"],
      ["-", "_", "=", "+", "[", "]", "{", "}", "|", "\\"],
      [":", '"', "'", "<", ">", "?", "~", "`", "№", "€"],
      ["£", "¥", "©", "®", "™", "§", "¶", "•", "−", "×"],
    ],
  };

  const currentStyle = {
    color: props.color,
    fontFamily: props.font,
    fontSize: props.fontSize,
  };

  const handleClick = (char) => {
    console.log(props.focusTarget);

    if (props.focusTarget === "text") {
      props.setHistory((prev) => [...prev, [...props.text]]);
      props.setText((prevText) => [...prevText, { char, style: currentStyle }]);
    } else if (props.focusTarget === "search") {
      props.setSearchWord((prev) => prev + char);
    } else if (props.focusTarget === "replace") {
      props.setReplaceWord((prev) => prev + char);
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
          <button
            className={`${styles.keyboardKey} ${styles.keyboardSpace}`}
            onClick={() => handleClick(" ")}
          >
            Space
          </button>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
