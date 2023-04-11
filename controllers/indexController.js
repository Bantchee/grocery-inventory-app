const Store = require("../models/store");
const Farm = require("../models/farm");
const Food = require("../models/food");
const FoodGroup = require("../models/foodGroup");

const async = require('async');

exports.index = (req, res, next) => {
    async.parallel(
        {
            store_count(callback) {
                Store.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
            },
            farm_count(callback) {
                Farm.countDocuments({}, callback);
            },
            food_count(callback) {
                Food.countDocuments({}, callback);
            },
            food_group_count(callback) {
                FoodGroup.countDocuments({}, callback);
            },
        },
        (err, results) => {
            res.render("index", {
                title: "Grocery Inventory Home",
                error: err,
                data: results,
            })
        }
    )
};
  