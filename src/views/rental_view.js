import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Rental from '../models/rental';

var RentalView = Backbone.View.extend({
  tagName: function(){
    return this.model.get('tagName');
  },

  initialize: function(params) {
    console.log(params);
    this.templateInfo = params.templateInfo;
    this.templateForm = params.templateForm;

    if (params.templateForm) { this.renderForm(); }
    else { this.render(); }

  },

  render: function() {
    console.log("in render of rental view");
    var compiledTemplate = this.templateInfo ( this.model.toJSON() );
    this.$el.html(compiledTemplate);
    this.delegateEvents();
    return this;
  },

  // renderForm: function() {
  //   console.log("in render of rental-form");
  //   var compiledTemplate = this.templateForm( this.model.toJSON() );
  //   this.$('#rental-form').html(compiledTemplate);
  //   this.delegateEvents();
  //   return this;
  // },

  events: {
    'click .btn-checkout': 'onCheckout',
    'click .btn-checkin': 'onReturn',
    'click .btn-checkin-from-list': 'onCheckInFromList'
  },

  onCheckInFromList: function(event) {

    var movieTitle = this.model.get("title");
    console.log(movieTitle);
    var customerId = this.model.get("customer_id");
    console.log(customerId);

    this.model.checkinUrl(movieTitle);
    console.log(this.model.url);

    // var self = this;
    this.model.save({}, {
      success: function(model, response){
        alert("Success - Movie Checked In! \nCustomer_id: "
        + customerId + "\nMovie: " + movieTitle);
       },

      error: function(model, response){
        console.log(response);

        if ( response.responseJSON.errors.title ) { var titleError = response.responseJSON.errors.title[0] };
        // if ( response.responseJSON.errors.customer_id ) { var customerError = response.responseJSON.errors.customer_id[0] }
        // this worked - but you have to know ahead of time that there is a error with title...
        alert( "Something went wrong:\n" + titleError + "\n" + customerError);
      }
    });

    this.trigger("updateList", this.model);
    this.model.url = 'http://localhost:3000/rentals/';
    this.model.unbind('change', this.render, this);
    this.unbind();
  },

  onCheckout: function(event) {
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
    this.model.unbind('change', this.render, this);
    this.unbind();
  },

  onReturn: function(){
    console.log("in onReturn");
    var movieTitle = this.$('#rental-movie-title').val();
    var customerId = this.$('#rental-customer-id').val();
    this.model.set('customer_id', customerId);
    this.model.checkinUrl(movieTitle);
    var returnDate = new Date();
    // var self = this;
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

    this.model.unbind('change', this.render, this);
    this.unbind();
  }
});

export default RentalView;
