export function fetchCountries(name) {
  const url =
    'https://restcountries.com/v2/all?fields=name.official,capital,currencies,population,flags,languages';
  return fetch(url).then(response => response.json());
}
