import './css/styles.css';

// import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;

// fetch(
//   'https://restcountries.com/v2/all?fields=name.official,capital,currencies,population,flags,languages'
// )
//   .then(response => response.json())
//   .then(console.log);
function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/all?fields=name,capital,currencies,population,flags,languages`
  )
    .then(response => response.json())
    .then(console.log);
}

const input = document.getElementById('search-box');
input.addEventListener('input', onSearchCountry);

function onSearchCountry(e) {
  const nameCountry = e.currentTarget.value;
  console.log(nameCountry);

  fetchCountries(name)
    .then(renderCountry)
    .catch(error => console.log(error));
}

function renderCountry(name) {
  const makeupCountry = name => {
    return `<div>
      <img src="${flags.svg}">${name.official}</img>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Language: ${language}</p>
    </div>`;
  };
}
