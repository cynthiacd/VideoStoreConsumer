import Backbone from 'backbone';
import Movie from '../models/movie';

var MovieList = Backbone.Collection.extend({
  model: Movie,
  url: 'http://localhost:3000/movies',

  cumstomUrl: function(searchText){
    this.url = this.url + "?query=" + searchText;
    // console.log(this.url);
    return this;
  }
});

export default MovieList;
