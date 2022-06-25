const apiKey = 'api_key=379ec0dfe7a7de79851cd8c750391777';
const baseUrl = 'https://api.themoviedb.org/3/'
// const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const searchUrl = baseUrl + '/search/movie?' + apiKey + '&query=';
const imgUrl = 'https://image.tmdb.org/t/p/w500';

let movieId = localStorage.getItem('movieId');
// console.log(movieId);
const details = baseUrl + '/movie/' + movieId + '?' + apiKey;

const credits = baseUrl + '/movie/' + movieId + '/credits?' + apiKey;

const recommendMovie = baseUrl + '/movie/' + movieId + '/recommendations?' + apiKey;
const similarMovie = baseUrl + '/movie/' + movieId + '/similar?' + apiKey;

// const video = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;

const video = baseUrl + '/movie/' + movieId + '/videos?' + apiKey;

const movieContainer = document.querySelector(".movieContainer");
movieContainer.classList.add('loadMessage')
const loadMessage = document.querySelector('.loadMessage');
loadMessage.innerHTML = "Please wait your selected movie is loading....⏳"

const getDetails = async (url) => {
    try {
        const resp = await fetch(url)
        const data = await resp.json();
        console.log(data);
        // console.log(data.cast);
        showDetails(data)


    } catch (error) {
        movieContainer.innerHTML = "Sorry we have not any data available right now about this movie"
        console.log(error);
    }


}

getDetails(details);




function showDetails(movie) {
    movieContainer.innerHTML = '';
    movieContainer.classList.remove('loadMessage');
    const movieInner = document.createElement('div')
    movieInner.classList.add('movieInner');



    let htmlData = `      
            <div class="moviePoster">
                <img src="${imgUrl + movie.poster_path}" alt="">
            </div>
            <div class="movieContent">
                <div class="movieHead">
                <p class="movieTitle">${movie.title}</p>
                <p class="tagline">"${movie.tagline ? movie.tagline : 'Tagline'}"</p>
                    <div class="rateTime">
                        <p class="rating"><i class="fa-solid fa-star"></i>${Math.round(movie.vote_average*10)/10}</p>
                        <p class="releaseDate"><i class="fas fa-hourglass-half"></i>${Math.floor(movie.runtime / 60)}h${(movie.runtime % 60)}m</p>
                    </div>
                </div>
                <div class="movieGenres">
                  
                    <p class="genres">${movie.genres[0] ? movie.genres[0].name : ""}</p>
                    <p class="genres">${movie.genres[1] ? movie.genres[1].name : ""}</p>
                    <p class="genres" id="genresName">${movie.genres[2] ? movie.genres[2].name : ""}</p>
                    
                </div>
                <div class="movieOverview">
                    <h3>Overview</h3>
                    <p>${movie.overview}</p>
                </div>
                
                <div class="otherDetails">
                    <div class="release">
                        <h4>Status:</h4>
                        <p>${movie.status}</p>
                        
                        <h4>Release Date:</h4>
                        <p>${movie.release_date}</p>
                        <h4>Language:</h4>
                        <p>${movie.original_language}</p>
                    </div>
                    
                    <div class="budgetIncome release">
                        <h4>Budget($):</h4>
                        <p>${movie.budget ? movie.budget : "-"}</p>
                        
                        <h4>Revenue($):</h4>
                        <p>${movie.revenue ? movie.revenue : "-"}</p>
                    </div>
                    
                </div>
                
                
            </div>
        `

    movieInner.insertAdjacentHTML('afterbegin', htmlData);
    movieContainer.appendChild(movieInner);



}
// get movie videos details

const getVideo = async (url) => {
    const resp = await fetch(url)
    const data = await resp.json()
    console.log(data);
    // console.log(data.results);
    showVideo(data.results)
}
getVideo(video)


function showVideo(movie) {
    const movieVideo = document.querySelector(".movieVideo");
   
    const videoBox = document.createElement('div');
    videoBox.classList.add('videoBox');
    
    if(movie.length === 0){
        movieVideo.innerHTML = 'Sorry No data found 😔'
    }

    
    movie.filter(({type }) => type === "Trailer"||type === "Teaser").forEach(element => {

       

        let videoHtml = `
        <div class="videoBoxSlider">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${element.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
            </div>
        `


        videoBox.insertAdjacentHTML('afterbegin', videoHtml);

        movieVideo.appendChild(videoBox);
    
    })

    
    



 // video slider 
    
    let flag = 0;

    
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    prev.addEventListener('click', ()=>{
        console.log('prev');
        flag = flag -1;
        videoSlider(flag)
    });

    next.addEventListener('click',()=>{
        console.log('next');
        flag = flag +1;
        videoSlider(flag) 
    });

    videoSlider(flag);

    function videoSlider(num) {
        let videoBoxSlider = document.querySelectorAll('.videoBoxSlider');
        // console.log(videoBoxSlider);


        if (num == videoBoxSlider.length) {
            flag = 0;
            num = 0;
        }
        if (num < 0) {
            flag = videoBoxSlider.length - 1;
            num = videoBoxSlider.length - 1;

        }

        for (let y of videoBoxSlider) {
            y.style.display = 'none';

        }
        // console.log(num);
        videoBoxSlider[num].style.display = 'flex';

    }
}




