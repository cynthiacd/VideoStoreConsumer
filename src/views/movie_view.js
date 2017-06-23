import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import RentalView from './rental_view';
import Rental from '../models/rental';

var MovieView = Backbone.View.extend({
  tagName: 'li',
  className: 'row movie-info',

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
    'click .btn-rental': 'onCheckout'
  },

  addMovie: function(event) {
    var inventory = this.$('#inventory').val();
    this.model.set('inventory', inventory);
    var title = this.model.get('title');

    this.model.save({}, {
      error: function(model, response) { alert("Error - Movie was not added to library\n" + response.responseText ); },
      success: function(model, response) { alert(title + ': was added successfully!' + "\n" + 'Inventory: ' + inventory); }
    });
  },

  onCheckout: function(event) {
    console.log("want to checkout a movie");
    var rental = new Rental({
    });
    var rentalView = new RentalView ({
      model: rental,
      tagName: "div",
      templateCard: _.template( $('#rental-form-template').html() )
    });
    // console.log("hello");

    // you can't do this here in the movie view the scope is not the whole document...
    // $("movie-list").show();
    // $("#rental-form").empty();
    // $("#rental-form").append( rentalView.renderForm().$el );
    // $("#rental-form").show();

    Backbone.trigger( "checkout:movie", this.model.get("title") );
  }
});

export default MovieView;
