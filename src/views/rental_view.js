import Backbone from 'backbone';

var RentalView = Backbone.View.extend({
  tagName: "tr",

  initialize: function(params) {
    console.log(params);
    this.templateInfo = params.templateInfo;
    this.templateForm = params.templateCard;

    if (params.templateCard) { this.renderForm(); }
    else { this.render(); }
  },

  render: function() {
    console.log("in render of rental view");
    var compiledTemplate = this.templateInfo ( this.model.toJSON() );
    this.$el.html(compiledTemplate);
    return this;
  },

  renderForm: function() {
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
        alert( "Something went wrong:\n" + response.responseText)
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
  }
});

export default RentalView;
