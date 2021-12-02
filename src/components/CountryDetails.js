import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CountryDetails() {
  const { cca3 } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${cca3}`
      );
      const { name, flags, capital, area, borders } = response.data[0];
      let country = {
        cca3,
        name: name.common,
        flag: flags.svg,
        capital: capital[0],
        area,
        borders,
      };
      setDetail(country);
    }

    fetchData();
  }, [cca3]);

  if (!detail) {
    return <p>Loading...</p>;
  }
  console.log(detail.name);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={detail.flag} alt="" className="detailFlag"></img>
      <h1>{detail.name}</h1>
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item">
          <strong>Capital</strong>
        </li>
        <li className="list-group-item">{detail.capital}</li>
      </ul>
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item">
          <strong>Area</strong>
        </li>
        <li className="list-group-item">{detail.area} km²</li>
      </ul>
      <ul className="list-group list-group-horizontal-sm">
        <li className="list-group-item">
          <strong>Borders</strong>
        </li>
        <li className="list-group-item">
          {detail.borders.map((elem) => {
            return (
              <Link to={`/${elem}`}>
                {elem}
                <br />
              </Link>
            );
          })}
        </li>
      </ul>
    </div>
  );
}

export default CountryDetails;
