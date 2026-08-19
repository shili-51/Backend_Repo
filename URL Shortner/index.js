const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect")
const PORT = 8001;


connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB connected successfully!")).catch((error) => { console.error("Unable to connect to DB") });

app.use(express.json());
app.use('/url', urlRoute);

app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);

})
