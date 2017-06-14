// /src/app.js

// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';

import MovieList from './collections/movie_list';
import MovieListView from './views/movie_list_view';
// import
// ready to go
var buildMovieList = function(event){
  console.log("clicked on the button");

  var movieList = new MovieList();
  movieList.fetch();

  var movieListView = new MovieListView({
    model: movieList,
    templateList: _.template( $('#movie-card-template').html() ),
    el: 'main'
  });
};



$(document).ready(function() {

  // $('section.main-content').append('<p>Hello World!</p>');
  $('#rental-list').click( function(event) {
    console.log("clicked on the button");

    var movieList = new MovieList();
    movieList.fetch();

    var movieListView = new MovieListView({
      model: movieList,
      templateCard: _.template( $('#movie-card-template').html() ),
      el: 'main'
    });

  });
});
