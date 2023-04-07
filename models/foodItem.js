const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodItemschema = new Schema({
    food: { type: Schema.Types.ObjectId, ref: 'Food Group'},
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        require: true,
        enum: [
            { type: Schema.Types.ObjectId, ref: 'Store'},
            { type: Schema.Types.ObjectId, ref: 'Farm'},
        ],
    },
    arrival: { type: Date, default: Date.now },
    expiration: { type: Date, default: Date.now },
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
Food.virtual('url').get(function () {
    return `/home/fooditem/${this.id}`;
});

// Export model
module.exports = mongoose.model('Food', FoodSchema);