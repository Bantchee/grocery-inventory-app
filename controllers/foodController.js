const Food = require("../models/food");
const FoodGroup = require("../models/foodGroup");
const async = require("async");
const { body, validationResult } = require('express-validator');
const luxon = require('luxon');

// Display list of all Foods.
exports.food_list = (req, res, next) => {
    Food.find()
    .sort([["name", "asc"]])
    .exec(function (err, list_foods) {
        if(err) {
            return next(err);
        }
        // Successfull, so render
        res.render("food_list", {
            title: "Food List",
            food_list: list_foods,
        });
    });
};
  
// Display detail page for a specific Food.
exports.food_detail = (req, res, next) => {
    async.parallel({
        food(callback) {
            Food.findById(req.params.id).populate("food_group").exec(callback);
        },
    }, (err, results) => {
        if(err) {
            next(err);
        }
        if(results.food == null) {
            // No results
            const err = new Error("Food not found");
            err.status = 400;
            return next(err);
        }

        // Successfull, so render
        res.render("food_detail", {
            title: results.food.name,
            food: results.food,
        })
    });
};

// Display Food create form on GET.
exports.food_create_get = (req, res, next) => {
    // Get all food groups, which we can use to add to store.
    async.parallel(
        {
            foodGroups(callback) {
                FoodGroup.find(callback);
            },
        },
        (err, results) => {
            if(err) {
                next(err);
            }
            res.render("food_form", {
                title: "Create Food",
                foodGroups: results.foodGroups,
            });
        }
    )
};

// Handle Food create on POST.
exports.food_create_post = [
    // Validate and sanitize fields.
    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("description", "Description must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("foodGroup")
        .escape(),

    // Process request after validation and sanitization.
  (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a food group object with escaped and trimmed data.
        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            food_group: req.body.foodGroup,
        });

        if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values and error messages.
        FoodGroup.find().exec(function (err, foodGroups) {
            if (err) {
                return next(err);
            }
            // Successful, so render.
            res.render("food_form", {
                title: "Create Food",
                foodGroups: foodGroups,
                selected_food_group: food.food_group._id,
                errors: errors.array(),
                food,
            });
        });
        return;
        }

        // Data from form is valid. Save store.
        food.save((err) => {
            if (err) {
                return next(err);
            }
                // Successful: redirect to new store record.
                res.redirect(food.url);
        });
    },
];

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