const Farm = require("../models/farm");
const Food = require("../models/food");
const async = require("async");
const { body, validationResult } = require('express-validator');

// Display list of all Farms.
exports.farm_list = (req, res, next) => {
    Farm.find()
    .sort([["name", "asc"]])
    .exec(function (err, list_farms) {
        if(err) {
            return next(err);
        }
        // Success, render farm_list
        res.render("farm_list", {
            title: "Farm List",
            farm_list: list_farms,
        });
    });
};
  
// Display detail page for a specific Farm.
exports.farm_detail = (req, res, next) => {
    async.parallel({
        farm(callback) {
            Farm.findById(req.params.id).populate('inventory').exec(callback);
        },
    }, (err, results) => {
        if(err) {
            next(err);
        }
        if(results.farm == null) {
            // No results
            const err = new Error("Farm not found");
            err.status = 400;
            return next(err);
        } 

        // Successfull, render farm detail
        res.render("farm_detail", {
            title: results.farm.name,
            farm: results.farm,
        })
    });
  
};

// Display Farm create form on GET.
exports.farm_create_get = (req, res, next) => {
        // Get all food items, which we can use to add to farm
        async.parallel(
            {
                foods(callback) {
                    Food.find(callback);
                },
            },
            (err, results) => {
                if(err) {
                    next(err);
                }
                res.render("farm_form", {
                    title: "Create Farm",
                    foods: results.foods,
                });
            }
        )
};

// Handle Farm create on POST.
exports.farm_create_post = [
    // Convert inventory to an array
    (req, res, next) => {
        if (!Array.isArray(req.body.food)) {
            req.body.food = typeof req.body.food === "undefined" ? [] : [req.body.food];
        }
        next();
    },
    
    // Validate and sanitize fields.
    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("address", "Address must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("manager", "Manager must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("start_date", "Invalid start date.")
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),
    body("food.*").escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Store object with escaped and trimmed data.
        const farm = new Farm({
            name: req.body.name,
            address: req.body.address,
            inventory: req.body.food,
            manager: req.body.manager,
            start_date: req.body.start_date,
        });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

        // Get all foods for form.
        async.parallel(
            {
                foods(callback) {
                    Food.find(callback);
                },
            },
            (err, results) => {
                if (err) {
                    return next(err);
                }

                // Mark our selected foods as checked.
                for (const food of results.foods) {
                    if (farm.inventory.includes(food._id)) {
                        food.checked = "true";
                    }
                }
                res.render("farm_form", {
                    title: "Create Farm",
                    foods: results.foods,
                    farm,
                    errors: errors.array(),
                });
            }
        );
        return;
    }

    // Data from form is valid. Save farm.
    farm.save((err) => {
        if (err) {
        return next(err);
        }
        // Successful: redirect to new farm record.
        res.redirect(farm.url);
    });
    },
];

// Display Farm delete form on GET.
exports.farm_delete_get = (req, res, next) => {
    async.parallel({
        farm(callback) {
            Farm.findById(req.params.id).exec(callback);
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.farm == null) {
            // No results.
            res.redirect("/catalog/farms");
        }
        // Successful, so render.
        res.render("farm_delete", {
            title: "Delete Farm",
            farm: results.farm,
        });
    });
};

// Handle Farm delete on POST.
exports.farm_delete_post = (req, res, next) => {
    async.parallel({
        farm(callback) {
            Farm.findById(req.params.id).exec(callback);
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.farm == null) {
            // No results.
            res.redirect("/catalog/farms");
        }
        // Delete object and redirect to the list of Farms.
        Farm.findByIdAndRemove(req.body.farmid, (err) => {
            if (err) {
                return next(err);
            }
            // Success - go to book list
            res.redirect("/catalog/farms");
        });
    });
};

// Display Farm update form on GET.
exports.farm_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Farm update GET");
};

// Handle Farm update on POST.
exports.farm_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Farm update POST");
};