const FoodItem = require("../models/foodItem");

// Display list of all FoodItems.
exports.food_item_list = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Item list");
};
  
// Display detail page for a specific FoodItem.
exports.food_item_detail = (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Food Item detail: ${req.params.id}`);
};

// Display FoodItem create form on GET.
exports.food_item_create_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Item create GET");
};

// Handle FoodItem create on POST.
exports.food_item_create_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Item create POST");
};

// Display FoodItem delete form on GET.
exports.food_item_delete_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Item delete GET");
};

// Handle FoodItem delete on POST.
exports.food_item_delete_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Item delete POST");
};

// Display FoodItem update form on GET.
exports.food_item_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Item update GET");
};

// Handle FoodItem update on POST.
exports.food_item_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Item update POST");
};