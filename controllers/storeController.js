const Store = require("../models/store");

// Display list of all Stores.
exports.store_list = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Store list");
};
  
// Display detail page for a specific Store.
exports.store_detail = (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Store detail: ${req.params.id}`);
};

// Display Store create form on GET.
exports.store_create_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Store create GET");
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