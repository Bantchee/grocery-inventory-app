const Farm = require("../models/farm");

// Display list of all Farms.
exports.farm_list = (req, res, next) => {
    Farm.find()
    .sort([["name", "asc"]])
    .exec(function (err, list_farms) {
        if(err) {
            return next(err);
        }
        // Success, render store_list
        res.render("farm_list", {
            title: "Farm List",
            farm_list: list_farms,
        });
    });
};
  
// Display detail page for a specific Farm.
exports.farm_detail = (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Farm detail: ${req.params.id}`);
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