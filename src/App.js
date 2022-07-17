import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setupDogList } from './dogSlice';

import DogSummary from './DogSummary';
import DogList from './DogList';

function App() {
  const isLoading = useSelector(state => state.isLoading);
  const dogList = useSelector(state => state.dogList);
  const dogSummary = useSelector(state => state.dogSummary);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setupDogList());
  }, [dispatch]);

  return isLoading ? <div>Loading...</div> : (
    <div className="app">
      <DogSummary summary={dogSummary} />
      <DogList list={dogList} />
    </div>
  );
}

export default App;
