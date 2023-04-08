const Food = require("../models/food");

// Display list of all Foods.
exports.food_list = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food list");
};
  
// Display detail page for a specific Food.
exports.food_detail = (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Food detail: ${req.params.id}`);
};

// Display Food create form on GET.
exports.food_create_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food create GET");
};

// Handle Food create on POST.
exports.food_create_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food create POST");
};

// Display Food delete form on GET.
exports.food_delete_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food delete GET");
};

// Handle Food delete on POST.
exports.food_delete_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food delete POST");
};

// Display Food update form on GET.
exports.food_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food update GET");
};

// Handle Food update on POST.
exports.food_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food update POST");
};