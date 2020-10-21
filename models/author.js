const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({ // mongoose.Schema creates a new schema which is like table in sql databases
    name: {                                // name field
        type: String,                      // specifies type of the field
        required: true                     // specifies that it is required
    }
});



module.exports = mongoose.model('Authors', authorSchema); // this defines a model. First argument is the name of the table in the database and second argument is the schema that we defined