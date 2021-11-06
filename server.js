const mongoose = require('mongoose');
require('dotenv').config();



mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workoutsdb", 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
    }
);