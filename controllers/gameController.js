const games = require("../models/games.js");
const CustomError = require("../classes/CustomError");

function index(req, res) {
    const response = {
        totalCount: games.length,
        data: [...games],
    };
    res.json(response);
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const item = games.find((item) => item._id === id);
    if (!item) {
        throw new CustomError("L'elemento non esiste", 404);
    }
    res.json({ success: true, item });
}

function store(req, res) {
    const newId = games.reduce((curr, next) => {
        return curr._id < next._id ? next : curr
    })._id + 1;

    // new data is in req.body
    const newItem = {
        _id: newId,
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        thumbnailUrl: req.body.thumbnailUrl,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        status: req.body.status,
        authors: req.body.authors,
        categories: req.body.categories,
    };

    games.push(newItem);
    console.log(newItem);
    res.status(201).json(newItem);
}

function update(req, res) {
    const id = parseInt(req.params.id);
    const item = games.find((item) => item._id === id);
    if (!item) {
        throw new CustomError("L'elemento non esiste", 404);
    }

    //console.log(req.body);
    for (key in item) {
        if (key !== "_id") {
            item[key] = req.body[key];
        }
    }

    //console.log(examples);
    res.json(item);
}
function destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = games.findIndex((item) => item._id === id);
    if (index !== -1) {
        games.splice(index, 1);
        res.sendStatus(204);
    } else {
        throw new CustomError("L'elemento non esiste", 404);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
