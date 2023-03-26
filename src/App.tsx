import React, {useState} from 'react';
import NoteBoard from './components/NoteBoard';
import TagBoard from './components/TagBoard';
import FilterContext from './filterContext';
import './main.scss';

function App() {
  const [filter, setFilter] = useState('');
  return (
    <FilterContext.Provider value={filter}>
    <div>
          <p className="Title">notes.</p>
          <div className="App">
          <NoteBoard/>
          <TagBoard setFilter={setFilter}/>
          </div>
    </div>
    </FilterContext.Provider>
  );
}

export default App;
