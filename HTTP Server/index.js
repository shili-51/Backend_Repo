const http = require("http");
const fs = require("fs");


const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} Request received\n`;
    fs.appendFile("shilpy.txt", log, (err, data) => {
        switch(req.url){
            case "/":
                res.end("Home");
                break;
            case "/contacts":
                res.end("contacts");
                break;  
        }

        console.log("data sent!");
        // res.end("Hello"); // No more data sent to client by server
    })
})

myServer.listen(8000, () => { 
    console.log("server started");
})
