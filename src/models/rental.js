import Backbone from 'backbone';


// var due_date = now + three_days;
var Rental = Backbone.Model.extend({
  // defaults: {
  //   title: "string",
  //   customer_id: "id"
  // },

  initialize: function(params) {
    if (!this.has('due_date')) {
      var dueDate= new Date();
      dueDate.setDate(dueDate.getDate() + 3);
      this.set('due_date', dueDate);
    }
    console.log("initilizing rental");
  },

  url: 'http://localhost:3000/rentals/',

  checkoutUrl: function(movieTitle){
    this.url = this.url + movieTitle + "/check-out";
    return this;
  },

  checkinUrl: function(movieTitle){
    this.url = this.url + movieTitle + "/return";
    return this;
  }
});

export default Rental;
