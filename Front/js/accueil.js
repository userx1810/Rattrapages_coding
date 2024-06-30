const API_KEY = "e71f42ea1955f2d75f591e7ee3404308";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const API_URL = `${BASE_URL}movie/popular?api_key=${API_KEY}`;
const TOP_RATED = `${BASE_URL}movie/top_rated?api_key=${API_KEY}`;
const searchUrl = BASE_URL + "/search/movie?" + API_KEY;

import Swiper from "/swiper.js";

// import styles bundle
const swiper = new Swiper(".swiper-container", {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

const genres = {
	genres: [
		{
			id: 28,
			name: "Action",
		},
		{
			id: 12,
			name: "Adventure",
		},
		{
			id: 16,
			name: "Animation",
		},
		{
			id: 35,
			name: "Comedy",
		},
		{
			id: 80,
			name: "Crime",
		},
		{
			id: 99,
			name: "Documentary",
		},
		{
			id: 18,
			name: "Drama",
		},
		{
			id: 10751,
			name: "Family",
		},
		{
			id: 14,
			name: "Fantasy",
		},
		{
			id: 36,
			name: "History",
		},
		{
			id: 27,
			name: "Horror",
		},
		{
			id: 10402,
			name: "Music",
		},
		{
			id: 9648,
			name: "Mystery",
		},
		{
			id: 10749,
			name: "Romance",
		},
		{
			id: 878,
			name: "Science Fiction",
		},
		{
			id: 10770,
			name: "TV Movie",
		},
		{
			id: 53,
			name: "Thriller",
		},
		{
			id: 10752,
			name: "War",
		},
		{
			id: 37,
			name: "Western",
		},
	],
};
const filmscontainer = document.getElementById("filmscontainer");
const form = document.getElementById("form");
const search = document.getElementById("search");
const actionbutton = document.getElementById("actionbutton");
const adventurebutton = document.getElementById("adventurebutton");
actionbutton.addEventListener("click", () => {
	getFilmsOfGenre(28);
});
adventurebutton.addEventListener("click", () => {
	getFilmsOfGenre(12);
});

function getFilm(url) {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			displayFilm(data.results);
			console.log(data.results);
		})
		.catch((error) => {
			console.error("Error fetching films:", error);
		});
}

function getFilmsOfGenre(genreId) {
	const genreUrl = `${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
	getFilm(genreUrl);
}

function getFilmSwiper(url) {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			displaySwiper(data.results);
			console.log(data.results);
		})
		.catch((error) => {
			console.error("Error fetching films:", error);
		});
}

function displaySwiper(films) {
	const swiper = document.querySelector(".swiper-wrapper");
	swiper.innerHTML = ""; // Clear previous content

	films.forEach((film) => {
		const { title, poster_path, overview, vote_average } = film;

		const swiperSlide = document.createElement("div");
		swiperSlide.classList.add("swiper-slide");

		swiperSlide.innerHTML = `
      <img src="${IMG_URL}${poster_path}" alt="${title}" />
      <div class="swiper-slide-info">
        <h3>${title}</h3>
        <span class="note">${vote_average}</span>
      </div>
    `;

		swiper.appendChild(swiperSlide);
	});
}

function displayFilm(films) {
	const filmscontainer = document.querySelector("#filmscontainer");
	filmscontainer.innerHTML = ""; // Clear previous content

	films.forEach((film) => {
		const { title, poster_path, overview, vote_average } = film;

		const filmCard = document.createElement("div");
		filmCard.classList.add("film");

		filmCard.innerHTML = `
      <img src="${IMG_URL}${poster_path}" alt="${title}" />

      <div class="film-info">
        <h3>${title}</h3>
        <span class="note">${vote_average}</span>
      </div>

      <div class="synopsis">
        <h4>Synopsis</h4>
        ${overview}
      </div>
    `;

		filmscontainer.appendChild(filmCard);
	});
}

getFilm(API_URL);
getFilmSwiper(TOP_RATED);
/*
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const searchTerm = search.value;

	if (searchTerm) {
		getFilm(searchUrl + `&query` + searchTerm);
	} else {
		getFilm(API_URL);
	}
});
*/
