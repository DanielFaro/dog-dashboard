import { create } from 'zustand';

export const useDogStore = create((set) => ({
  masterDogList: [],
  sortedDogList: [],
  filteredDogList: [],
  searchTerm: '',
  sortOrder: '',
  highlightedDogs: [''],
  setHighlightedDogs: (newHighlightedDogs) =>
    set(() => ({ highlightedDogs: newHighlightedDogs })),
  setSortOrder: (newSortOrder) => set(() => ({ sortOrder: newSortOrder })),
  resetSortOrder: () => set(() => ({ sortOrder: '' })),
  setSearchTerm: (newTerm) => set(() => ({ searchTerm: newTerm })),
  setMasterDogList: (fetchedDogList) => {
    return set(() => ({ masterDogList: fetchedDogList }));
  },
  setSortedDogList: (newSortedDogs) => {
    return set((state) => ({
      sortedDogList: newSortedDogs,
    }));
  },
  setFilteredDogList: (newFilteredDogs) => {
    return set((state) => ({
      filteredDogList: newFilteredDogs,
    }));
  },
}));
