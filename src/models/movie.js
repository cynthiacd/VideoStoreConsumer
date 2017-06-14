import Backbone from 'backbone';

var Movie = Backbone.Model.extend({
  defaults: {
  title: "movie title",
  overview: "Summary",
  release_date: "date",
  image_url: "",
  nventory: "0"
  },

  initialize: function(){
    console.log("working!");
  }


});

export default Movie;
