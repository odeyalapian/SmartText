import React, { useState } from "react";
import FontSelector from "../FontSelector/FontSelector";
import ColorSelector from "../ColorSelector/ColorSelector";
import styles from "./StyleControl.module.css";

function StyleControl(props) {
  const [applyToAll, setApplyToAll] = useState(true); // true = All

  const toggleApplyMode = () => {
    setApplyToAll((prev) => !prev);
  };

  return (
    <div className={styles.stylesControl}>
      <div className={styles.changes}>
        <button className={styles.applyChangesButton} onClick={toggleApplyMode}>
          <span className={applyToAll ? styles.selected : ""}>All</span>
          <span className={applyToAll ? "" : styles.selected}>From now</span>
        </button>
        <label className={styles.applyChangesLabel}>:Apply changes</label>
      </div>
      <FontSelector
        font={props.font}
        fontSize={props.fontSize}
        setFont={props.setFont}
        setFontSize={props.setFontSize}
        setText={props.setText}
        text={props.text}
        applyToAll={applyToAll}
        setHistory={props.setHistory}
      />
      <ColorSelector
        setColor={props.setColor}
        color={props.color}
        setText={props.setText}
        text={props.text}
        applyToAll={applyToAll}
        setHistory={props.setHistory}
      />
    </div>
  );
}

export default StyleControl;
