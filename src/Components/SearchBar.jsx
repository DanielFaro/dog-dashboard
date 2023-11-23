import { useState } from 'react';
import { useDogStore } from '../DogStore';
import styled from 'styled-components';
import { columns } from './Table';

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  background-color: #0a192f;
  border: 1px solid white;
  color: white;
  font-family: 'monospace';
  margin: 0px 5px;
  padding: 5px;
  border-radius: 5px;

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
  border: 1px solid #e2e8f0;
  color: #e2e8f0;
  font-family: 'monospace';
  margin-right: 5px;
  padding: 5px;
  min-width: 120px;
  width: 20vw;
  border-radius: 5px;
`;

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const { setSearchTerm } = useDogStore((state) => state);
  const { setFilteredDogList } = useDogStore((state) => state);
  const { setSortedDogList } = useDogStore((state) => state);
  const { masterDogList } = useDogStore((state) => state);
  const { sortedDogList } = useDogStore((state) => state);
  const { resetSortOrder } = useDogStore((state) => state);
  const { setHighlightedDogs } = useDogStore((state) => state);

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

    if (!searchValue && sortedDogList.length > 0) return masterDogList;

    // create new filteredDogs Set
    const filteredDogs = new Set();
    // iterate over all dogs
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
    setSearchTerm(searchValue);
    setFilteredDogList(filterDogs());
  };

  const onReset = () => () => {
    setSearchValue('');
    setSearchTerm('');
    setFilteredDogList(masterDogList);
    setSortedDogList(masterDogList);
    resetSortOrder();
    setHighlightedDogs(['']);
  };

  return (
    <SearchWrapper>
      <form onSubmit={submitForm} name="searchForm">
        <StyledSearchBar
          type="text"
          placeholder="Labrado..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Btn type="submit">Filter</Btn>
        <Btn onClick={onReset()}>Reset</Btn>
      </form>
    </SearchWrapper>
  );
}
