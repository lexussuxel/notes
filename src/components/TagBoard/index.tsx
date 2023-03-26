import React, {FC, useEffect, useState, useContext} from "react";
import TagsContext from "../../tagsContext";
import { ITagContext } from "../../tagsContext";
import Tag from "../Tag";
import "./styles.scss";

// interface ITagBoard{
//     setFilter: (arg0:string)=>void;
// }

// const TagBoard:FC<ITagBoard> = () => {
const TagBoard = ()=> {
    const {tags, setTags} = useContext<ITagContext>(TagsContext)
    function rmFunction(a:string){
        localStorage.setItem('tags', JSON.stringify(tags.filter(tag=>tag!==a)));
        setTags(tags.filter(tag=>tag!==a));
       
    } ;
    // useEffect(()=>{
    //    setData(JSON.parse(localStorage.getItem('tags') || "[]")); 
    // },[]);

    return(
        <div className='wrapper-tags'>
            <p className="title">Recently added tags</p>
            <div className="wrapper-board">
                {tags.map((tag)=>
                <Tag text={tag} rmFunction={rmFunction} onClick={(a)=>console.log(a)}/>)}
            </div>
        </div>
    )
}

export default TagBoard;