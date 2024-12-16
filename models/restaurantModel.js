const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Restaurant name is mandatory
      },
    location: {
        type:String,
        required:true,
    },
    phonenumber: {
        type: Number,
        required: true, // customer PhoneNumber is mandatory
      },
    date:{
      type: Date,
      default: Date.now,
      required:true
    }
});

const restaurantModel = mongoose.model('Restaurant', restaurantSchema);

module.exports = restaurantModel;