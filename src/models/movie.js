import Backbone from 'backbone';

var Movie = Backbone.Model.extend({
  defaults: {
    title: "string",
    overview: "string",
    img_url: "string",
    release_date: "string",
    external_id: "integer",
    inventory: "integer"
  },

  url: 'http://localhost:3000/movies',

  initialize: function(params) {
    console.log("Movie Initialized: " + this.get("title"));
  }
});

export default Movie;
