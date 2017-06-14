import Backbone from 'backbone';
import MovieView from './movie_view';
import Move from '../models/movie';

var MovieListView = Backbone.View.extend({

  initialize: function(params) {
    this.template = params.templateCard;

    this.listenTo(this.model, "update", this.render);
  },

  render: function(){
    console.log("rendering the Movie List View");

    this.$('#movie-list').empty();

    var that = this;

    this.model.each( function(movie) {
      var movieView = new MovieView({
        model: movie,
        template: that.template
        // tagName: 'li'
      });

      that.$('#movie-list').append( movieView.render().$el );
    });

    return this;
  }
});

export default MovieListView;
