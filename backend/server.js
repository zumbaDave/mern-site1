require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

// middleware
// need to do this middleware so that we can get data from req in workouts.just routes file
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
//app.get('/', (req, res) => {
//    res.json({mssg: 'Welcome to the app'});
//});

// routes which are in the workouts.js file
// will fire the workoutRoutes only if the path is /api/workouts
app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port 4000');
        });
    })
    .catch((error) => {
        console.log(error);
    });

// listen for requests
// moving this to inside the connect to db then block
//    since we don't want to do this until we are connected to the database
//app.listen(process.env.PORT, () => {
//    console.log('listening on port 4000');
//});