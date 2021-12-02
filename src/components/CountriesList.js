import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CountriesList() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get('https://restcountries.com/v3.1/all');
      let allCountries = [];
      response.data.map((elem) => {
        let country = {
          name: elem.name.common,
          cca3: elem.cca3,
          flag: elem.flags.svg,
        };
        return allCountries.push(country);
      });

      allCountries.sort((a, b) => {
        let keyA = a.name;
        let keyB = b.name;

        if (keyA > keyB) {
          return 1;
        } else if (keyA < keyB) {
          return -1;
        } else {
          return 0;
        }
      });
      setCountries(allCountries);
    }

    fetchData();
  }, []);

  if (!countries) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="list-group">
      {countries.map((elem) => {
        return (
          <li className="list-group-item" key={elem.cca3}>
            <img src={elem.flag} alt="" className="listFlag"></img>
            <br />
            <Link to={`/${elem.cca3}`}>{elem.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CountriesList;
