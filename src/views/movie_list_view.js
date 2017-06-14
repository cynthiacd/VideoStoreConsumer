import Backbone from 'backbone';

import MovieView from './movie_view';

var MovieListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, "update", this.render);

  },

  render: function(){
    var self = this;
    this.$("#movie-list").hide();

    this.model.each(function(movie){
      const movieView = new MovieView({
        model: movie,
        template: self.template
      });
      self.$("#movie-list").append(movieView.render().$el);
      self.listenTo(movieView, "addMovie", self.addMovieHandler)

    });

    return this;
  },

  events: {
    'click #rental-list': 'showMovieList'

  },

  showMovieList: function(){
    this.$("#movie-list").show();
  }
});

export default MovieListView;
