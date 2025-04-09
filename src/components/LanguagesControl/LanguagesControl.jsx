import React from 'react';
//import 'LanguagesControl.css'

function LanguagesControl(props){


    function changeLanguage(language){
        props.setCurrentLanguage(language)
        language=="Hebrew" ? props.setDirection("rtl") : props.setDirection("ltr")
    }


    return(

         <div className='LanguagesControl'>
            <button onClick={()=>{changeLanguage("Hebrew")}}>Hebrew</button>
            <button onClick={()=>{changeLanguage("English")}}>English</button>
            <button onClick={()=>{props.setCurrentLanguage("Emoji")}}>Emoji</button>
            <button onClick={()=>{props.setCurrentLanguage("Symbols")}}>Symbols</button>
        </div>
           
    )

}

export default LanguagesControl