const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    address: { type: String, required: true, maxLength: 100 },
    inventory: [{ type: Schema.Types.ObjectId, ref: 'FoodItem'}],
    manager: { type: String, require: true, maxLength: 100 },
    start_date: { type: Date, default: Date.now },
});

// Virtual Properties
// Store URL
StoreSchema.virtual('url').get(function () {
    return `/catalog/store/${this.id}`;
});

// Store inventory size
StoreSchema.virtual('inventory_size').get(function () {
    return this.inventory.length;
});

// Store age
StoreSchema.virtual('age').get(function () {
    return parseInt((new Date).getFullYear()) - parseInt(this.start_date.getFullYear());
});

// Export model
module.exports = mongoose.model('Store', StoreSchema);