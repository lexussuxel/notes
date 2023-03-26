import React, {FC, useState} from "react"
import { INoteData } from "../NoteBoard";

import "./styles.scss";

export enum IModalEnum{
    EDITING, CREATING
}


interface IModal{
    title?: string;
    text?: string;
    status: IModalEnum;
    disabled: boolean;
    id?: string;
    close: ()=>void;
    setData: (arg0: any)=>void;
}

const Modal:FC<IModal> = ({title, text, status, disabled, id, close, setData})=>{
    const [inputTitle, setInputTitle] = useState(title || "");
    const [inputText, setInputText] = useState(text || "");

    const addNewNote = ()=>{
        const data = JSON.parse(localStorage.getItem('notes')||"[]") as Array<INoteData>
        const newId = Math.max.apply(null,data.map(d=>Number.parseInt(d.id)))+1 || 1
        localStorage.setItem('notes', JSON.stringify(
            [...data, {
                id: `${newId}`,
                title: inputTitle,
                text: inputText,
                tags: []
            }]
        ))
        closeWindow();
    }

    const closeWindow = () => {
        setData(JSON.parse(localStorage.getItem('notes') || "[]"))
        setInputText("")
        setInputTitle("")
        close();
    }

    const editNote = ()=>{
        const data = JSON.parse(localStorage.getItem('notes')||"[]") as Array<INoteData>
        const el = data.find(e=> e.id === id) || {title:"", text:"", id: "0", tags:[]}
        el.title = inputTitle
        el.text = inputText
        el.id = id || "";
        localStorage.setItem('notes', JSON.stringify(
            [...data]
        ))
        closeWindow();
    }
    return (
        <div className={disabled?"wrapper-none":"wrapper-modal"} onClick={close}>
            <div className="modal-window" onClick={e=> {e.stopPropagation()}}>
            <p>Enter title</p>
            <input value={inputTitle} onChange={e=>setInputTitle(e.target.value)}/>
            <hr/>
            <p>Enter text</p>
            <textarea onChange={e=>setInputText(e.target.value)} value={inputText}/>
            <hr/>
            <div className="plus" onClick={()=>status === IModalEnum.CREATING?addNewNote():editNote()}>+</div>
            </div>
        </div>
    )
}

export default Modal;