'use strict';

let UserController = require('../controllers/usercontroller.js');

const searchController = {};

let searchUserWithKeyWord = ((keyWord) => {
    return new Promise((resolve, reject) => {
        UserController.searchByKeyword(keyWord).then((data) => {
            resolve(data);
        }).catch(() => {
            reject();
        });
    });
});

let searchPostNameWithKeyWord = ((keyWord) => {
    return new Promise((resolve, reject) => {
        resolve([]);
    });
});
let searchPostContentWithKeyWord = ((keyWord) => {
    return new Promise((resolve, reject) => {
        resolve([]);
    });
});
searchController.search = ((request, response) => {
    let resultObject = {};
    let keyToSearch = request.query.key;//req.query
    // searching user
    let searchUserPromise = new Promise((resolve, reject) => {
        searchUserWithKeyWord(keyToSearch).then((data) => {
            resultObject.user = data;
            resolve();
        }).catch(() => {
            resultObject.user = [];
            resolve();
        });
    });
    
    // searching postname
    let searchPostNamePromise = new Promise((resolve, reject) => {
        searchPostNameWithKeyWord(keyToSearch).then((data) => {
            resultObject.postWithName = data;
            resolve();
        }).catch(() => {
            resultObject.postWithName = [];
            resolve();
        });
    });

    // searching postcontent
    let searchPostContentPromise = new Promise((resolve, reject) => {
        searchPostContentWithKeyWord(keyToSearch).then((data) => {
            resultObject.postWithContent = data;
            resolve();
        }).catch(() => {
            resultObject.postWithContent = [];
            resolve();
        });
    });

    Promise.all([searchUserPromise, searchPostNamePromise, searchPostContentPromise]).then(() => {
        response.json({"success": true, "data":resultObject});
    }).catch(() => {
        response.json({"success": false, "data":null});
    });

});


module.exports = searchController;