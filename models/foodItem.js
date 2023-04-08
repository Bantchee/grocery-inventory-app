const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
    food: { type: Schema.Types.ObjectId, ref: 'Food'},
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        require: true,
        enum: [
            { type: Schema.Types.ObjectId, ref: 'Store'},
            { type: Schema.Types.ObjectId, ref: 'Farm'},
        ],
    },
    arrival_date: { type: Date, default: Date.now },
    expiration_date: { type: Date, default: Date.now },
    storage_type: {
        type: String,
        ref: "Storage Type",
        require: true,
        enum: ["Freeze", "Refrigerate", "Room Temperature"],
        default: "Room Temperature",
    },
    price: { type: Number, require: true },
    
});

// Virtual Properties
// Food URL
FoodItemSchema.virtual('url').get(function () {
    return `/home/fooditem/${this.id}`;
});

// Days till expiration (basic)
FoodItemSchemma.virtual('lifespan').get(function() {
    let years = this.expiration_date.getFullYears() - this.arrival_date.getFullYears();
    let months = this.expiration_date.getMonth() - this.arrival_date.getMonth();
    let days = this.expiration_date.getDate() - this.arrival_date.getDate();

    return years * 365 + months * 30 + days;
})

// Export model
module.exports = mongoose.model('FoodItem', FoodItemSchema);