const express = require('express');
const router = express.Router();

// Require controller modules.
const index_controller = require('../controllers/indexController');
const store_controller = require('../controllers/storeController');
const farm_controller = require('../controllers/farmController');
const food_controller = require('../controllers/foodController');
const food_item_controller = require('../controllers/foodItemController');
const food_group_controller = require('../controllers/foodGroupController');


/// INDEX ROUTES ///

// GET catalog home page.
router.get("/", index_controller.index);

/// STORE ROUTES ///

// GET request for creating a Store. NOTE This must come before routes that display Store (uses id).
router.get("/store/create", store_controller.store_create_get);

// POST request for creating a Store.
router.post("/store/create", store_controller.store_create_post);

// GET request to delete a Store
router.get("/store/:id/delete", store_controller.store_delete_get);

// POST request to delete a Store
router.post("/store/:id/delete", store_controller.store_delete_post);

// GET request to update a Store
router.get("/store/:id/update", store_controller.store_update_get);

// POST request to update a Store
router.post("/store/:id/update", store_controller.store_update_post);

// GET request for one Store
router.get("/store/:id", store_controller.store_detail);

// GET request for list of all Stores
router.get("/stores", store_controller.store_list);

/// FARM ROUTES ///

// GET request for creating a Farm. NOTE This must come before routes that display Farm (uses id).
router.get("/farm/create", farm_controller.farm_create_get);

// POST request for creating a Farm.
router.post("/farm/create", farm_controller.farm_create_post);

// GET request to delete a Farm
router.get("/farm/:id/delete", farm_controller.farm_delete_get);

// POST request to delete a Farm
router.post("/farm/:id/delete", farm_controller.farm_delete_post);

// GET request to update a Farm
router.get("/farm/:id/update", farm_controller.farm_update_get);

// POST request to update a Farm
router.post("/farm/:id/update", farm_controller.farm_update_post);

// GET request for one Farm
router.get("/farm/:id", farm_controller.farm_detail);

// GET request for list of all Farms
router.get("/farms", farm_controller.farm_list);

/// FOOD ROUTES ///

// GET request for creating a Food. NOTE This must come before routes that display Food (uses id).
router.get("/food/create", food_controller.food_create_get);

// POST request for creating a Food.
router.post("/food/create", food_controller.food_create_post);

// GET request to delete a Food
router.get("/food/:id/delete", food_controller.food_delete_get);

// POST request to delete a Food
router.post("/food/:id/delete", food_controller.food_delete_post);

// GET request to update a Food
router.get("/food/:id/update", food_controller.food_update_get);

// POST request to update a Food
router.post("/food/:id/update", food_controller.food_update_post);

// GET request for one Food
router.get("/food/:id", food_controller.food_detail);

// GET request for list of all Foods
router.get("/foods", food_controller.food_list);

/// FOOD ITEM ROUTES ///

// GET request for creating a Food Item. NOTE This must come before routes that display Food Item (uses id).
router.get("/fooditem/create", food_item_controller.food_item_create_get);

// POST request for creating a Food Item.
router.post("/fooditem/create", food_item_controller.food_item_create_post);

// GET request to delete a Food Item
router.get("/fooditem/:id/delete", food_item_controller.food_item_delete_get);

// POST request to delete a Food Item
router.post("/fooditem/:id/delete", food_item_controller.food_item_delete_post);

// GET request to update a Food Item
router.get("/fooditem/:id/update", food_item_controller.food_item_update_get);

// POST request to update a Food Item
router.post("/fooditem/:id/update", food_item_controller.food_item_update_post);

// GET request for one Food Item
router.get("/fooditem/:id", food_item_controller.food_item_detail);

// GET request for list of all Food Items
router.get("/fooditems", food_item_controller.food_item_list);

/// FOOD GROUP ROUTES ///

// GET request for creating a Food Group. NOTE This must come before routes that display Food Group (uses id).
router.get("/foodgroup/create", food_group_controller.food_group_create_get);

// POST request for creating a Food Item.
router.post("/foodgroup/create", food_group_controller.food_group_create_post);

// GET request to delete a Food Item
router.get("/foodgroup/:id/delete", food_group_controller.food_group_delete_get);

// POST request to delete a Food Item
router.post("/foodgroup/:id/delete", food_group_controller.food_group_delete_post);

// GET request to update a Food Item
router.get("/foodgroup/:id/update", food_group_controller.food_group_update_get);

// POST request to update a Food Item
router.post("/foodgroup/:id/update", food_group_controller.food_group_update_post);

// GET request for one Food Item
router.get("/foodgroup/:id", food_group_controller.food_group_detail);

// GET request for list of all Food Items
router.get("/foodgroups", food_group_controller.food_group_list);

module.exports = router;