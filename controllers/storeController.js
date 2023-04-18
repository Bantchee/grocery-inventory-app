const Store = require("../models/store");
const Food = require("../models/food");
const async = require("async");
const { body, validationResult } = require('express-validator');
const store = require("../models/store");

// Display list of all Stores.
exports.store_list = (req, res, next) => {
    Store.find()
    .sort([["name", "asc"]])
    .exec(function (err, list_stores) {
        if (err) {
            return next(err);
        }
        // Successfull, so render
        res.render("store_list", {
            title: "Store List",
            store_list: list_stores,
        });
    });
};
  
// Display detail page for a specific Store.
exports.store_detail = (req, res, next) => {
    async.parallel({
        store(callback) {
            Store.findById(req.params.id).populate("inventory").exec(callback);
        },
        }, 
        (err, results) => {
            if(err) {
                next(err);
            }
            if(results.store == null) {
                // No results
                
                const err = new Error("Store not found");
                err.status = 404;
                return next(err);
            }

            // Successful, so render.
            res.render("store_detail", {
                title: results.store.name,
                store: results.store,
            });
        }
    );
};

// Display Store create form on GET.
exports.store_create_get = (req, res, next) => {
    // Get all food items, which we can use to add to store.
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
            res.render("store_form", {
                title: "Create Store",
                foods: results.foods,
            });
        }
    )
};

// Handle Store create on POST.
exports.store_create_post = [
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
    const store = new Store({
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
            if (store.inventory.includes(food._id)) {
                food.checked = "true";
            }
            }
            res.render("store_form", {
                title: "Create Store",
                foods: results.foods,
                store,
                errors: errors.array(),
            });
        }
        );
      return;
    }

    // Data from form is valid. Save store.
    store.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new store record.
      res.redirect(store.url);
    });
  },

];

// Display Store delete form on GET.
exports.store_delete_get = (req, res, next) => {
    async.parallel({
        store(callback) {
            Store.findById(req.params.id).exec(callback);
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.store == null) {
            // No results.
            res.redirect("/catalog/stores");
        }
        // Successful, so render.
        res.render("store_delete", {
            title: "Delete Store",
            store: results.store,
        });
    });
};

// Handle Store delete on POST.
exports.store_delete_post = (req, res, next) => {
    async.parallel({
        store(callback) {
            Store.findById(req.params.id).exec(callback);
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.store == null) {
            // No results.
            res.redirect("/catalog/stores");
        }
        // Delete object and redirect to the list of Stores.
        Store.findByIdAndRemove(req.body.storeid, (err) => {
            if (err) {
                return next(err);
            }
            // Success - go to book list
            res.redirect("/catalog/stores");
        });
    });
};

// Display Store update form on GET.
exports.store_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Store update GET");
};

// Handle Store update on POST.
exports.store_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Store update POST");
};