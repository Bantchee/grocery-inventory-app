const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FarmSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    address: { type: String, required: true, maxLength: 100 },
    inventory: [{ type: Schema.Types.ObjectId, ref: 'Food Item'}],
    manager: { type: String, require: true, maxLength: 100 },
    start_date: { type: Date, default: Date.now },
});

// Virtual Properties
// Farm URL
FarmSchema.virtual('url').get(function () {
    return `/home/farm/${this.id}`;
});

// Farm inventory size
FarmSchema.virtual('inventory_size').get(function () {
    return this.inventory.length;
});

// Farm age
FarmSchema.virtual('age').get(function () {
    return (new Date).getFullYear - this.start_date.getFullYear;
});

// Export model
module.exports = mongoose.model('Farm', FarmSchema);