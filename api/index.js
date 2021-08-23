const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');


app.use(express.json());
app.use(express.static('../public'));

app.get('/showPlanets', (req, res)=> {
    /* res.json('Här är alla planeter!') */
    let raw = fs.readFileSync('planets.json');
    let planets = JSON.parse(raw);
    res.json(planets);
})

app.post('/savePlanets', (req, res)=> {
    let raw = fs.readFileSync('planets.json');
    let planets = JSON.parse(raw);
    console.log(planets);
    planets.push(req.body)
    fs.writeFileSync('planets.json', JSON.stringify(planets));
    res.json(planets);
})


app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})