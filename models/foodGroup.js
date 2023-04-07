const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodGroupSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
});

// Virtual Properties
// Food Group URL
FoodGroup.virtual("url").get(function() {
    return `/home/foodgroup/${this.id}`;
});

// Export model
module.exports = mongoose.model("FoodGroup", FoodGroupSchema);