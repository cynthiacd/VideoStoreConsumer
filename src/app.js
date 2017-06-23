// /src/app.js

// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';

import MovieList from './collections/movie_list';
import Movie from './models/movie';
import MovieListView from './views/movie_list_view';
import MovieView from './views/movie_view';
import Rental from './models/rental';
import RentalList from './collections/rental_list';
import RentalView from './views/rental_view';
import RentalListView from './views/rental_list_view';

var buildMovieList = function(event){
  hideEverything();
  console.log("Getting the Library Movies");
  var movieList = new MovieList();
  getMovies(movieList);
};

var buildMovieListTMDb = function(event) {
  hideEverything();
  console.log("Getting movies from TMDb!");
  var searchText = $('#search').val();
  var movieList = new MovieList();
  movieList.cumstomUrl(searchText);
  getMovies(movieList);
};

var getMovies = function(movieList) {
  movieList.fetch(
    { error: function(model, response) { alert("Server Error - Try Again Later") },
      success: function(model, response) { console.log( "API success - got movies" ) }
    }
  );

  var movieListView = new MovieListView({
    model: movieList,
    templateForm: _.template( $('#movie-card-template').html() ),
    el: 'main'
  });

  $("#movie-list").show();
};

var showSearchBar = function(event) {
  hideEverything();
  $("#search-bar").show();
};

var showRentalForm = function(event) {
  hideEverything();

  var rental = new Rental;
  var rentalView = new RentalView({
    templateInfo: _.template( $('#rental-form-template').html() ),
    tagName: "div",
    model: rental,
  });

  $("#rental-form").empty();
  $('#rental-form').html( rentalView.$el );
  $("#rental-form").show();
};

var buildOverdueRentalsList = function(event) {
  hideEverything();
  console.log("Getting overdue movies");
  var overdueRentals = new RentalList ();
  overdueRentals.overdueUrl();
  getRentals(overdueRentals);
};

var buildRentalsList = function(event) {
  hideEverything();
  console.log("Getting all outstanding rentals");
  var rentals = new RentalList ();
  getRentals(rentals);
};

var getRentals = function(rentals) {
  rentals.fetch(
    { error: function(model, response) { alert("Server Error - Try Again Later") },
      success: function(model, response) { console.log( "API success - got overdue rentals" ) }
    }
  );

  var rentalListView = new RentalListView({
    model: rentals,
    templateInfo: _.template( $("#overdue-table").html() ),
    el: '#rentals'
  });

  $("#rentals").show();
};

var hideEverything = function () {
  $("#rentals").hide();
  $("#search-bar").hide();
  $("#rental-form").hide();
  $("#movie-list").hide();
};

$(document).ready(function() {
  $('#rental-list').click( buildMovieList );
  $('.btn-search').click( buildMovieListTMDb );
  $('#new-movies-list').click( showSearchBar);
  $('#rental-movie').click( showRentalForm );
  $('#rental-overdue').click( buildOverdueRentalsList );
  $('#rental-all').click( buildRentalsList)
});
