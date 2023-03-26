import React, {useEffect, useState} from 'react';
import "./styles.scss"
import Note from "../Note"
import { ITagData } from '../TagBoard';
import Modal from '../Modal';
import { IModalEnum } from '../Modal';

export interface INoteData {
  title: string;
  text?: string;
  tags: Array<ITagData>;
  id: string;
}

function NoteBoard() {
  const [data, setData] = useState<INoteData[]>([]);
  const [modalDisabled, setModalDisabled] = useState(true);
  const [modalStatus, setModalStatus] = useState<IModalEnum>(IModalEnum.CREATING);
  const [editNote, setEditNote] = useState<INoteData|null>(null)

  const removeFunction = (a:string)=>{
    localStorage.setItem('notes', JSON.stringify(data.filter(d=> d.id !== a)))
    setData(data.filter(d=> d.id !== a))
  }
  
  useEffect(()=>{
      setData(JSON.parse(localStorage.getItem('notes')||"[]"))
  },[])

  const addNote = () => {
    setModalStatus(IModalEnum.CREATING)
    setEditNote(null)
    setModalDisabled(false)
  }

  const editFunction = (id: string) =>{
    setModalStatus(IModalEnum.EDITING)
    setEditNote(JSON.parse(localStorage.getItem('notes')||"[]").find((n:INoteData)=>n.id===id))
    setModalDisabled(false)
  }

  return (
    <div className="wrapper-notes">
    <div className="wrapper-title">
      <p className="title">Your notes</p>
      <button onClick={addNote}>add note</button>
    </div>

    <div className='wrapper-board'>
      {data.map((note)=>
        <Note title={note.title} text={note.text} rmFunction={removeFunction} editFunction={editFunction} id={note.id}/>
      )}
        
    </div>
    {editNote?
        <Modal disabled={modalDisabled} status={modalStatus} close={()=>{setModalDisabled(true)}} id={editNote.id} text={editNote.text} title={editNote.title} setData={setData}/>:
        <Modal disabled={modalDisabled} status={modalStatus} close={()=>{setModalDisabled(true)}} setData={setData}/>
    }

    </div>
 
  );
}

export default NoteBoard;

