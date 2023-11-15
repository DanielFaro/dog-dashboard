import './Table.css';
import { useState, useRef } from 'react';
import { useDogStore } from '../DogStore';
import { ReactComponent as PawIcon } from './assets/PawIcon.svg';

export const columns = [
  { label: 'Name', accessor: 'name', filterable: true },
  { label: 'Weight (lbs)', accessor: 'weight', filterable: false },
  { label: 'Height (in)', accessor: 'height', filterable: false },
  { label: 'Life Span (yrs)', accessor: 'life_span', filterable: false },
  { label: 'Breed Group', accessor: 'breed_group', filterable: true },
  { label: 'Bred For', accessor: 'bred_for', filterable: true },
  { label: 'Image', accessor: 'image', filterable: false },
];

export default function Table() {
  const windowWidth = useRef(window.innerWidth);
  const { setFilteredDogList } = useDogStore((state) => state);
  const { setSortedDogList } = useDogStore((state) => state);
  const { filteredDogList } = useDogStore((state) => state);
  const { sortedDogList } = useDogStore((state) => state);
  const { searchTerm } = useDogStore((state) => state);
  const { sortOrder } = useDogStore((state) => state);
  const { setSortOrder } = useDogStore((state) => state);
  const [sortField, setSortField] = useState('');

  const handleSortingChange = (columnHeader) => {
    const newSortOrder =
      columnHeader === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(columnHeader);
    setSortOrder(newSortOrder);
    columnHeader !== 'image' && handleSorting(columnHeader, newSortOrder);
  };

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
    }
  };

  let dogList = searchTerm ? filteredDogList : sortedDogList;
  const generateRows = () => {
    return dogList.map(
      ({ name, weight, height, life_span, breed_group, bred_for, image }) => (
        <tr>
          <td className="name">{name}</td>
          <td>{weight.imperial}</td>
          <td>{height.imperial}</td>
          <td>{life_span}</td>
          <td>{breed_group}</td>
          <td>
            <div className="bred">
              <div className="ellipses">{bred_for}</div>
            </div>
          </td>
          {windowWidth.current > 480 ? (
            <td>
              <div className="tooltip">
                <PawIcon />
                <span className="tooltiptext">
                  <img src={image.url} alt={name} />
                </span>
              </div>
            </td>
          ) : (
            <td>
              <img src={image.url} alt={name} />
            </td>
          )}
        </tr>
      )
    );
  };

  return (
    <section className="tableWrapper">
      <table>
        <thead>
          <tr>
            {columns.map(({ label, accessor }) => (
              <th
                key={accessor}
                data-testid="headerWrapper"
                onClick={() => handleSortingChange(accessor)}
              >
                <div className="header">
                  <div className="headerLabel">{label}</div>
                  <div className="headerArrow">
                    {accessor !== 'image' &&
                    accessor === sortField &&
                    sortOrder === 'desc'
                      ? '🔽'
                      : accessor !== 'image' &&
                        accessor === sortField &&
                        sortOrder === 'asc'
                      ? '🔼'
                      : ''}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </table>
    </section>
  );
}
