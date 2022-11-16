const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3030;

app.use(cors());

// DB name after .net/
const url = 'mongodb+srv://ivydigital:s7OQSP630S16UtjX@cluster0.y3sagoj.mongodb.net/todo?retryWrites=true&w=majority';

mongoose.connect(url).then(() => {
    console.log('Connected to DB')
}).catch((err) => {
    console.error(`Error connecting ${err}`)
});

const taskSchema  = new mongoose.Schema({
    title: String,
    isDone: Boolean
});

const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', (req,res) => {
    let doneQuery;
    if (req.query.isDone) {
        doneQuery = {isDone: req.query.isDone};
    } else {
        doneQuery = {}
    }
    Task.find(doneQuery, (err,tasks) => {
        if (err) {
            console.error(err)
        } else {
            res.json({tasks: tasks})
        }
    })
});

app.listen(port, console.log('Listening to ' + port));