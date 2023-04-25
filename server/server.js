const config = require('config');
const mongoose = require('mongoose');

mongoose.connect(config.get('dbConfig.MONGODB_URI'), {
    useNewUrlParser: true
})
    .then(console.log("DB is connected"))
    .catch(err => console.log("DB not connected",err));
