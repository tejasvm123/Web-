const express = require('express');
const dbConnect = require('./mongodb');
const app = express();
app.use(express.json());

//get api

app.get('/', async (req, res) => {
    let result = await dbConnect();
    result = await result.find().toArray();

    res.send(result);
})


//post api

app.post('/', async (req, res) => {
    let result = await dbConnect();
    result = await result.insertOne(req.body);

    res.send("Data inserted");
});

//Put api

app.put('/:name', async (req, res) => {
    let result = await dbConnect();
    result = await result.updateOne({name : req.params.name}, {$set : req.body});

    res.send("Data updated");
});


//Delete api

app.delete('/:name', async (req, res) => {
    let result = await dbConnect();
    result = await result.deleteOne({name : req.params.name});

    res.send("Data deleted");
});

app.listen(3000);

