import React,{useState} from 'react';
import EditorControl from '../EditorControl/EditorControl'
import Keyboard from '../Keyboard/Keyboard.jsx'
import './TextEdit.css';


 function TextEdit(props){

const[currentLanguage,setCurrentLanguage]=useState("English");
const [history, setHistory] = useState([]);
const [searchWord, setSearchWord] = useState('');
const [replaceWord, setReplaceWord] = useState('');







    return(

         <div className="text-editor-container">
            <div className="editor-controls">
              <EditorControl setText={props.setText}  text={props.text}  setColor={props.setColor} color={props.color} setFont={props.setFont} setFontSize={props.setFontSize} setDirection={props.setDirection} setCurrentLanguage={setCurrentLanguage} history={history} setHistory={setHistory} setHighlightedIndexes={props.setHighlightedIndexes}  setFocusTarget={props.setFocusTarget} searchWord={searchWord} replaceWord={replaceWord} />
            </div>
        
              <Keyboard setText={props.setText} text={props.text} color={props.color} font={props.font} fontSize={props.fontSize} currentLanguage={currentLanguage} history={history} setHistory={setHistory} focusTarget={props.focusTarget} setSearchWord={setSearchWord} setReplaceWord={setReplaceWord} />  
           </div>
           
    )

}

export default TextEdit