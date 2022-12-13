// const http = require('http')
const express = require('express');
const fs = require('fs/promises');
const cors = require('cors');

const app = express();

const logger = async (req, res, next) => {
    await fs.appendFile('./log', `${req.method} ${req.url} ${new Date()}\n`);
    next();
};

app.use(cors());
app.use(logger);
app.use(express.json());

app.get('/users', (req, res, next) => {
    // res.status(200).json(null);
    res.status(200).json({ message: 'Success' });
});
// localhost:5000/users/:id?new=true&test=user
app.get('/users/:id', (req, res, next) => {
    console.log(req.query);
    res.status(200).json({ message: 'Success' });
});
app.post('/users', (req, res, next) => {
    // console.log(req.headers);
    if (!req.body.test) {
        throw new Error('Something went wrong');
    }

    res.status(201).json({ message: `Hello ${req.body.name}` });
});
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.status || 500).json({ error: err.message });
});

app.listen(5001, () => console.log('Server started'));
