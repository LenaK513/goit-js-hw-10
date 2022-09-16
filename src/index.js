import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
let countriesArr = [];
input.addEventListener('input', debounce(onTextInput, DEBOUNCE_DELAY));
window.onload = onDocumentLoaded;
function onDocumentLoaded() {
  countriesArr = onPrepareCountryNamesArray();
}

function onPrepareCountryNamesArray() {
  var localCountriesArr = [];

  fetchCountries()
    .then(jsonArr => jsonArr.forEach(c => localCountriesArr.push(c)))
    .catch(error => console.log(error));

  return localCountriesArr;
}

console.log(countriesArr);

function onTextInput(e) {
  let countryInput = e.target.value.toLowerCase();

  let renderList = onFilterSearch(countryInput);

  onCreateCountryItem(renderList);
  onCreateCountryInfo(renderList);
}

function onFilterSearch(countrySearch) {
  let countrySearchList = [];
  countrySearchList = countriesArr.filter(country =>
    country.name.toLowerCase().includes(countrySearch)
  );
  if (countrySearchList.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please, enter a more specific name.'
    );
    return [];
  }
  if (!countrySearchList.length) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
  return countrySearchList;
}

function onCreateCountryItem(countries) {
  let countryItemList = [];
  countriesList.innerHTML = '';
  if (countries.length > 0) {
    countriesList.innerHTML = countries
      .map(
        c =>
          `
      <li>
        <span>
          <img src=${c.flags.svg} width="70">
          ${c.name}
        </span>
      </li>
      `
      )
      .join('');
  }
}
function onCreateCountryInfo(countries) {
  countryInfo.innerHTML = '';
  if (countries.length == 1) {
    countryInfo.innerHTML = `
      <div>
        <span><b>Capiatal: </b>: ${countries[0].capital}</span>
        <br>
        <span><b>Population: </b>: ${countries[0].population}</span>
        <br>
        <span><b>Languages: </b>: ${countries[0].languages
          .map(l => l.name)
          .join(', ')}</span>
      </div>
      `;
  }
}
