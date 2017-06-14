import Backbone from 'backbone';

var MovieView = Backbone.View.extend({
  // tagName: 'li',
  className: 'movieInfo',

  initialize: function(params) {
    this.template = params.template;

    // this.listenTo(this.model, "change", this.render);
    // this.listenTo(this.model, "update", this.render);
    // this.listenTo(this.model, "sync", this.render);

    this.render();
  },

  render: function() {
    var compiledTemplate = this.template( this.model.toJSON() );
    this.$el.html(compiledTemplate);

    // re-attach DOM event listners
    this.delegateEvents();

    return this;
  },

  events: {
    'click .btn-add-lib': 'addMovie'
  },

  addMovie: function(event) {
    console.log('clicked on add movie button');
    this.trigger('add', this);
  }

});

export default MovieView;
