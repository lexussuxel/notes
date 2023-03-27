import React, {FC, useContext} from "react";
import FilterContext from "../../filterContext";
import {ReactComponent as Cross} from "../../icons/cross.svg"
import "./styles.scss"

interface ITag{
    text: string;
    rmFunction: (arg0: string)=>void;
}

const Tag: FC<ITag> = ({text, rmFunction})=>{
    const {setFilter} = useContext(FilterContext)
    return(
        <div className="wrapper-tag" onClick={()=>{setFilter(text)}}>
            <p>{text}</p>
            <Cross onClick={(e)=>{e.stopPropagation();rmFunction(text)}}/>
        </div>
    )
};

export default Tag;