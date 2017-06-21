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

<<<<<<< HEAD
  // addMovie: function(event) {
  //   var inventory = this.$('#inventory').val();
  //   this.model.set('inventory', inventory);
  //   this.trigger('addToLib', this);
  // }
=======
  addMovie: function(event) {
    var inventory = this.$('#inventory').val();
    this.model.set('inventory', inventory);
    var title = this.model.get('title');

    this.model.save({}, {
      error: function(reponse) { alert("Error - Movie was not added to library"); },
      success: function(response) { alert(title + ': was added successfully!' + "\n" + 'Inventory: ' + inventory); }
    });

  }
>>>>>>> 7714592c9661126a4f880ed6c56ee3f5b9833cba







});

export default MovieView;
