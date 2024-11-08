const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('searchBtn');
const moviesSection = document.getElementById('movies-section');
const iconBefore = document.getElementById('icon');
const errorMessage = document.getElementById('error-message');
let movies = [];
btnSearch.disabled = true;

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.trim();
    btnSearch.disabled = searchValue === '';
    btnSearch.style.cursor = searchValue === '' ? 'not-allowed' : 'pointer';
})


// This button is calling api and searching for movies
btnSearch.addEventListener('click', () => {
    iconBefore.classList.add('hidden');
    removeMovies()
    handleRequest(searchInput.value);
})

// This function is removing the movies from the last search result
function removeMovies () { 
    moviesSection.innerHTML = "" 
}

// This function is hadling the response from the api
async function handleRequest(search) {
    searchInput.value = ''
    const res = await fetch(`http://www.omdbapi.com/?s=${search}&i=tt3896198&apikey=433b12bb`)
    const data = await res.json()
    movies = data.Search
    try {        
        errorMessage.classList.add('hidden');  
        
        movies.forEach((movie) => {
            moviesSection.innerHTML += `
            <div class="movie">
                    <img src="${movie.Poster}" alt="movie poster" />
                    <div class="movie-details">
                        <h3>${movie.Title}</h3>
                        <div class="movie-further-details">
                            <span>${movie.Year}</span>
                            <span>${movie.Type}</span>
                            <span class="watchlist"><i class="ri-add-circle-fill"></i>Watchlist</span>
                        </div>
                        <p>The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.</p>
                    </div>
                </div>
            `
        });
    } catch (error) {
        if (error.message = TypeError) {
            errorMessage.classList.remove('hidden');
        }
    }
}
