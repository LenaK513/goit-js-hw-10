export function fetchCountries(name) {
  return fetch(
    'https://restcountries.com/v2/all?fields=name,capital,currencies,population,flags,languages'
  ).then(response => response.json());
}
