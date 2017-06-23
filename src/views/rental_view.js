import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Rental from '../models/rental';

var RentalView = Backbone.View.extend({
  tagName: function(){
    return this.model.get('tagName');
  },

  initialize: function(params) {
    // console.log(params);
    this.templateInfo = params.templateInfo;
    this.templateForm = params.templateForm;
    this.render();
  },

  render: function() {
    console.log("in render of rental view");
    var compiledTemplate = this.templateInfo ( this.model.toJSON() );
    this.$el.html(compiledTemplate);
    this.delegateEvents();
    return this;
  },

  events: {
    'click .btn-checkout': 'onCheckout',
    'click .btn-checkin': 'onReturn',
    'click .btn-checkin-from-list': 'onCheckInFromList'
  },

  onCheckout: function(event) {
    console.log("in onCheckout");
    var movieTitle = this.$('#rental-movie-title').val();
    var customerId = this.$('#rental-customer-id').val();
    this.model.set('customer_id', customerId);
    this.model.checkoutUrl(movieTitle);
    this.postRental();
  },

  onReturn: function(){
    console.log("in onReturn");
    var movieTitle = this.$('#rental-movie-title').val();
    var customerId = this.$('#rental-customer-id').val();
    this.model.set('customer_id', customerId);
    this.model.checkinUrl(movieTitle);
    // var returnDate = new Date();
    // this.trigger("updateList", this.model);
    this.postRental();
  },

  onCheckInFromList: function(event) {
    console.log("in check in from list");
    var movieTitle = this.model.get("title");
    // console.log(movieTitle);
    var customerId = this.model.get("customer_id");
    // console.log(customerId);
    this.model.checkinUrl(movieTitle);
    this.trigger("updateList", this.model);
    this.postRental();
  },

  postRental: function() {
    this.model.save({}, {
      success: function(model, response){
        // alert("Success - Movie Checked In! \nCustomer_id: "
        // + customerId + "\nMovie: " + movieTitle);
        alert("Success");
       },

      error: function(model, response){
        // if ( response.responseJSON.errors.title ) { var titleError = response.responseJSON.errors.title[0] };
        // if ( response.responseJSON.errors.customer_id ) { var customerError = response.responseJSON.errors.customer_id[0] }
        // this worked - but you have to know ahead of time that there is a error with title...
        // alert( "Something went wrong:\n" + titleError + "\n" + customerError);

        alert("Something went wrong:\n" + response.responseText );
      }
    });

    this.model.url = 'http://localhost:3000/rentals/';

    // unbind the events to prevent a zombie view
    this.model.unbind('change', this.render, this);
    this.unbind();
  }
});

export default RentalView;
