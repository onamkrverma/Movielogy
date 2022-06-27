const apiKey = 'api_key=379ec0dfe7a7de79851cd8c750391777';
const baseUrl = 'https://api.themoviedb.org/3/';
const searchUrl = baseUrl + 'search/movie?'+ apiKey + '&query=';
const imgUrl = 'https://image.tmdb.org/t/p/w500';

const popularMovies = baseUrl + 'movie/popular?'+ apiKey + '&language=en-US&page=1';

const trendingMovies = baseUrl+ 'trending/movie/day?'+ apiKey;

const hindiMovie = baseUrl + 'discover/movie?'+ apiKey + '&with_origin_country=IN' ;
const topRatedMovies = baseUrl + 'movie/top_rated?'+ apiKey  ;

const form = document.querySelector('form');
const container = document.querySelector('.container');
const search = document.querySelector('#search');
const heading = document.querySelector('.heading');
const trending = document.querySelector('.trending');
const indianMovie = document.querySelector('.indian');

container.innerHTML = "Please wait movies are loading....⏳"

const getDetails = async (url) => {

    const resp = await fetch(url)
    const data = await resp.json();
    console.log(data);
    const getResult = data.results
    console.log(data.results);
    showDetails(getResult)

    // if search results not fond
    if (getResult.length == 0) {
        container.innerHTML = 'Sorry! no result found';
    }
}


function showDetails(movies) {
    container.innerHTML = "";


    movies.forEach(element => {
        if (element.vote_average === 0) {
            return
        } else if (element.poster_path === null) {
            return
        } else if (element.title == null) {
            element.title = element.name;
        }

        const box = document.createElement('div');
        box.classList.add('box');


        const htmlData = `
        
            <img src='${imgUrl + element.poster_path}' alt="Poster image">
        
        <div class="movieDetails">
            <h3 class="title">${element.title}</h3>
            <span class="votes"><i class="fa-solid fa-star"></i>${Math.round(element.vote_average*10)/10}</span>
        </div>`
        box.insertAdjacentHTML('afterbegin', htmlData);
        container.appendChild(box);


  

        box.addEventListener('click',()=>{
           if (detailBox.style.display ==='none') {
            detailBox.style.display = 'block';
           }else{
            detailBox.style.display = 'none';
           }

        });


      // Redirect to next page with movies id 
        box.addEventListener('click',()=>{
            const details = `${element.id}`
            console.log(details);
            localStorage.setItem('movieId',details);
            location.href = 'movieDetails.html'
        });



    });


};






heading.innerHTML = 'Popular Movies';

getDetails(popularMovies);

// searching function

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(search.value);
    let searchVal = search.value
    container.innerHTML = "Please wait.. Loading search resuts...⏳"
    if (searchVal) {
        heading.innerHTML = 'Search Result(s):'
        getDetails(searchUrl + searchVal);
        search.value = ""
    }


});


// go to trending  on clicking trending

trending.addEventListener('click', () => {
    heading.innerHTML = 'Trending Movies';
    getDetails(trendingMovies)

})
// go to indan movie section on clicking indian movie

indianMovie.addEventListener('click', () => {
    heading.innerHTML = 'Top indian Movies';
    getDetails(hindiMovie)

})

// go to top rated movie section on clicking top rated
const topRated = document.querySelector('.topRated')
topRated.addEventListener('click', () => {
    heading.innerHTML = 'Top Rated Movies';
    getDetails(topRatedMovies)

})






// scroll up button
const footer = document.querySelector('footer');
const navBar = document.querySelector('.navBar');

const scrollUp = document.createElement('div');
scrollUp.classList.add('scrollUp');
scrollUp.innerHTML = '<i class="fa-solid fa-arrow-up" id="scrollIcon" ></i>'

footer.appendChild(scrollUp);

scrollUp.addEventListener('click', () => {
    navBar.scrollIntoView({ behavior: "smooth" });
})

// scroll up icon only show when atleast 50% scrolled

scrollUp.classList.add('hidden')

window.onscroll = () => {
    if (scrollY >= 200) {
        scrollUp.classList.remove('hidden');
    } else {
        scrollUp.classList.add('hidden');
    }
}




// menuIcon 

const menuIcon = document.querySelector(".menuIcon");
const ulList = document.querySelector(".ulList");


menuIcon.addEventListener('click',()=>{
    menuIcon.classList.toggle('change');
    if (ulList.style.display === "flex") {
        ulList.style.display = "none"
        
    }else{
        ulList.style.display = "flex"
       
    }
})