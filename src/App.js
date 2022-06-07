import './App.css';
import List from './components/List';
import Details from './components/Details';
import Search from './components/Search';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';


function App() {

  const [itemId, setItemId] = useState(null)

  return (
    <div className="App">
      <h1>Hansa teszt feladat</h1>
      

      <Routes>
        <Route
          path={'/'}
          element={<List setItemId={ setItemId }/>}
        />

        <Route
          path={`/vasarlasi_tetel/:${itemId}`}
          element={<Details itemId={itemId} />}
        />

        <Route
          path={'/kereses'}
          element={<Search setItemId={ setItemId }/>}
        />
      </Routes>
    </div>
  );
}

export default App;
