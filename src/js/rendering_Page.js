const debounce = require('lodash.debounce');
import API from './fetchCountries';
import template from '../template/country-card.hbs';
import template_list from '../template/countries-list.hbs';
import { postError } from './pnotify';

const inputRef = document.querySelector('.form-control');
const cardContainer = document.querySelector('.js-country-container');
const DELAY = 1000;

inputRef.addEventListener('input', debounce(onSearch, DELAY));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = inputRef.value;
  console.log(searchQuery);

  API.fetchCountry(searchQuery).then(renderCountryPage).catch(onFetchError);
}

function onFetchError(error) {
  cardContainer.innerHTML = '';
  console.log('catch');
  return postError('Такой страны нет, туземец!');
}

function renderCountryPage(countries) {
  if (countries.length === 1) {
    const markup = template(countries[0]);
    cardContainer.innerHTML = '';
    cardContainer.insertAdjacentHTML('beforeend', markup);
  }
  if (countries.length > 1) {
    const markup = template_list(countries);
    cardContainer.innerHTML = '';
    cardContainer.insertAdjacentHTML('beforeend', markup);
    return;
  }
  if (countries.length > 10) {
    cardContainer.innerHTML = '';
    postError('Введено мало символов, уточните Ваш запрос');
    return;
  }
}
