const Food = require("../models/food");
const async = require("async");

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