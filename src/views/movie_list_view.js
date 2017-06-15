import Backbone from 'backbone';
import MovieView from './movie_view';
import Move from '../models/movie';

var MovieListView = Backbone.View.extend({

  initialize: function(params) {
    this.template = params.templateCard;

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
  },

  addToLib: function(movieView){
    // console.log("made it to add to lib function");
    var title = movieView.model.get("title")
    var inventory = this.$('#inventory').val();
    movieView.model.set('inventory', inventory);
    this.model.create(movieView.model, {
      error: function(reponse) { alert("Error - Movie was not added to library") },
      success: function(response) { alert(title + ': was added successfully!' + "\n" + 'Inventory: ' + inventory) }
    });
  }

});

export default MovieListView;
