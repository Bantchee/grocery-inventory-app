const FoodGroup = require("../models/foodGroup");
const async = require("async");
const { body, validationResult } = require('express-validator');
const luxon = require('luxon');

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
    async.parallel({
        foodGroup(callback) {
            FoodGroup.findById(req.params.id).exec(callback);
        },
    }, (err, results) => {
        if(err) {
            next(err);
        }
        if(results.foodGroup == null) {
            // No results
            const err = new Error("Food group not found");
            err.status = 400;
            return next(err);
        }

        // Successfull, render food group detail
        res.render("food_group_detail", {
            foodGroup: results.foodGroup,
        })
    })
};

// Display FoodGroup create form on GET.
exports.food_group_create_get = (req, res, next) => {
    res.render("food_group_form", {
        title: "Create Food Group",
    });
};

// Handle FoodGroup create on POST.
exports.food_group_create_post = [
    // Validate and sanitize fields.
    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Food object with escaped and trimmed data.
        const foodGroup = new FoodGroup({
            name: req.body.name,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render("food_group_form", {
                title: "Create Food Group",
                foodGroup,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save store.
        foodGroup.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful: redirect to new store record.
            res.redirect(foodGroup.url);
        });
    },
];

// Display FoodGroup delete form on GET.
exports.food_group_delete_get = (req, res, next) => {
    async.parallel({
        foodGroup(callback) {
            FoodGroup.findById(req.params.id).exec(callback);
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.foodGroup == null) {
            // No results.
            res.redirect("/catalog/foodgroups");
        }
        // Successful, so render.
        res.render("food_group_delete", {
            title: "Delete Food Group",
            foodGroup: results.foodGroup,
        });
    });
};

// Handle FoodGroup delete on POST.
exports.food_group_delete_post = (req, res, next) => {
    async.parallel({
        foodGroup(callback) {
            FoodGroup.findById(req.params.id).exec(callback);
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.foodGroup == null) {
            // No results.
            res.redirect("/catalog/foodGroups");
        }
        // Delete object and redirect to the list of Stores.
        FoodGroup.findByIdAndRemove(req.body.foodgroupid, (err) => {
            if (err) {
                return next(err);
            }
            // Success - go to book list
            res.redirect("/catalog/foodgroups");
        });
    });
};

// Display FoodGroup update form on GET.
exports.food_group_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Group update GET");
};

// Handle FoodGroup update on POST.
exports.food_group_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Food Group update POST");
};