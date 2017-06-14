// /src/app.js

// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';
import MovieList from 'collections/movie_list';
import MovieListView from 'views/movie_list_view';
// import
// ready to go


$(document).ready(function() {

  $('section.main-content').append('<p>Hello World!</p>');

});


$(document).ready(function() {
  var movieList = new MovieList();
  movieList.fetch();

  var movieListView = new MovieListView({
    el: $('main'),
    model: movieList,
    template: _.template($('#movie-card-template').html()),
  });

  movieListView.render();

});
