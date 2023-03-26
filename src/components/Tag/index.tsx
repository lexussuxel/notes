import React, {FC} from "react";
import {ReactComponent as Cross} from "../../icons/cross.svg"
import "./styles.scss"

interface ITag{
    text: string;
    rmFunction: (arg0: string)=>void;
    onClick: (arg0: string) => void;
}

const Tag: FC<ITag> = ({text, rmFunction, onClick})=>{
    return(
        <div className="wrapper-tag" onClick={()=>{onClick(text)}}>
            <p>{text}</p>
            <Cross onClick={(e)=>{e.preventDefault();rmFunction(text)}}/>
        </div>
    )
};

export default Tag;