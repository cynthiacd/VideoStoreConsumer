import Backbone from 'backbone';

import Movie from '/models/movie';

var MovieList = Backbone.Collection.extend({
  model: Movie,
  url: 'http://localhost:3000/movies',
  searchUrl: 'http://localhost:3000/movies?query='
});

export default MovieList;
