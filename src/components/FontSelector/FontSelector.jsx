import React from 'react';
//import './FontSelector.css';



 function FontSelector(props){

    
    const fonts = [
        { id: 'Arial', label: 'Arial' },
        { id: 'Times New Roman', label: 'Times New Roman' },
        { id: 'Courier New', label: 'Courier New' },
        { id: 'David', label: 'David' },
        { id: 'Miriam', label: 'Miriam' }
      ];
    
      const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 42];
    
      const handleFontChange = (newFont) => {
        props.setHistory(prevHistory => [...prevHistory, [...props.text]]);
        if (props.applyToAll && Array.isArray(props.text)) {
          const updatedText = props.text.map(item => ({
            ...item,
            style: {
              ...item.style,
              fontFamily: newFont
            }
          }));
          props.setText(updatedText);
          props.setFont(newFont);
        } else {
          props.setFont(newFont);
        }
      };
      
      const handleFontSizeChange = (newSize) => {
        props.setHistory(prevHistory => [...prevHistory, [...props.text]]);
        if (props.applyToAll && Array.isArray(props.text)) {
          const updatedText = props.text.map(item => ({
            ...item,
            style: {
              ...item.style,
              fontSize: newSize
            }
          }));
          props.setText(updatedText);
          props.setFontSize(newSize);
        } else {
          props.setFontSize(newSize);
        }
      };
      
      return (
        <div className="font-selector">
          <div className="font-family-selector">
            <select  
              onChange={(e) => handleFontChange(e.target.value)}
              className="font-select"
            >
              {fonts.map(fontOption => (
                <option key={fontOption.id} value={fontOption.id}>
                  {fontOption.label}
                </option>
              ))}
            </select>
          </div>
    
          <div className="font-size-selector">
            <select 
              onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
              className="font-size-select"
            >
              {fontSizes.map(size => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    };
    

export default FontSelector;













