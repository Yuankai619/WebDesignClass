const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./student');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000;

app.use(bodyParser.json());
password = "zHaGX0bMvEeVqUNf";
mongoose.connect('mongodb+srv://Yuankai:zHaGX0bMvEeVqUNf@studendtdb.tdwgvin.mongodb.net/?retryWrites=true&w=majority');//, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.post('/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.json(newStudent);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/students/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send("No student found with that ID");
        }
        res.status(200).send("Student deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});


app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) res.status(404).send("No student found");
        res.json(student);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//zHaGX0bMvEeVqUNf