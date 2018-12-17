const mongoose = require('mongoose');

const models = {};

const getModel = (table1, table2) => {
    if (!table2) {
        if (!(table1 in models)) {
            models[table1] = mongoose.model(table1, new mongoose.Schema({}, {
                collection: table1,
                strict: false
            }));
        }
        return models[table1];
    } else {
        if (`${table1}_${table2}` in models) {
            return models[`${table1}_${table2}`];
        } else if (`${table2}_${table1}` in models) {
            return models[`${table2}_${table1}`];
        } else {
            models[`${table1}_${table2}`] = mongoose.model(`${table1}_${table2}`, new mongoose.Schema({}, {
                collection: `${table1}_${table2}`,
                strict: false
            }));
            return models[`${table1}_${table2}`];
        }
    }
};

module.exports = {
    getModel
};