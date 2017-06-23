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
  $("#rentals").hide();
  $("#search-bar").hide();
  $("#rental-form").hide();
  $("#movie-list").show();

  console.log("clicked on the button");

  var movieList = new MovieList();
  movieList.fetch(
    { error: function(model, response) { alert("Server Error - Try Again Later") },
      success: function(model, response) { console.log( "API success - got movies" ) }
    }
  );

  var movieListView = new MovieListView({
    model: movieList,
    templateCard: _.template( $('#movie-card-template').html() ),
    el: 'main'
  });
};

var buildMovieListTMDb = function(event) {
  $("#rentals").hide();
  $("#rentals-form").hide();
  $("#movie-list").show();

  console.log("Getting movies from TMDb!");
  var searchText = $('#search').val();
  // console.log(searchText);
  var movieList = new MovieList();
  movieList.cumstomUrl(searchText);
  movieList.fetch(
    { error: function(model, response) { alert("Server Error - Try Again Later") },
      success: function(model, response) { console.log( "API success - got movies" ) }
    }
  );

  var movieListView = new MovieListView({
    model: movieList,
    templateCard: _.template( $('#movie-card-template').html() ),
    el: 'main'
  });
};

var showSearchBar = function(event) {
  // event.stopPropagation();
  $("#rentals").hide();
  $("#rental-form").hide();
  $("#search-bar").show();
};

var rentalMovie = function(event) {
  // event.stopPropagation();
  $("#search-bar").hide();
  $("#movie-list").hide();
  $("#rentals").hide();

  $("#rental-form").show();
  console.log("inside checkoutMovie");
};

var buildOverdueRentalsList = function(event) {
  $("#search-bar").hide();
  $("#rental-form").hide();
  $("#movie-list").hide();

  console.log("Getting overdue movies");

  var overdueRentals = new RentalList ();
  overdueRentals.overdueUrl();
  overdueRentals.fetch(
    { error: function(model, response) { alert("Server Error - Try Again Later") },
      success: function(model, response) { console.log( "API success - got overdue rental customers" ) }
    }
  );

  var rentalListView = new RentalListView({
    model: overdueRentals,
    templateInfo: _.template( $("#overdue-table").html() ),
    el: '#rentals'
  });
  $("#rentals").show();
};

var buildRentalsList = function(event) {
  $("#search-bar").hide();
  $("#rental-form").hide();
  $("#movie-list").hide();

  console.log("Getting all rentals");

  var rentals = new RentalList ();
  rentals.fetch(
    { error: function(model, response) { alert("Server Error - Try Again Later") },
      success: function(model, response) { console.log( "API success - got overdue rental customers" ) }
    }
  );

  var rentalListView = new RentalListView({
    model: rentals,
    templateInfo: _.template( $("#overdue-table").html() ),
    el: '#rentals'
  });
  $("#rentals").show();
};

$(document).ready(function() {
  $('#rental-list').click( buildMovieList );
  $('.btn-search').click( buildMovieListTMDb );
  $('#new-movies-list').click( showSearchBar);
  $('#rental-movie').click( rentalMovie );
  $('#rental-overdue').click( buildOverdueRentalsList );
  $('#rental-all').click( buildRentalsList)

  $("#rentals").hide();
  var rental = new Rental();
  var rentalView = new RentalView({
    model: rental,
    templateCard: _.template( $('#rental-form-template').html() ),
    el: 'main'
  });
});
