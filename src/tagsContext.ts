import {createContext} from "react";

export interface ITagContext{
    tags: Array<string>;
    setTags: (arg0: Array<string>)=>void;
}

const TagsContext = createContext<ITagContext>({tags:[], setTags: (a)=>console.log(a)});

export default TagsContext