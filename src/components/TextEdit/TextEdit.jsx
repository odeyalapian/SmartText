import React, { useState } from "react";
import Keyboard from "../Keyboard/Keyboard.jsx";
import styles from "./TextEdit.module.css";
import ActionControl from "../ActionsControl/ActionsControl";
import StyleControl from "../StyleControl/StyleControl";
import LanguagesControl from "../LanguagesControl/LanguagesControl";

function TextEdit(props) {
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [searchWord, setSearchWord] = useState("");
  const [replaceWord, setReplaceWord] = useState("");

  return (
    <div className={styles.textEditorContainer}>
      <div className={styles.editorRow}>
        <div className={styles.sideSection}>
          <ActionControl
            setText={props.setText}
            text={props.text}
            history={props.history}
            setHistory={props.setHistory}
            setHighlightedIndexes={props.setHighlightedIndexes}
            setFocusTarget={props.setFocusTarget}
            searchWord={searchWord}
            replaceWord={replaceWord}
            setReplaceWord={setReplaceWord}
            setSearchWord={setSearchWord}
          />
        </div>

        <div className={styles.middleSection}>
          <LanguagesControl
            setDirection={props.setDirection}
            setCurrentLanguage={setCurrentLanguage}
            currentLanguage={currentLanguage}
          />
          <Keyboard
            setText={props.setText}
            text={props.text}
            color={props.color}
            font={props.font}
            fontSize={props.fontSize}
            currentLanguage={currentLanguage}
            history={props.history}
            setHistory={props.setHistory}
            focusTarget={props.focusTarget}
            setSearchWord={setSearchWord}
            setReplaceWord={setReplaceWord}
          />
        </div>

        <div className={styles.sideSection}>
          <StyleControl
            setColor={props.setColor}
            color={props.color}
            font={props.font}
            fontSize={props.fontSize}
            setFont={props.setFont}
            setFontSize={props.setFontSize}
            setText={props.setText}
            text={props.text}
            history={props.history}
            setHistory={props.setHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default TextEdit;
