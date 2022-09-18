import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onTextInput, DEBOUNCE_DELAY));

function onTextInput(e) {
  let countryInput = e.target.value.toLowerCase().trim();

  fetchCountries(countryInput).then(onFilterSearch).catch(onCreateCountryError);

  // console.log(fetchCountries(countryInput));
}

function onFilterSearch(countries) {
  // let countrySearchList = [];
  countriesList.innerHTML = '';
  countryInfo.innerHTML = '';
  // countrySearchList = countries.filter(country =>
  //   country.name.toLowerCase().includes(countryInput)
  // );
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please, enter a more specific name.'
    );
    return countries;
  } else if (countries.length >= 2 && countries.length < 10) {
    countriesList.innerHTML = '';
    countriesList.innerHTML = countries
      .map(
        c =>
          `<li>
        <span>
          <img src=${c.flags.svg} width="70">
          ${c.name}
        </span>
      </li>
      `
      )
      .join('');
    // return countries;
  } else if (countries.length == 1) {
    countryInfo.innerHTML = '';
    countryInfo.innerHTML = `
      <div>
      <span>
          <img src=${countries[0].flags.svg} width="70">
          ${countries[0].name}
        </span>
        <br />
        <span><b>Capiatal: </b>: ${countries[0].capital}</span>
        <br>
        <span><b>Population: </b>: ${countries[0].population}</span>
        <br>
        <span><b>Languages: </b>: ${countries[0].languages
          .map(l => l.name)
          .join(', ')}</span>
      </div>
      `;
    // return countries;
  }
  return countries;
}

// function onCreateCountryItem(countries) {
//   // let countriesList = [];
//   countriesList.innerHTML = '';
//   if (countries.length >= 2 && countries.length < 10) {
//     countriesList.innerHTML = countries
//       .map(
//         c =>
//           `
//       <li>
//         <span>
//           <img src=${c.flags.svg} width="70">
//           ${c.name}
//         </span>
//       </li>
//       `
//       )
//       .join('');
//   }
// }

// function onCreateCountryInfo(countries) {
//   countryInfo.innerHTML = '';
//   if (countries.length == 1) {
//     return (countryInfo.innerHTML = `
//       <div>
//         <span><b>Capiatal: </b>: ${countries[0].capital}</span>
//         <br>
//         <span><b>Population: </b>: ${countries[0].population}</span>
//         <br>
//         <span><b>Languages: </b>: ${countries[0].languages
//           .map(l => l.name)
//           .join(', ')}</span>
//       </div>
//       `);
//   }
// }

function onCreateCountryError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
