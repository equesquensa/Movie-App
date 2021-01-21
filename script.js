const API_URL =   'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=efabbfe5c64558a8f3baa64df63c8b89&page='

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API =   'https://api.themoviedb.org/3/search/movie?api_key=efabbfe5c64558a8f3baa64df63c8b89&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const buttons = document.querySelectorAll('.btn')
const mybutton = document.getElementById("myBtn");

buttons.forEach((button,idx) => {

  button.addEventListener('click', () => highlightbuttons(idx))

})

function highlightbuttons(idx){

  const page = ((idx) + 1)

  if(page >= 2){
    getMovies(API_URL + page)

  } else{
    window.location.reload()
  }

  buttons.forEach((button, idx2) => {
    if(idx2 == idx){
      button.classList.add('full')
    } else{
      button.classList.remove('full')
    }
  })
}


getMovies(API_URL)

async function getMovies(url){

  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results)

}

function showMovies(movies){
  
  main.innerHTML= ''

  movies.forEach((movie) => {
    
    const { title, poster_path,vote_average,overview} = movie

    const movieEl = document.createElement('div')

    movieEl.classList.add('movie')

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                  ${overview}
            </div>
    `
    main.appendChild(movieEl)

  })
}

function getClassByRate(vote){
  if(vote >=8){
    return 'green'
  } else if(vote >=5){
    return 'orange'
  } else{
    return 'red'
  }
}


form.addEventListener('submit', (e) => {

  e.preventDefault()

  const searchTerm = search.value

  if(searchTerm && searchTerm !== ''){
    getMovies(SEARCH_API + searchTerm)

    search.value =''
  } else{
    window.location.reload()
  }

})


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 1500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}