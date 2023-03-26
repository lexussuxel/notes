import {createContext} from "react";

export interface IFilterContext{
    filter: string;
    setFilter: (arg0:string)=>void;
}

const FilterContext = createContext<IFilterContext>({filter: "", setFilter: (a)=>console.log(a)});

export default FilterContext