const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
// **********************************************************
  // !! new built in "fetch" It self returns what is call promiss!!
    // const prom = fetch(endpoint);
    // console.log(prom); return:
          // Promise
          // __proto__:Promise
          // [[PromiseStatus]]:"resolved"
          // [[PromiseValue]]:Response
// **********************************************************
fetch(endpoint)
  .then(blob => blob.json())
  // get data for all cities in the array
  // "..." -> spread into this push method
  .then(data => cities.push(...data))

function findMatches(wordToMatch, cities){
  return cities.filter(place =>{
    // need to figureout if the cityor state matches what was searched

    // Regular expression: "g" is global, "i" is insencitive
    const reg = RegExp(wordToMatch,'gi');
    // if match city or state name then show
    return place.city.match(reg) || place.state.match(reg);
  });
}
// in the population add commas so ease to see
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
  // console.log(this.value);
  // show all matchArray
  const matchArray = findMatches(this.value, cities);
    // console.log(matchArray);
  const html = matchArray.map(place => {
    // make all input word makes highlight on the list
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex,`<span class="h1">${this.value}</span>`);
    const stateName = place.state.replace(regex,`<span class="h1">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  // map is going to returns array so makes string
  }).join('');
  // map over this array
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// when change it, call function findmatches
searchInput.addEventListener('change',displayMatches);
// when type into the search box everytime tells me
// if type in "new" it shows "n" "ne" "new"
searchInput.addEventListener('keyup',displayMatches);
