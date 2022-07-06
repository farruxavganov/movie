const movies = document.querySelector(".movies");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const pagesInner = document.querySelector(".pages__inner");
const pagesLists = document.querySelector(".pages__lists");
const pagination = document.querySelector(".pages");

const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

let totolPages = 99;

window.onload = function () {
	getMovies(API_URL);
}

// prev.addEventListener("click", prevBtn);
// next.addEventListener("click", nextBtn);

async function getMovies(url, page = 1) {
	let req = await fetch(url + page);
	let res = await req.json();
	console.log(totolPages)
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
paginationControl(totolPages, 1);
function paginationControl(totolPages, page){
	
	getMovies(API_URL, page)
	paginationCon = true;
	let beforePage = page - 1;
	let afterPage = page + 1;
	let dataTrim = '';
	let active = '';

	if(totolPages == undefined || totolPages === null || totolPages === 0) {
		return;
	}

	if(page === 1){
		afterPage = afterPage + 2;
	}else if (page === 2) {
		afterPage = afterPage + 1;
	}

	if(page === totolPages && totolPages > 2) {
		beforePage = beforePage - 2;
	}else if(page === totolPages - 1 && totolPages > 2) {
		beforePage = beforePage - 1;
	}

	if(page > 1) {
		dataTrim += `<li class="pages__list prev">
                        <button type="button" class="pages__btn prev" onclick='paginationControl(totolPages, ${page - 1})'>
                        Prev
                        </button>
                    </li>`;
        if(page > 2 && totolPages > 4) {
        	dataTrim += `
        			<li class="pages__list">
                        <button type="button" class="pages__btn" onclick='paginationControl(totolPages, ${1})'>
                        1
                        </button>
                    </li>`;
        }
        if(page > 3) {
        	dataTrim += `<li class="pages__list dots">
                        	<button type="button" class="pages__btn">
                        	...
                        	</button>
                    	</li> `;
        }
	}

	for (let pagesPath = beforePage; pagesPath <= afterPage; pagesPath++){

		if(pagesPath > totolPages) {
			continue;
		}
		if(pagesPath === 0) {
			pagesPath = pagesPath + 1;
		}
		if(page === pagesPath) {
			active = "active";
		}else {
			active = "";
		}
		dataTrim += `<li class="pages__list">
                        <button type="button" class="pages__btn ${active}" onclick='paginationControl(totolPages, ${pagesPath})'>
                        ${pagesPath}
                        </button>
                    </li>`;
	}

	if(page < totolPages - 1 && totolPages > 4) {

		if(page < totolPages - 2) {
			dataTrim += `<li class="pages__list dots">
                        	<button type="button" class="pages__btn">
                        	...
                        	</button>
                    	</li>`;
		}
		dataTrim += `<li class="pages__list">
                        <button type="button" class="pages__btn" onclick='paginationControl(totolPages, ${totolPages})'>
                        ${totolPages}
                        </button>
                    </li>`
	}
	if(page < totolPages) {
		dataTrim += `<li class="pages__list next">
                        <button type="button" class="pages__btn next" onclick='paginationControl(totolPages, ${page + 1})'>
                        Next
                        </button>
                    </li>`;
	}

	pagination.innerHTML = dataTrim;
}