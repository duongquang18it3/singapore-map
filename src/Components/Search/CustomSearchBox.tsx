import { useCallback, useState } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useAppState, useAppStateDispatch } from '../AppContext/AppContext';
import { useEffect } from 'react';
import { useRef } from 'react';

const SearchBox = ({ currentRefinement, refine }: any) => {
  const AppStateDispatch = useAppStateDispatch();
  const appState = useAppState();

  const [myCurrentRefinement, setMyCurrentRefinement] = useState(currentRefinement);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setMyCurrentRefinement(e.currentTarget.value);
    AppStateDispatch({
      type: "changeSearchQuery",
      searchQuery: {
        query: myCurrentRefinement,
        searchByMrt: false,
      },
    });
  }

  useEffect(() => {
    if (appState.homeMapViewState.searchQuery.searchByMrt) {
      setMyCurrentRefinement(appState.homeMapViewState.searchQuery.query);
    }
  }, [AppStateDispatch, appState.homeMapViewState.searchQuery]);
  
  useEffect(() => {
    refine(myCurrentRefinement);
  }, [myCurrentRefinement])
  

  return (
    <form noValidate action="" role="search" onSubmit={(e) => e.preventDefault()}>
      <input
        id='searchBox'
        type="search"
        placeholder='Search schools by name, address, road name'
        value={myCurrentRefinement}
        onChange={onChange}
      />
    </form>
  )
}



const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;