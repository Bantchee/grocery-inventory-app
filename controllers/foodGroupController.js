const FoodGroup = require("../models/foodGroup");

// Display list of all FoodGroups.
exports.food_group_list = (req, res, next) => {
    FoodGroup.find()
    .sort([["name", "asc"]])
    .exec(function (err, list_food_groups) {
        if(err) {
            return next(err);
        }
        // Success, so render
        res.render("food_group_list", {
            title: "Food Group List",
            food_group_list: list_food_groups,
        })
    })
};
  
// Display detail page for a specific FoodGroup.
exports.food_group_detail = (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Food Group detail: ${req.params.id}`);
};

// Display FoodGroup create form on GET.
exports.food_group_create_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Group create GET");
};

// Handle FoodGroup create on POST.
exports.food_group_create_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Group create POST");
};

// Display FoodGroup delete form on GET.
exports.food_group_delete_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Group delete GET");
};

// Handle FoodGroup delete on POST.
exports.food_group_delete_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Group delete POST");
};

// Display FoodGroup update form on GET.
exports.food_group_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Group update GET");
};

// Handle FoodGroup update on POST.
exports.food_group_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Group update POST");
};