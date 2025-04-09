import React from 'react';
import ActionControl from '../ActionsControl/ActionsControl'
import StyleControl from '../StyleControl/StyleControl'
import LanguagesControl from '../LanguagesControl/LanguagesControl'
import './EditorControl.css'

function EditorControl(props){




    return(

         <div className='all-controls'>
            <ActionControl setText={props.setText}  text={props.text} history={props.history} setHistory={props.setHistory} setHighlightedIndexes={props.setHighlightedIndexes}  setFocusTarget={props.setFocusTarget}  searchWord={props.searchWord} replaceWord={props.replaceWord}/>
            <StyleControl  setColor={props.setColor} color={props.color} setFont={props.setFont} setFontSize={props.setFontSize} setText={props.setText}  text={props.text} history={props.history} setHistory={props.setHistory}/>
            <LanguagesControl setDirection={props.setDirection} setCurrentLanguage={props.setCurrentLanguage}/>
        </div>
           
    )

}

export default EditorControl