import Backbone from 'backbone';

var MovieView = Backbone.View.extend({
  tagName: 'li',
  className: 'row movieInfo',

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
    'click .btn-add-lib': 'addMovie',
    'click .btn-checkout': 'onCheckout'
  },

  addMovie: function(event) {
    var inventory = this.$('#inventory').val();
    this.model.set('inventory', inventory);
    var title = this.model.get('title');

    this.model.save({}, {
      error: function(model, response) { alert("Error - Movie was not added to library\n" + response.responseText ); },
      success: function(model, response) { alert(title + ': was added successfully!' + "\n" + 'Inventory: ' + inventory); }
    });
  }

});

export default MovieView;
