// import $ from 'jquery';

import Backbone from 'backbone';
import RentalView from './rental_view';
import Rental from '../models/rental';
import RentalList from '../collections/rental_list';

var RentalListView = Backbone.View.extend({
  initialize: function(params) {
    // console.log(this.model);
    this.templateInfo = params.templateInfo;

    this.rentalViews = [];

    this.model.forEach(function(rawRental) {
      this.addRental(rawRental);
    }.bind(this) );

    this.listenTo(this.model, "add", this.addRental);
    this.listenTo(this.model, "update", this.render);
    this.listenTo(this.model, "remove", this.removeRental);
  },

  render: function(){
    console.log("rendering the Rental List View");

    this.$('#overdue-info').empty();
    var that = this;
    console.log(this.rentalViews);
    this.rentalViews.forEach(function(rentalView){
      that.$('#overdue-info').append(rentalView.$el);
    });

    return this;
  },

  addRental: function(rawRental) {
    var rentalView = new RentalView({
      model: rawRental,
      tagName: "tr",
      templateInfo: this.templateInfo
    });

    this.rentalViews.push(rentalView);
    this.listenTo( rentalView, "updateList", this.removeRental );
  },

  removeRental: function(rental) {
    console.log("in remove Rental");
    var filteredList = [];
    this.rentalViews.forEach(function(rentalView){
      if (rentalView.model != rental) {
        filteredList.push(rentalView);
      }
    });
    this.rentalViews = filteredList;
    this.render();
  }
});

export default RentalListView;
