import Backbone from 'backbone';


// var due_date = now + three_days;
var Rental = Backbone.Model.extend({
  defaults: {
    title: "string",
    customer_id: "id"
  },

  initialize: function(params) {
    if (!this.has('due_date')) {
      var dueDate= new Date();
      dueDate.setDate(dueDate.getDate() + 3);
      this.set('due_date', dueDate);
    }
    console.log(this.get("due_date"));
    console.log("Rental Initialized: " + this.get("title") + this.get("customer_id"));
  },

  url: 'http://localhost:3000/rentals/',

  cumstomUrl: function(movieTitle){
    this.url = this.url + movieTitle + "/check-out";
    return this;
  }

});

export default Rental;
