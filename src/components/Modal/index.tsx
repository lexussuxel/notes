import React, {FC, useState, useContext, useEffect} from "react"
import { INoteData } from "../NoteBoard";
import TagsContext from "../../tagsContext";
import { ITagContext } from "../../tagsContext";
import "./styles.scss";

export enum IModalEnum{
    EDITING, CREATING, NONE
}


interface IModal{
    title: string;
    text: string;
    status: IModalEnum;
    disabled: boolean;
    id?: string;
    close: ()=>void;
    setData: (arg0: any)=>void;
}

const Modal:FC<IModal> = ({title, text, status, disabled, id, close, setData})=>{
    const [inputTitle, setInputTitle] = useState(title || "");
    const [inputText, setInputText] = useState(text || "");
    const {tags, setTags} = useContext<ITagContext>(TagsContext)
    useEffect(()=>{
        setInputText(text || "")
        setInputTitle(title || "")
    }, [disabled, text, title])

    const closeWindow = () => {
        setData(JSON.parse(localStorage.getItem('notes') || "[]"))
        setInputText("")
        setInputTitle("")
        close();
    }
    const editTags=()=>{
        if(inputTitle === "")
        alert('You can not create note without title')
        else {
            const tagsTitle = inputTitle.match(/\u0023\S+[a-z|0-9]\b/g) as Array<string> || [];
            const tagsText = inputText.match(/\u0023\S+[a-z|0-9]\b/g) as Array<string> || [];
            const allTags =Array.from(new Set(tagsTitle.concat(tagsText)));
            setTags(Array.from(new Set(tags.concat(allTags))));
            localStorage.setItem('tags', JSON.stringify(Array.from(new Set(tags.concat(allTags)))))
            status === IModalEnum.CREATING?addNewNote(allTags):editNote(allTags)
        }
    }

    const addNewNote = (arr: Array<any>)=>{
        const data = JSON.parse(localStorage.getItem('notes')||"[]") as Array<INoteData>
        const newId = data.length === 0? 1:Math.max.apply(null,data.map(d=>Number.parseInt(d.id)))+1
        localStorage.setItem('notes', JSON.stringify(
            [...data, {
                id: `${newId}`,
                title: inputTitle,
                text: inputText,
                tags: arr
            }]
        ))
        closeWindow();
    }

    const editNote = (arr: Array<any>)=>{
        const data = JSON.parse(localStorage.getItem('notes')||"[]") as Array<INoteData>
        const el = data.find(e=> e.id === id) || {title:"", text:"", id: "0", tags:arr}
        el.title = inputTitle
        el.text = inputText
        el.id = id || "";
        el.tags = arr;
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
             <p>Preview: </p>
             <div className="preview-text">
                {inputTitle.replace(/\u0023\S+[a-z|0-9]\b/g, "///$&///")
                .split("///")
                .map((el:string)=>
                 <p className={el[0]==="#"?"highlight":undefined}>{el}</p>
                 )}
            </div>
             <div className="preview-text">
                {inputText.replace(/\u0023\S+[a-z|0-9]\b/g, "///$&///")
                .split("///")
                .map((el:string)=>
                 <p className={el[0]==="#"?"highlight":undefined}>{el}</p>
                 )}
            </div>
            <hr/>
           
            <div className="plus" onClick={editTags}>+</div>
            </div>
        </div>
    )
}

export default Modal;