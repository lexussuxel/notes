import React, { useContext} from "react";
import FilterContext from "../../filterContext";
import { IFilterContext } from "../../filterContext";
import TagsContext from "../../tagsContext";
import { ITagContext } from "../../tagsContext";
import {ReactComponent as Cross} from "../../icons/cross.svg"
import Tag from "../Tag";
import "./styles.scss";


const TagBoard = ()=> {
    const {tags, setTags} = useContext<ITagContext>(TagsContext);
    const {filter, setFilter} = useContext<IFilterContext>(FilterContext);
    function rmFunction(a:string){
        localStorage.setItem('tags', JSON.stringify(tags.filter(tag=>tag!==a)));
        setTags(tags.filter(tag=>tag!==a));
       
    } ;

    return(
        <div className='wrapper-tags'>
            <p className="title">Recently added tags</p>
            {filter !== "" &&
                <div className="filter-tag">
                    <p>Filter tag: {filter}</p>
                    <Cross onClick={()=>setFilter("")}/>
                </div>
            }
  
            <div className="wrapper-board">
                {tags.map((tag)=>
                <Tag text={tag} rmFunction={rmFunction}/>)}
            </div>
        </div>
    )
}

export default TagBoard;