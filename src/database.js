const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
// const mongodb_host = process.env.NOTES_APP_MONGODB_HOST;
// const mongodb_database = process.env.NOTES_APP_MONGODB_DATABASE;

const mongodb_uri = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

mongoose.connect(mongodb_uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(db => console.log('Databese is connected'))
    .catch(err => console.log(err))