import './Table.css';
import { useState } from 'react';
import { useDogStore } from '../DogStore';

export const columns = [
  { label: 'Name', accessor: 'name', filterable: true },
  { label: 'Weight (lbs)', accessor: 'weight', filterable: false },
  { label: 'Height (in)', accessor: 'height', filterable: false },
  { label: 'Life Span (yrs)', accessor: 'life_span', filterable: false },
  { label: 'Breed Group', accessor: 'breed_group', filterable: true },
  { label: 'Bred For', accessor: 'bred_for', filterable: true },
  { label: 'Temperament', accessor: 'temperament', filterable: true },
  { label: 'Image', accessor: 'image', filterable: false },
];

export default function Table() {
  const { setModifiedDogList } = useDogStore((state) => state);
  const { setFilteredDogList } = useDogStore((state) => state);
  const { setSortedDogList } = useDogStore((state) => state);
  const { modifiedDogList } = useDogStore((state) => state);
  const { filteredDogList } = useDogStore((state) => state);
  const { sortedDogList } = useDogStore((state) => state);
  const { searchTerm } = useDogStore((state) => state);

  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (columnHeader) => {
    const sortOrder =
      columnHeader === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(columnHeader);
    setOrder(sortOrder);
    columnHeader !== 'image' && handleSorting(columnHeader, sortOrder);
  };

  // try adding useMemo
  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      let sorted = [...filteredDogList].sort((a, b) => {
        let firstTerm = a[sortField];
        let secondTerm = b[sortField];

        // Height and Weight have values of form e.g.{ imperial: 10, metric: 22 }
        if (sortField === 'height' || sortField === 'weight') {
          firstTerm = firstTerm.imperial;
          secondTerm = secondTerm.imperial;
        }

        if (firstTerm === undefined) return 1;
        if (secondTerm === undefined) return -1;
        if (firstTerm === undefined && secondTerm === undefined) return 0;
        /*  localeCompare (see below) allows us to compare language specific strings
            based on Intl.Collator object. Setting numeric to true allows numeric 
            collation such that e.g. "2" < "10"
        */
        return (
          firstTerm.toString().localeCompare(secondTerm, 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });

      // if user searched, then sorted
      if (searchTerm) {
        setFilteredDogList(sorted);
      } else {
        setSortedDogList(sorted);
      }

      //if user sorts first, i.e. no search term at first
      // need to add search term back to common state
      // setSortedDogList(sorted);
    }
  };

  let dogList = searchTerm ? filteredDogList : sortedDogList;
  const generateRows = () => {
    return dogList.map(
      ({
        name,
        weight,
        height,
        life_span,
        breed_group,
        bred_for,
        temperament,
        image,
      }) => (
        <>
          <div className="cell">{name}</div>
          <div className="cell">{weight.imperial}</div>
          <div className="cell">{height.imperial}</div>
          <div className="cell">{life_span}</div>
          <div className="cell">{breed_group}</div>
          <div className="bred">{bred_for}</div>
          <div className="temperament">{temperament}</div>
          <div className="cell">
            <img src={image.url} alt={name} />
          </div>
        </>
      )
    );
  };

  return (
    <section className="tableWrapper">
      <div className="table">
        {columns.map(({ label, accessor }) => (
          <div key={accessor} onClick={() => handleSortingChange(accessor)}>
            <div className="header">
              <div className="headerLabel">{label}</div>
              <div className="headerArrow">
                {accessor !== 'image' &&
                accessor === sortField &&
                order === 'desc'
                  ? '🔽'
                  : accessor !== 'image' &&
                    accessor === sortField &&
                    order === 'asc'
                  ? '🔼'
                  : ''}
              </div>
            </div>
          </div>
        ))}
        {generateRows()}
      </div>
    </section>
  );
}
