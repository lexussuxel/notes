import React from 'react'
import "./styles.scss"
import {ReactComponent as Cross} from "../../icons/cross.svg"
import {ReactComponent as Pencil} from "../../icons/pencil.svg"


interface INote{
    title: string;
    text?: string;
    id: string;
    tags: Array<string>;
    rmFunction: (arg0: string)=>void;
    editFunction: (arg0:string)=>void;
}

const Note:React.FC<INote> = ({title, text, rmFunction, editFunction, id, tags})=>{
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
            <hr/>
            <div className="wrapper-tags-note">
            <p>tags: </p>
               {tags.map(tag=>(
                <div className="tag-note">{tag}</div>
               ))}
            </div>
 
            {/* <p id="text-area" dangerouslySetInnerHTML={{ __html:textString}}/> */}
   
        </div>
    )
};

export default Note;