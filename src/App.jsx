import React,{useState} from 'react';
import './App.css';
import TextDisplay from './components/TextDisplay/TextDisplay'
import TextEdit from './components/TextEdit/TextEdit'


function App() {

const [text, setText] = useState([]);
const[color,setColor]=useState("black");
const[font,setFont]=useState("Ariel");
const[fontSize,setFontSize]=useState("12px");
const[direction,setDirection]=useState("ltr");
const [highlightedIndexes, setHighlightedIndexes] = useState([]);
const [focusTarget, setFocusTarget] = useState('text');





  return (
    <div className="app">
      
      <TextDisplay text={text} color={ color} font={font} fontSize={fontSize} direction={direction} highlightedIndexes={highlightedIndexes} setFocusTarget={setFocusTarget} />

      <TextEdit setText={setText} text={text} setColor={setColor} color={color} font={font} fontSize={fontSize} setFont={setFont} setFontSize={setFontSize} setDirection={setDirection} setHighlightedIndexes={setHighlightedIndexes}  focusTarget={focusTarget} setFocusTarget={setFocusTarget} />  
    </div>
   
  );
}

export default App;