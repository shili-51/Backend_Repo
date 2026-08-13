// const {sum, diff} = require("./operations.js");
const fs = require("fs");

// console.log(sum(2,2));
// console.log(diff(2,2));

// Synchronous Reads/writes ----------------------------------------------------------------

// const data = fs.readFileSync("shilpy.txt", "utf-8");
// console.log(data);

// fs.writeFileSync("shilpy.txt", "helloworld");
// fs.writeFileSync("shilpy.txt", "I am learning Node JS");


// fs.appendFileSync("shilpy.txt", "helloworld\n");
// fs.appendFileSync("shilpy.txt", "I am learning Node JS\n");


// Asynchronous Reads/writes ----------------------------------------------------------------

fs.readFile("shilpy.txt", "utf-8", (err, data) =>{
    if(err){
        console.error(err);
        return;
    }
    console.log(data);
});


// fs.writeFile("shilpy.txt", "helloworld\n", (err) =>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log("File written successfully");
// });

// fs.appendFile("shilpy.txt", "helloworld2\n", (err) =>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log("File written successfully");
// });
