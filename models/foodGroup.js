const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodGroupSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
});

// Virtual Properties
// Food Group URL
FoodGroupSchema.virtual("url").get(function() {
    return `/catalog/foodgroup/${this.id}`;
});

// Export model
module.exports = mongoose.model("Food Group", FoodGroupSchema);