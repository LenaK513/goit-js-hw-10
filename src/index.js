import './css/styles.css';

// import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countriesList = document.querySelector('.country-list');

input.addEventListener('input', onInputName);

function fetchCountries() {
  return fetch(
    `https://restcountries.com/v2/all?fields=name,capital,currencies,population,flags,languages`
  ).then(response => {
    return response.json();
  });
  // .then(console.log);
}

let nameCountry = '';

function onInputName(e) {
  nameCountry = e.currentTarget.value;
  console.log(nameCountry);

  // fetchCountries(nameCountry)
  //   .then(renderCountry)
  //   .catch(error => console.log(error));
}

// function renderCountry(countries) {
//   countries.filter(function (country) {
//     if (nameCountry === country.name) {
//       nameCountry += `<li >${country.name}</li>`;
//       countriesList.innerHTML = nameCountry;
//     }
//     // // console.log(country.name);
//     console.log(nameCountry);
//   });
// }

// .join('');

// name.forEach(country => {
//   nameCountry += `<li class="form-item">${name.official}</li>`;
//   return (countriesList.innerHTML = nameCountry);
//   //   console.log(nameCountry);
// });
// console.dir(name);
//   console.log(nameCountry);