//  gettings details of movie cast

const getCast = async (url) => {
    const resp = await fetch(url)
    const data = await resp.json();
    // console.log(data);
    // console.log(data.cast);
    castDetails(data.cast)
    crewDetails(data.crew)
    // console.log(data.crew.filter(({ job }) => job === 'Director'))
    // console.log(data.crew.filter(({ job }) => job === 'Writer'))


}

getCast(credits)


function castDetails(movie) {

    const castDetail = document.querySelector('.castDetail');
    castDetail.innerHTML = ""
    movie.slice(0, 18).forEach(element => {


        const castBox = document.createElement('div');
        castBox.classList.add('castBox');

        let castBoxHtml = `
            <img class="${element.profile_path ? '' : 'imgNot'}" src="${element.profile_path ? imgUrl + element.profile_path : ''}" alt="${element.profile_path ? 'cast image' : 'Image not found'}">
            <h5>${element.original_name}</h5>
            <p>${element.character}</p>   
            `
        castBox.insertAdjacentHTML("afterbegin", castBoxHtml);
        castDetail.appendChild(castBox)



    });

    // if cast details not found
    if (movie.length === 0) {
        console.log('No data');
        castDetail.innerHTML = 'No details found'
    }


}

function crewDetails(movie) {
    const crewDetail = document.querySelector(".crewDetail");
    crewDetail.innerHTML = "";
    movie.filter(({ job }) => job === 'Director' || job === 'Writer').forEach(element => {
        const crewBox = document.createElement('div');
        crewBox.classList.add('crewBox');
        crewBox.classList.add('castBox');

        let crewHtml = `
        <img class="${element.profile_path ? '' : 'imgNot'}" src="${element.profile_path ? imgUrl + element.profile_path : ''}" alt="${element.profile_path ? 'cast image' : 'Image not found'}">
        <h5>${element.original_name}</h5>
        <p>${element.job}</p>   
        `
        crewBox.insertAdjacentHTML("afterbegin", crewHtml);
        crewDetail.appendChild(crewBox);

    });

    // if crew details not found
    if (movie.length === 0) {
        console.log('No data');
        crewDetail.innerHTML = 'No details found'
    }
}



// for getting recommendations movies

const getRecom = async (url) => {
    const resp = await fetch(url)
    const data = await resp.json()
    // console.log(data);
    // console.log(data.results);
    showRecomm(data.results)
}

getRecom(recommendMovie)


// show recommendations 
function showRecomm(movie) {
    const recommend = document.querySelector('.recommend');
    recommend.innerHTML = "";
    movie.slice(0, 12).forEach(element => {

        const recommendBox = document.createElement('div');
        recommendBox.classList.add('recommendBox')
        recommendBox.classList.add('box')

        let recommHtml = `
        <div class="image" >
            <img src='${imgUrl + element.poster_path}' alt="poster image">
        </div>
        <div class="movieDetails">
            <h3 class="title">${element.title}</h3>
            <span class="votes"><i class="fa-solid fa-star"></i>${Math.round(element.vote_average * 10) / 10}</span>
        </div>
        
        `
        recommendBox.insertAdjacentHTML('afterbegin', recommHtml);
        recommend.appendChild(recommendBox);



        // get recommended movies details after click 
        recommendBox.addEventListener('click', () => {
            const navBar = document.querySelector('.navBar');
            navBar.scrollIntoView({ behavior: "smooth" });
            movieId = `${element.id}`
            console.log(movieId);
            const details = baseUrl + '/movie/' + movieId + '?' + apiKey;
            const credits = baseUrl + '/movie/' + movieId + '/credits?' + apiKey;
            const recommendMovie = baseUrl + '/movie/' + movieId + '/recommendations?' + apiKey;
            const video = baseUrl + '/movie/' + movieId + '/videos?' + apiKey;
            const videoBox = document.querySelector('.videoBox')
            videoBox.innerHTML = ""
            getDetails(details)
            getVideo(video)
            getCast(credits)
            getRecom(recommendMovie)

        })

    });


    // if no recommendation found
    if (movie.length === 0) {
        // console.log('no data');
        recommend.innerHTML = "No data found"
    }
}


// searching function
const searchIcon = document.querySelector('.searchIcon');
searchIcon.addEventListener('click', ()=>{
    location.href = 'index.html'
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