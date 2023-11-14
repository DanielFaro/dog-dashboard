/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, lazy, Suspense } from 'react';
import { useDogStore } from './DogStore';
import styled from 'styled-components';
import Chart from './Components/Chart';
import SearchBar from './Components/SearchBar';

const Table = lazy(() => import('./Components/Table'));

const Dashboard = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr 1fr 10fr;
  overflow: hidden;
  place-content: center;
  text-align: center;
  width: 100%;
  height: 100vh;
  background-color: #0a192f;
  overflow: hidden;
`;

const StyledHeader = styled.header`
  h2,
  h4 {
    margin: 5px 0px;
    color: #e2e8f0;
  }
`;
const TableSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const { setMasterDogList } = useDogStore((state) => state);
  const { setFilteredDogList } = useDogStore((state) => state);
  const { setSortedDogList } = useDogStore((state) => state);
  const { filteredDogList } = useDogStore((state) => state);

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

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://api.thedogapi.com/v1/breeds`, {
          headers: {
            'x-api-key':
              'live_qcYX5GdRVGM4pGFNLTxjzJgZct8k5F7WczZqTWZN0yyFEwKJikgQFTzMvnZiBomj',
            'Content-Type': 'application/json',

            accept: 'application/json',
          },
        });
        const data = await response.json();
        const dogList = convertDogs(data);
        setMasterDogList(dogList);
        setSortedDogList(dogList);
        setFilteredDogList(dogList);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  return (
    <Dashboard className="App">
      <StyledHeader>
        <h2>Dog Breed Finder</h2>
        <h4>Find your favorite dog breed!</h4>
      </StyledHeader>

      <Chart filteredDogList={filteredDogList} />

      <SearchBar />
      <Suspense fallback={'Loading...'}>
        <TableSection>
          <Table />
        </TableSection>
      </Suspense>
    </Dashboard>
  );
}

export default App;
