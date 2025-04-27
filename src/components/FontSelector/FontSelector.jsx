import React from "react";
import styles from "./FontSelector.module.css";

function FontSelector(props) {
  const fonts = [
    { id: "Arial", label: "Arial" },
    { id: "Times New Roman", label: "Times New Roman" },
    { id: "Courier New", label: "Courier New" },
    { id: "David", label: "David" },
    { id: "Miriam", label: "Miriam" },
  ];

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 42];

  const selectedFont = props.font || "Arial";
  const selectedFontSize = props.fontSize || 18;

  const handleFontChange = (newFont) => {
    props.setHistory((prev) => [...prev, [...props.text]]);
    if (props.applyToAll && Array.isArray(props.text)) {
      const updatedText = props.text.map((item) => ({
        ...item,
        style: {
          ...item.style,
          fontFamily: newFont,
        },
      }));
      props.setText(updatedText);
    }
    props.setFont(newFont);
  };

  const handleFontSizeChange = (newSize) => {
    props.setHistory((prev) => [...prev, [...props.text]]);
    if (props.applyToAll && Array.isArray(props.text)) {
      const updatedText = props.text.map((item) => ({
        ...item,
        style: {
          ...item.style,
          fontSize: newSize,
        },
      }));
      props.setText(updatedText);
    }
    props.setFontSize(newSize);
  };

  return (
    <div className={styles.fontSelector}>
      <div className={styles.fontStyle}>
        <select
          value={props.font}
          onChange={(e) => handleFontChange(e.target.value)}
        >
          {fonts.map((font) => (
            <option
              key={font.id}
              value={font.id}
              style={{ fontFamily: font.id }}
            >
              {font.label}
            </option>
          ))}
        </select>
        <label>:Font family</label>
      </div>

      <div className={styles.fontStyle}>
        <select
          value={props.fontSize}
          onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
        <label>:Font size</label>
      </div>
    </div>
  );
}

export default FontSelector;
