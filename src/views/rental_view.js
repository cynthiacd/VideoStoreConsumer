import Backbone from 'backbone';

var RentalView = Backbone.View.extend({


  initialize: function(params) {
    this.template = params.templateCard;
    console.log(this.template);
    this.render();
  },

  render: function() {
    var compiledTemplate = this.template( this.model.toJSON() );
    this.$('#rentals').html(compiledTemplate);

    // this.delegateEvents();

    return this;
  },

  events: {
    'click .btn-checkout': 'onCheckout'
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
  }



});

export default RentalView;
