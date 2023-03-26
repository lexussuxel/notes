import React, {FC, useEffect, useState} from "react";
import Tag from "../Tag";
import "./styles.scss";

interface ITagBoard{
    setFilter: (arg0:string)=>void;
}
export interface ITagData{
    text: string;
    id: string;
}

const TagBoard:FC<ITagBoard> = ({setFilter}) => {

    const [data, setData] = useState<ITagData[]>([]);
    function rmFunction(a:string){
        localStorage.setItem('tags', JSON.stringify(data.filter(tag=>tag.text!==a)));
        setData(data.filter(tag=>tag.text!==a));
       
    } ;
    useEffect(()=>{
       setData(JSON.parse(localStorage.getItem('tags') || "[]")); 
    },[]);
//{"text":"#shop", "id":"0"}

    return(
        <div className='wrapper-tags'>
            <p className="title">Tags</p>
            <div className="wrapper-board">
                {data.map((tag)=>
                <Tag text={tag.text} rmFunction={rmFunction} onClick={setFilter}/>)}
            </div>
        </div>
    )
}

export default TagBoard;