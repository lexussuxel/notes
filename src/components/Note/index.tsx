import React from 'react'
import "./styles.scss"
import {ReactComponent as Cross} from "../../icons/cross.svg"
import {ReactComponent as Pencil} from "../../icons/pencil.svg"

interface INote{
    title: string;
    text?: string;
    id: string;
    rmFunction: (arg0: string)=>void;
    editFunction: (arg0:string)=>void;
}

const Note:React.FC<INote> = ({title, text, rmFunction, editFunction, id})=>{
   // const textString = 
    return(
        <div className="wrapper-note">
            <div className="note-title">
                <p>{title}</p>
                <div>
                    <Pencil onClick={()=>editFunction(id)}/>
                    <Cross onClick={()=>rmFunction(id)}/>
                </div>
            </div>
            <hr/>
            <p>{text}</p>
            {/* <p id="text-area" dangerouslySetInnerHTML={{ __html:textString}}/> */}
   
        </div>
    )
};

export default Note;