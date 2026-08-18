const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const port = 8000;

mongoose
    .connect("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(() => console.log("MongoDB Connected"))
    .catch(error => console.log("Mongo Err", error));

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }

}, { timestamps: true });

const User = mongoose.model('user', userSchema);

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded());


app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>`;
    return res.send(html);


})

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.send(allDbUsers);
})


app.post('/api/users/', async (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ msg: "All fields are req.. "});
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email : body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })

    console.log("result", result);

    return res.status(201).json({ msg : "success"});
    
})

app.route('/api/users/:id')
.get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ error : "user not found"});
    return res.json(user);
}).patch( async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName : "Changed"});
    return res.send({ status : "User info updated!"})
}).delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.send({ status : "User deleted successfully"});
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})