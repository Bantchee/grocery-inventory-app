const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    address: { type: String, required: true, maxLength: 100 },
    inventory: [{ type: Schema.Types.ObjectId, ref: 'Food Item'}],
    manager: { type: String, require: true, maxLength: 100 },
    start_date: { type: Date, default: Date.now },
});

// Virtual Properties
// Store URL
Store.virtual('url').get(function () {
    return `/home/store/${this.id}`;
});

// Store inventory size
Store.virtual('inventory_size').get(function () {
    return this.inventory.length;
});

// Store age
Store.virtual('age').get(function () {
    return (new Date).getFullYear - this.start_date.getFullYear;
});

// Export model
module.exports = mongoose.model('Store', StoreSchema);