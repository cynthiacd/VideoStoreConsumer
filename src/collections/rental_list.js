import Backbone from 'backbone';
import Rental from '../models/rental';

var RentalsList = Backbone.Collection.extend({
  model: Rental,
  url: 'http://localhost:3000/rentals/',

  overdueUrl: function() {
    this.url = this.url + "overdue";
    return this;
  }
});

export default RentalsList;
