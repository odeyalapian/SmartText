import React, { useState, useRef, useEffect } from 'react';
import styles from './ColorSelector.module.css'; // השתמש ב־CSS Modules

function ColorSelector(props) {

  const [isOpen, setIsOpen] = useState(false);
  const colorPickerRef = useRef(null);

  const colorOptions = [
    { id: '#000000', label: 'שחור' },
    { id: '#ff0000', label: 'אדום' },
    { id: '#0000ff', label: 'כחול' },
    { id: '#00aa00', label: 'ירוק' },
    { id: '#ff00ff', label: 'סגול' },
    { id: '#ff8c00', label: 'כתום' },
    { id: '#ffff00', label: 'צהוב' },
    { id: '#a52a2a', label: 'חום' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColorChange = (newColor) => {
    props.setHistory(prevHistory => [...prevHistory, [...props.text]]);
    if (props.applyToAll) {
      // שינוי צבע לכל הטקסט
      const updatedText = props.text.map(item => ({
        ...item,
        style: {
          ...item.style,
          color: newColor
        }
      }));
      props.setText(updatedText);
      props.setColor(newColor);
    } else {
      // רק תווים חדשים מהנקודה הזו
      props.setColor(newColor);
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.colorSelector} ref={colorPickerRef}>
      <label className={styles.colorLabel}>צבע גופן</label>
      <button 
        className={styles.colorButton} 
        style={{ backgroundColor: props.color }} 
        onClick={() => setIsOpen(!isOpen)}
      >
      </button>
  
      {isOpen && (
        <div className={styles.colorDropdown}>
          {colorOptions.map((colorOption) => (
            <button
              key={colorOption.id}
              className={`${styles.colorOption} ${props.color === colorOption.id ? styles.active : ''}`}
              style={{ backgroundColor: colorOption.id }}
              onClick={() => handleColorChange(colorOption.id)}
            >
            </button>
          ))}
        </div>
      )}
    </div>
  );
  
}

export default ColorSelector;
