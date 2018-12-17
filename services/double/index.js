const m = require('../../models');

const insert = (req, res) => {
    const table1 = req.params['table1'];
    const id1 = req.params['id1'];
    const table2 = req.params['table2'];
    const id2 = req.params['id2'];
    const model = m.getModel(table1, table2);
    model.create({
        [table1]: id1,
        [table2]: id2
    })
        .then(response => {
        res.json(response);
    });
};

const findBySingleId = (req, res) => {
    const table1 = req.params['table1'];
    const id = req.params['id'];
    const table2 = req.params['table2'];
    const model = m.getModel(table1, table2);
    model.find({
        [table1]: id
    })
        .exec()
        .then(response => {
            res.json(response);
        });
};

const deleteByBothId = (req, res) => {
    const table1 = req.params['table1'];
    const id1 = req.params['id1'];
    const table2 = req.params['table2'];
    const id2 = req.params['id2'];
    const model = m.getModel(table1, table2);
    model.deleteMany({
        [table1]: id1,
        [table2]: id2
    })
        .exec()
        .then(response => {
        res.json(response);
    });
};

const deleteBySingleId = (req, res) => {
    const table1 = req.params['table1'];
    const id = req.params['id'];
    const table2 = req.params['table2'];
    const model = m.getModel(table1, table2);
    model.deleteMany({
        [table1]: id
    })
        .exec()
        .then(response => {
        res.json(response);
    });
};

module.exports = app => {
    app.post('/api/:table1/:id1/:table2/:id2', insert);
    app.get('/api/:table1/:id/:table2', findBySingleId);
    app.delete('/api/:table1/:id1/:table2/:id2', deleteByBothId);
    app.delete('/api/:table1/:id/:table2', deleteBySingleId);
};