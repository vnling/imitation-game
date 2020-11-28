const { HostedModel } = require("@runwayml/hosted-models");
const express = require("express");
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// make all the files in 'public' available
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));

// listen for requests :)
const listener = app.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

const model = new HostedModel({
    url: process.env.RUNWAYURL,
    token: process.env.RUNWAYTOKEN
});

app.post("/runwayml", async (request, response) => {
    console.log(request.body);

    const seed = Math.floor(Math.random() * 1000);
    const inputs = {
        "prompt": request.body.prompt,
        "max_characters": 400,
        "top_p": 0.5,
        "seed": seed
    };
    console.log("receiving inputs");
    model.query(inputs).then(outputs => {
        // const { generated_text, encountered_end } = outputs;
        // use the outputs in your project
        console.log("sending outputs");
        response.json(outputs);
    });
    // const outputs = await model.query(inputs);

});