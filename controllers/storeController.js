const Store = require("../models/store");
const Food = require("../models/food");
const async = require("async");

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
exports.store_create_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Store create POST");
};

// Display Store delete form on GET.
exports.store_delete_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Store delete GET");
};

// Handle Store delete on POST.
exports.store_delete_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Store delete POST");
};

// Display Store update form on GET.
exports.store_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Store update GET");
};

// Handle Store update on POST.
exports.store_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Store update POST");
};