const movies = document.querySelector(".movies");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const pages = document.querySelector(".pages");
const pagesLists = document.querySelector(".pages__lists");

const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

window.onload = function () {
	getMovies(API_URL);
}

prev.addEventListener("click", prevBtn);
next.addEventListener("click", nextBtn);

async function getMovies(url) {
	let req = await fetch(url);
	let res = await req.json();

	createMovie(res.results);

}

function createMovie(movieArray) {
	let moviesData = movieArray.map(movie => {
		return (
			`<li class="movie" data-id=${movie.id}>
                <div class="card">
                    <div class="card__head">
                        <img src="${IMG_PATH + movie.poster_path}" class="card__img" alt="" />
                    </div>
                    <div class="card__body">
                         <h3 class="card__title">${movie.title}</h3>
                         <span class="card__ball">${movie.vote_average}</span>
                    </div>
                </div>
             </li>`
		);
	}).join("");

	movies.innerHTML = moviesData;
}


// btens control
let counter = 0;
function prevBtn() {
	let offsetLeft = pagesLists.offsetLeft;
	if(offsetLeft >= 55) {
		console.log(counter)
		return;
	}else {
		counter--;
		pagesLists.style.left = `-${counter * 41.5+41.5}px`;
		console.log(counter)
	}
}

function nextBtn() {
	let offsetRightPages = pages.getBoundingClientRect().right;
	let offsetRightPagesList = pagesLists.getBoundingClientRect().right;

	if(counter == -1) {
		counter = 0;
	}

	if(offsetRightPages > offsetRightPagesList){
		pagesLists.style.left = `-${counter * 41.5+41.5}px`;
		console.log(counter)
		return;
	}else {
		counter++;
		pagesLists.style.left = `-${counter * 41.5}px`;
		console.log(counter)
	}
}