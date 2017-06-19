import Backbone from 'backbone';

var RentalView = Backbone.View.extend({


  initialize: function(params) {
    this.template = params.templateCard;
    console.log(this.template);
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
    'click .btn-checkout': 'onCheckout'
  },

  onCheckout: function(){
    console.log("in onCheckout");
    var movieTitle = this.$('#rental-movie-title').val();
    var customerId = this.$('#rental-customer-id').val();
    this.model.set('customer_id', customerId);
    this.model.cumstomUrl(movieTitle);
    this.model.save();
  }

  // addToLib: function(movieView){
  //   // console.log("made it to add to lib function");
  //   var title = movieView.model.get("title")
  //   var inventory = this.$('#inventory').val();
  //   movieView.model.set('inventory', inventory);
  //   this.model.create(movieView.model, {
  //     error: function(reponse) { alert("Error - Movie was not added to library") },
  //     success: function(response) { alert(title + ': was added successfully!' + "\n" + 'Inventory: ' + inventory) }
  //   });
  // }





});

export default RentalView;
