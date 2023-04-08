const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Foodschema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true},
    food_group: { type: Schema.Types.ObjectId, ref: 'Food Group'},
});

// Virtual Properties
// Food URL
Foodschema.virtual('url').get(function () {
    return `/home/food/${this.id}`;
});

// Export model
module.exports = mongoose.model('Food', FoodSchema);