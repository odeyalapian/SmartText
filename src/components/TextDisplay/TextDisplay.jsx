import React from 'react';
import './TextDisplay.css';



function TextDisplay(props) {

    console.log(props.highlightedIndexes)
    

    return (
      <div className="text-display-container" onClick={() => props.setFocusTarget('text')} >
        <div className="text-display-content" style={{ direction: props.direction }}>
          {props.text.map((item, index) => {
            const isHighlighted = props.highlightedIndexes.includes(index);
            const style = isHighlighted
              ? { ...item.style, backgroundColor: '#add8e6' }
              : item.style;
  
            return (
              <span key={index} style={style}>
                {item.char}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
  
export default TextDisplay;