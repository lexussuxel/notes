import React, { useState, useContext} from 'react';
import "./styles.scss"
import Note from "../Note"
import Modal from '../Modal';
import { IModalEnum } from '../Modal';
import FilterContext from '../../filterContext';

export interface INoteData {
  title: string;
  text?: string;
  tags: Array<string>;
  id: string;
}

function NoteBoard() {
  const [data, setData] = useState<INoteData[]>(JSON.parse(localStorage.getItem('notes')||"[]"));
  const [modalDisabled, setModalDisabled] = useState(true);
  const [modalStatus, setModalStatus] = useState<IModalEnum>(IModalEnum.CREATING);
  const [editNote, setEditNote] = useState<INoteData|null>(null)
  const {filter} = useContext(FilterContext)

  const removeFunction = (a:string)=>{
    localStorage.setItem('notes', JSON.stringify(data.filter(d=> d.id !== a)))
    setData(data.filter(d=> d.id !== a))
  }
  
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
      {data.filter(d => filter === "" || d.tags.includes(filter)).map((note)=>
        <Note title={note.title} text={note.text} rmFunction={removeFunction} editFunction={editFunction} id={note.id} tags={note.tags}/>
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

