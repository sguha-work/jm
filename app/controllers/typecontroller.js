'use strict';

var Topic = require('../models/types.js');
var typeDB = require('../db/typedb.js');

const typeController = {};

typeController.getAll = (function(request, response) {
    typeDB.findAll().then(function(data) {
        response.json(data);
    }).catch(function(error) {
        response.json(error);
    });
});

module.exports = typeController;