const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    address: { type: String, required: true, maxLength: 100 },
    inventory: [{ type: Schema.Types.ObjectId, ref: 'Food'}],
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

// Store Start Date as YYYY_MM_DD format
StoreSchema.virtual("start_date_YYYY_MM_DD").get(function () {
    return this.start_date ?
        DateTime.fromJSDate(this.start_date).toISODate() :
        '';
});

// Export model
module.exports = mongoose.model('Store', StoreSchema);