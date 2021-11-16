const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yauridavid00:paxi94i31@cluster0.nspo7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));