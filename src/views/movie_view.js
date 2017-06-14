import Backbone from 'backbone';

var MovieView = Backbone.View.extend({
  initialize: function(params) {
    this.movieTemplate = params.template;
    console.log("movieView initializing!!");
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
  },

  render: function(){
    var compiledTemplate = this.movieTemplate(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },


});

export default MovieView;
