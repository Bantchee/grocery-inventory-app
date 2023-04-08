const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true},
    food_group: { type: Schema.Types.ObjectId, ref: 'Food Group'},
});

// Virtual Properties
// Food URL
FoodSchema.virtual('url').get(function () {
    return `/catalog/food/${this.id}`;
});

// Export model
module.exports = mongoose.model('Food', FoodSchema);