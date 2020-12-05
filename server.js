const { HostedModel } = require("@runwayml/hosted-models");
const express = require("express");
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const filename = ('data/Sci-Fi/scifi.txt');
let lines = [];

// make all the files in 'public' available
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));

// listen for requests :)
const listener = app.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

//model gets information from .env file
const model = new HostedModel({
    url: process.env.RUNWAYURL,
    token: process.env.RUNWAYTOKEN
});

//read the scifi file so we can sample text from it
fs.readFile(filename, "utf-8", function(err, data){
    if(err) throw err;
    lines = data.replace(/\n$/, '').split('\n');
 })

 //get a random line from the file, assign to actualText
function getRandomLine() {
    let firstLine = lines[Math.floor(Math.random()*lines.length)];
    let actualText = firstLine;
    let counter = 0;
    let i = Math.floor(Math.random()*lines.length + 1);
    //while the text is shorter than 300 chars, keep adding to the text
    while (actualText.length < 300) {
        let tempStr = lines[i + counter];
        counter++;
        actualText = actualText.concat(tempStr);
    }
    //return the firstline of the sample as prompt for ML models
    //return the full text as human sample
    return [firstLine, actualText];
}

//sends request to runway model
//taken from runway-ml-template glitch app
app.post("/runwayml", async (request, response) => {
    console.log(request.body);

    const seed = Math.floor(Math.random() * 1000);
    const inputs = {
        "prompt": request.body.prompt,
        "max_characters": 300,
        "top_p": 0.5,
        "seed": seed
    };
    console.log("receiving inputs");
    model.query(inputs).then(outputs => {
        console.log("sending outputs");
        response.json(outputs);
    });

});

//returns the random line of scifi when requested by script.js
app.get("/scifi-random", async (request, response) => {
    let reply = {
        message: getRandomLine(),
    }
    response.json(reply); 
});