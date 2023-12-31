const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

// Routes
const events = require('./routes/event.route');
const athletes = require('./routes/athlete.route');
const promoters = require('./routes/promoter.route');

//  --- Connect to Database --- ///
mongoose.connect(process.env.MONGO_URI, {dbName: 'fightHubDB'})
    .then(
        () => { console.log("Connection with database established")},
        err => { console.log("Failed to connect with database", err)}
    );

// ----- Middlewares ---- //

// General
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200','https://vasilismoutz.github.io', 'https://vasilismoutz.github.io/fight-hub/'],
    exposedHeaders: ["set-cookie"]
}));

// Routing
app.use('/api/events', events);
app.use('/api/athletes', athletes);
app.use('/api/promoters', promoters);

// --- Start the server --- //
app.listen(port);