import { create } from 'zustand';

export const useDogStore = create((set, get) => ({
  masterDogList: [],
  sortedDogList: [],
  filteredDogList: [],
  modifiedDogList: [],
  searchTerm: '',
  isSorted: false,
  setIsSorted: (isSorted) => set(() => ({ isSorted })),
  setSearchTerm: (newTerm) => set(() => ({ searchTerm: newTerm })),
  setMasterDogList: (fetchedDogList) => {
    return set(() => ({ masterDogList: fetchedDogList }));
  },
  setModifiedDogList: (newSortedDogs) => {
    return set((state) => ({
      modifiedDogList: newSortedDogs,
    }));
  },
  setSortedDogList: (newSortedDogs) => {
    console.log('setting sortedDogList');
    return set((state) => ({
      sortedDogList: newSortedDogs,
    }));
  },
  setFilteredDogList: (newFilteredDogs) => {
    console.log('setting filteredDogList');
    return set((state) => ({
      filteredDogList: newFilteredDogs,
    }));
  },
}));

// need case where user sorts by life=_span e.g., then filters,
// then changes filter and searches again, the second result should
// be sorted from master list that has been sorted by field and filtered.
// or just empty out search value after search, when they click reset, set
// searchterm to empty, if they enter something new and search, just setSearchTerm
// show a message saying results for searchValue
