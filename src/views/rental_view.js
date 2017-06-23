import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Rental from '../models/rental';

var RentalView = Backbone.View.extend({
  tagName: "tr",

  initialize: function(params) {
    console.log(params);
    this.templateInfo = params.templateInfo;
    this.templateForm = params.templateCard;

    if (params.templateCard) { this.renderForm(); }
    else { this.render(); }

    this.listenTo(Backbone, "checkout:movie", this.showForm )
  },

  render: function() {
    console.log("in render of rental view");
    var compiledTemplate = this.templateInfo ( this.model.toJSON() );
    this.$el.html(compiledTemplate);
    this.delegateEvents();
    return this;
  },

  renderForm: function() {
    console.log("in rental-form");
    var compiledTemplate = this.templateForm( this.model.toJSON() );
    this.$('#rental-form').html(compiledTemplate);
    return this;
  },

  events: {
    'click .btn-checkout': 'onCheckout',
    'click .btn-checkin': 'onReturn'
  },

  onCheckout: function(){
    console.log("in onCheckout");
    var movieTitle = this.$('#rental-movie-title').val();
    var customerId = this.$('#rental-customer-id').val();
    this.model.set('customer_id', customerId);
    this.model.checkoutUrl(movieTitle);

    var self = this;
    this.model.save({}, {
      success: function(model, response){
        // console.log(response.rental);
        alert("Success - Movie Checked Out! \nCustomer_id: "
        + customerId
        + "\nMovie: " + movieTitle
        + "\nDue: " + response.rental.due_date );
       },

      error: function(model, response){
        console.log(response);

        if ( response.responseJSON.errors.title ) { var titleError = response.responseJSON.errors.title[0] };
        if ( response.responseJSON.errors.customer_id ) { var customerError = response.responseJSON.errors.customer_id[0] }
        // this worked - but you have to know ahead of time that there is a error with title...
        alert( "Something went wrong:\n" + titleError + "\n" + customerError);
      }
    });
    this.model.url = 'http://localhost:3000/rentals/';
  },

  onReturn: function(){
    console.log("in onReturn");
    var movieTitle = this.$('#rental-movie-title').val();
    var customerId = this.$('#rental-customer-id').val();
    this.model.set('customer_id', customerId);
    this.model.checkinUrl(movieTitle);
    var returnDate = new Date();
    var self = this;
    this.model.save({}, {
      success: function(model, response){
        // console.log(response.rental);

        alert("Success - Movie Checked In! \nCustomer_id: "
        + customerId
        + "\nMovie: " + movieTitle
        + "\nChecked In Date: " + returnDate );
       },

      error: function(model, response){
        console.log(response);
        alert( "Something went wrong:\n" + response.responseText)
      }
    });
    this.model.url = 'http://localhost:3000/rentals/';
  },

  showForm: function(title) {
    console.log("in callback");
    console.log(title);
  
    var rental = new Rental();
    var rentalView = new RentalView ({
      model: rental,
      templateCard: _.template( $('#rental-form-template').html() )
    });
    $("#movie-list").hide();
    $("#rental-form").show();
    $("#rental-movie-title").val(title);
  }
});

export default RentalView;
