const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const end = Date.now();
        const duration = end - start;
        console.log(`time to get response : ${duration}`);
    });
    next();
})

app.use((req, res, next) => {
    const start = Date.now();
    const data = `request method : ${req.method} | request url : ${req.url} | timestamp : ${Date.now()}\n`;
    fs.appendFile('logger.txt', data , (error, data) => {
        if(error){
            res.send('Error writing log file');
        }
        else{
            next();
        }
    })
})

// Centralised load users middleware
app.use((req, res, next) => {
    fs.readFile('mockData.json', 'utf-8', (error, data) => {
        if(error){
            res.send("Error fetching user");
        }
        else{
            const users = JSON.parse(data);
            req.users = users;
            next();
        }
    });

})


app.get('/users', (req, res)=>{
    // fs.readFile('mockData.json', 'utf-8', (error, data) => {
    //     if(error){
    //         console.error(error);
    //         res.send('Error reading file');
    //     }
    //     else{
    //         const users = JSON.parse(data);
    //         res.send(users);
    //     }
    // });
    res.send(req.users);

})

app.get('/api/users', (req, res)=>{
    // fs.readFile('mockData.json', 'utf-8', (error, data) => {
    //     if(error){
    //         console.error(error);
    //     }
    //     else{
    //         const users = JSON.parse(data);
    //         const htmlData = users.map(user => `
    //     <li>${user.first_name}</li>`).join('');
    // res.send(htmlData);

    //     }
    // });
    const users = req.users;
    const htmlData = users.map(user => `
        <li>${user.first_name}</li>`).join('');
    res.send(htmlData);

})


app.post('/api/users/', (req, res)=>{
    // fs.readFile('mockData.json', 'utf-8', (error, data) => {
    //     if(error){
    //         console.error(error);
    //     }
    //     else{
    //         const users = JSON.parse(data);
    //         const len = users.length;
    //         const newUser = {
    //             id : len + 1,
    //             first_name : req.body.first_name,
    //             last_name : req.body.last_name,
    //             email : req.body.email,
    //             gender : req.body.gender
    //         }
    //         const newList = [...users, newUser];
    //         fs.writeFile('mockData.json', JSON.stringify(newList), (error) =>{
    //             if(error){
    //                 res.send('Error writing file');
    //             }
    //             else{
    //                 res.send('User added successfully');
    //             }
    //         })
    //     }
    // });
    const users = req.users;
    const len = users.length;
    const newUser = {
        id: len + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender
    }
    const newList = [...users, newUser];
    fs.writeFile('mockData.json', JSON.stringify(newList), (error) => {
        if (error) {
            res.send('Error writing file');
        }
        else {
            res.send('User added successfully');
        }
    })
})

app.route('/api/users/:id').get((req, res)=>{
    const user_id = req.params.id;
    // fs.readFile('mockData.json', 'utf-8', (error, data) => {
    //     if(error){
    //         res.send("Error fetching user");
    //     }
    //     else{
    //         const users = JSON.parse(data);
    //         const userData = users.find(user => user.id == user_id);
    //         res.send(userData);
    //     }
    // });
    const users = req.users;
    const userData = users.find(user => user.id == user_id);
    res.send(userData);
}).patch((req, res)=>{
    const user_id = req.params.id;
    // fs.readFile('mockData.json', 'utf-8', (error, data) => {
    //     if(error){
    //         res.send("Error updating user");
    //     }
    //     else{
    //         const users = JSON.parse(data);
    //         const updatedUser = users.find(user => user.id == user_id);
    //         console.log(updatedUser);
    //         console.log(req.body);
    //         updatedUser.first_name = req.body.first_name;
    //         updatedUser.last_name = req.body.last_name;
    //         updatedUser.email = req.body.email;
    //         updatedUser.gender = req.body.gender;
    //         fs.writeFile('mockData.json', JSON.stringify(users), (error) =>{
    //             if(error){
    //                 res.send('Error writing file');
    //             }
    //             else{
    //                 res.send('User updated successfully');
    //             }
    //         })
    //     }
    // });
    const users = req.users;
    const updatedUser = users.find(user => user.id == user_id);
    console.log(updatedUser);
    console.log(req.body);
    updatedUser.first_name = req.body.first_name;
    updatedUser.last_name = req.body.last_name;
    updatedUser.email = req.body.email;
    updatedUser.gender = req.body.gender;
    fs.writeFile('mockData.json', JSON.stringify(users), (error) => {
        if (error) {
            res.send('Error writing file');
        }
        else {
            res.send('User updated successfully');
        }
    })
}).delete((req, res) => {
    const user_id = req.params.id;
    // fs.readFile('mockData.json', 'utf-8', (error, data) => {
    //     if(error){
    //         res.send("Error deleting user");
    //     }
    //     else{
    //         const users = JSON.parse(data);
    //         const updatedList = users.filter(user => user.id != user_id);
    //         fs.writeFile('mockData.json', JSON.stringify(updatedList), (error) => {
    //             if(error){
    //                 res.send('Error while deleting user');
    //             }
    //             else{
    //                 res.send('User removed successfully');
    //             }
    //         })
    //     }
    // })
    const users = req.users;
    const updatedList = users.filter(user => user.id != user_id);
    fs.writeFile('mockData.json', JSON.stringify(updatedList), (error) => {
        if (error) {
            res.send('Error while deleting user');
        }
        else {
            res.send('User removed successfully');
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})