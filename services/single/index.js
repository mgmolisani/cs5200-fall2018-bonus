const m = require('../../models');

const insert = (req, res) => {
    const table = req.params['table'];
    const doc = req.body;
    const model = m.getModel(table);
    model.create(doc)
        .then(response => {
            res.json(response);
        });
};

const findAll = (req, res) => {
    const table = req.params['table'];
    const model = m.getModel(table);
    model.find()
        .exec()
        .then(response => {
            res.json(response);
        });
};

const findById = (req, res) => {
    const table = req.params['table'];
    const id = req.params['id'];
    const model = m.getModel(table);
    model.findById(id)
        .exec()
        .then(response => {
            res.json(response);
        });
};

const updateById = (req, res) => {
    const table = req.params['table'];
    const id = req.params['id'];
    const doc = req.body;
    const model = m.getModel(table);
    model.findByIdAndUpdate(id, doc, {new: true})
        .exec()
        .then(response => {
            res.json(response);
        });
};

const deleteById = (req, res) => {
    const table = req.params['table'];
    const id = req.params['id'];
    const model = m.getModel(table);
    model.findByIdAndRemove(id, {rawResult: true})
        .exec()
        .then(response => {
            res.json(response);
        });
};

const truncate = (req, res) => {
    const table = req.params['table'];
    const model = m.getModel(table);
    model.deleteMany({})
        .exec()
        .then(response => {
            res.json(response);
        });
};

module.exports = app => {
    app.post('/api/:table', insert);
    app.get('/api/:table', findAll);
    app.get('/api/:table/:id', findById);
    app.put('/api/:table/:id', updateById);
    app.delete('/api/:table/:id', deleteById);
    app.delete('/api/:table', truncate);
};