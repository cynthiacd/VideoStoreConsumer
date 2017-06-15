// /src/app.js

// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';

import MovieList from './collections/movie_list';
import MovieListView from './views/movie_list_view';


var buildMovieList = function(event){
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

var buildMovieListTMDb = function(event){
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
}

$(document).ready(function() {

  $('#rental-list').click(buildMovieList);
  $('#btn-search').click(buildMovieListTMDb);
});
