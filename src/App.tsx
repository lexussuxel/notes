import React, {useState} from 'react';
import NoteBoard from './components/NoteBoard';
import TagBoard from './components/TagBoard';
import FilterContext from './filterContext';
import './main.scss';
import TagsContext from './tagsContext';

function App() {
  // const [a, setA] = useState<Array<string>>
  const [tags, setTags] = useState<Array<string>>(JSON.parse(localStorage.getItem('tags')||"[]"))
  return (
    <FilterContext.Provider value={""}>
      <TagsContext.Provider value={{tags:tags, setTags:setTags}}>
      <div>
          <p className="Title">notes.</p>
          <div className="App">
          <NoteBoard/>
          <TagBoard/>
          </div>
    </div>
      </TagsContext.Provider>
    </FilterContext.Provider>
  );
}

export default App;
