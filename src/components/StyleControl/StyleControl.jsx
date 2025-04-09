import React, {useState} from 'react';
import FontSelector from '../FontSelector/FontSelector';
import ColorSelector from '../ColorSelector/ColorSelector';
import './StyleControl.css'




function StyleControl(props){


  const [applyToAll, setApplyToAll] = useState(true); // true = All

const toggleApplyMode = () => {
  setApplyToAll(prev => !prev);
};




    return (   
        
        <div className="styles-control">
          <FontSelector setFont={props.setFont} setFontSize={props.setFontSize} setText={props.setText} text={props.text} applyToAll={applyToAll} setHistory={props.setHistory} />
          <ColorSelector setColor={props.setColor} color={props.color} setText={props.setText} text={props.text} applyToAll={applyToAll} setHistory={props.setHistory} />
          <button onClick={toggleApplyMode}>
           {applyToAll ? 'All' : 'From now'}
          </button>

        </div>
    
      );
    };


export default StyleControl