const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const singleService = require('./services/single');
const doubleService = require('./services/double');

mongoose.connect(
    process.env.MONGODB_URI
        ? process.env.MONGODB_URI
        : 'mongodb://localhost:27017/cs5200-bonus'
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

singleService(app);
doubleService(app);

const port = process.env.PORT || 4200;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));