import { useEffect, useCallback } from 'react';
import Table from './Components/Table';
import { useDogStore } from './DogStore';
import styled from 'styled-components';
import Chart from './Components/Chart';
import SearchBar from './Components/SearchBar';

const Dashboard = styled.div`
  display: grid;
  grid-template-rows: 2fr 60px 5fr;
  overflow: hidden;
  place-content: center;
  width: 100%;
  height: 100vh;
  background-color: #0a192f;
  overflow: hidden;
`;
const TableSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const { setMasterDogList } = useDogStore((state) => state);
  const { setModifiedDogList } = useDogStore((state) => state);
  const { setFilteredDogList } = useDogStore((state) => state);
  const { setSortedDogList } = useDogStore((state) => state);
  const { modifiedDogList } = useDogStore((state) => state);
  const { filteredDogList } = useDogStore((state) => state);

  const fetchDogs = useCallback(async () => {
    const convertDogs = (dogs) => {
      // avg returns the average of the array as a string. e.g. for weight range
      const avg = (arr) => arr.reduce((a, b) => +a + +b, 0) / 2;
      const numberTest = /^[0-9]+(\.[0-9]+)?$/;
      const convertRange = (str) =>
        str.split(' ').filter((el) => el.match(numberTest));

      return dogs.map((dog, i) => ({
        ...dog,
        life_span: avg(convertRange(dog['life_span'])),
        height: {
          imperial: avg(convertRange(dog.height.imperial)),
          metric: avg(convertRange(dog.height.metric)),
        },
        weight: {
          imperial: avg(convertRange(dog.weight.imperial)),
          metric: avg(convertRange(dog.weight.metric)),
        },
      }));
    };

    const response = await fetch(`https://api.thedogapi.com/v1/breeds`, {
      headers: {
        'x-api-key':
          'live_qcYX5GdRVGM4pGFNLTxjzJgZct8k5F7WczZqTWZN0yyFEwKJikgQFTzMvnZiBomj',
        'Content-Type': 'application/json',

        accept: 'application/json',
      },
    });
    const data = await response.json();
    return convertDogs(data);
  }, []);

  useEffect(() => {
    (async () => {
      const dogs = await fetchDogs();
      setMasterDogList(dogs);
      setModifiedDogList(dogs);
      setSortedDogList(dogs);
      setFilteredDogList(dogs);
    })();
  }, [fetchDogs]);

  return (
    <Dashboard className="App">
      <Chart filteredDogList={filteredDogList} />
      <SearchBar />
      <TableSection>
        <Table />
      </TableSection>
    </Dashboard>
  );
}

export default App;
