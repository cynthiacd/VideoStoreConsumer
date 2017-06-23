import Backbone from 'backbone';
import MovieView from './movie_view';
import Movie from '../models/movie';

var MovieListView = Backbone.View.extend({

  initialize: function(params) {
    // console.log(this.model);
    this.template = params.templateForm;

    this.movieViews = [];

    this.model.forEach(function(rawMovie) {
      this.addMovie(rawMovie);
    }.bind(this) );

    this.listenTo(this.model, "add", this.addMovie);
    this.listenTo(this.model, "update", this.render);
    // this.listenTo(this.model, "remove", this.removeMovie);
  },

  render: function(){
    console.log("rendering the Movie List View");

    this.$('#movie-list').empty();
    var that = this;

    this.movieViews.forEach(function(movieView){
      that.$('#movie-list').append(movieView.$el);
      that.listenTo( movieView, "addToLib", that.addToLib );
    });

    return this;
  },

  addMovie: function(rawMovie){
    var movieView = new MovieView({
      model: rawMovie,
      template: this.template
    });
    this.movieViews.push(movieView);
  }

});

export default MovieListView;
