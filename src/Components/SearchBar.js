import { useState } from 'react';
import { useDogStore } from '../DogStore';
import styled from 'styled-components';
import { columns } from './Table.js';

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBtn = styled.button`
  background-color: #0a192f;
  border: 1px solid white;
  color: white;
  font-family: 'monospace';
  margin: 0px 5px;
  padding: 5px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.5s;
  }
  &:active {
    transform: translateX(-2px) translateY(-2px);
    transition: transform 0.5s;
  }
`;

const StyledSearchBar = styled.input`
  background-color: #0a192f;
  border: 1px solid white;
  color: white;
  font-family: 'monospace';
  margin-right: 5px;
`;

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const { modifiedDogList } = useDogStore((state) => state);
  const { setSearchTerm } = useDogStore((state) => state);
  const { setModifiedDogList } = useDogStore((state) => state);
  const { setFilteredDogList } = useDogStore((state) => state);
  const { setSortedDogList } = useDogStore((state) => state);
  const { masterDogList } = useDogStore((state) => state);
  const { filteredDogList } = useDogStore((state) => state);
  const { sortedDogList } = useDogStore((state) => state);

  const filterDogs = () => {
    const testRowVal = (key, value) => {
      // test value of key to see if contains search term. maybe === or contains part.
      if (key !== 'image') {
        if (typeof value !== 'object') {
          const strToLowerCase = (str) =>
            str.replace(' ', '').replace(',', '').toLowerCase();
          return strToLowerCase(value).includes(strToLowerCase(searchValue));
        }
        // else for height and weight e.g. object
        for (let key in value) {
          return value[key].toLowerCase().includes(searchValue.toLowerCase());
        }
      }
    };
    // can reset searchon submit maybe reset every time
    // maybe if always sort on master list, then filter based on sorted list.
    // if user searches, filter will take in sorted list and update the filtered list.
    //

    // user searches, then filteredList is update
    // user sorts, filtered list is sorted and set to new filterlist
    // user removes a search character and searches, filter fnx.
    // takes the current sortedlist, which is everything, and applies new filter, setting filter list
    // case: user filters, then sorts, then removes one filter character and searches

    // user sorts, then filters, should remain sorted
    /*If user had filtered, then removes all search value and presses search
    i.e. same as resetting searchValue */
    if (!searchValue && modifiedDogList.length > 0) return masterDogList;

    // create new filteredDogs Set
    const filteredDogs = new Set();
    // iterate over all dogs
    // console.log('modifiedDogList in search ==', modifiedDogList);
    for (const currentDog of sortedDogList) {
      for (const { accessor, filterable } of columns) {
        // only filter over string values, i.e. filterable columns
        if (filterable) {
          const value = currentDog[accessor];
          // test if cell value contains the current searchValue
          if (value && testRowVal(accessor, value)) {
            // add dog object to fiteredDogsSet if passes test
            const found = sortedDogList.find((dog) => dog.id === currentDog.id);
            // check if filteredDogs set already contains the dog, only add if false
            if (found && !filteredDogs.has(found)) {
              filteredDogs.add(found);
            }
          }
        }
      }
    }
    return Array.from(filteredDogs);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log('filteredDogs after search ==', filterDogs());
    setSearchTerm(searchValue);
    setFilteredDogList(filterDogs());
  };

  const onReset = () => () => {
    setSearchValue('');
    setSearchTerm('');
    setFilteredDogList(masterDogList);
    // make separate set fnx for reset sortedDogList
    setSortedDogList([]);
  };

  return (
    <SearchWrapper>
      <form onSubmit={submitForm}>
        <StyledSearchBar
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <StyledBtn type="submit">Search</StyledBtn>
        <StyledBtn onClick={onReset()}>Reset</StyledBtn>
      </form>
    </SearchWrapper>
  );
}
