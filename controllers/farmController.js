const Farm = require("../models/farm");
const async = require("async");

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
    }, (err, results)  => {
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
    res.send("NOT IMPLEMENTED: Farm create GET");
};

// Handle Farm create on POST.
exports.farm_create_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Farm create POST");
};

// Display Farm delete form on GET.
exports.farm_delete_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Farm delete GET");
};

// Handle Farm delete on POST.
exports.farm_delete_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Farm delete POST");
};

// Display Farm update form on GET.
exports.farm_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Farm update GET");
};

// Handle Farm update on POST.
exports.farm_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Farm update POST");
};