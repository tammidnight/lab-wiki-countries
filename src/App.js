import { Routes, Route } from 'react-router';
import './App.css';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CountriesList />
        <Routes>
          <Route path=":cca3" element={<CountryDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
