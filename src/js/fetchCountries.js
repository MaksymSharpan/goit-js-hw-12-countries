const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(countryName) {
  const url = `${BASE_URL}/name/${countryName}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Some error');
    }

    console.dir(response);
    return response.json();
  });
}
export default { fetchCountry };
