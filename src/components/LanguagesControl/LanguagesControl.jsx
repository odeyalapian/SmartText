import React from "react";
import styles from "./LanguagesControl.module.css";

function LanguagesControl(props) {
  function changeLanguage(language) {
    props.setCurrentLanguage(language);
    language === "Hebrew"
      ? props.setDirection("rtl")
      : props.setDirection("ltr");
  }

  return (
    <div className={styles.languagesControl}>
      <button
        className={`${styles.languageButton} ${
          props.currentLanguage === "Hebrew"
            ? styles.languageButtonSelected
            : ""
        }`}
        onClick={() => changeLanguage("Hebrew")}
      >
        Hebrew
      </button>
      <button
        className={`${styles.languageButton} ${
          props.currentLanguage === "English"
            ? styles.languageButtonSelected
            : ""
        }`}
        onClick={() => changeLanguage("English")}
      >
        English
      </button>
      <button
        className={`${styles.languageButton} ${
          props.currentLanguage === "Emoji" ? styles.languageButtonSelected : ""
        }`}
        onClick={() => props.setCurrentLanguage("Emoji")}
      >
        😊
      </button>
      <button
        className={`${styles.languageButton} ${
          props.currentLanguage === "Symbols"
            ? styles.languageButtonSelected
            : ""
        }`}
        onClick={() => props.setCurrentLanguage("Symbols")}
      >
        Symbols
      </button>
    </div>
  );
}

export default LanguagesControl;
