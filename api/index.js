const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const { exit, nextTick } = require('process');


app.use(express.json());
app.use(express.static('../public'));

/* Hämtar alla planeter från planets.json */
app.get('/showPlanets', (req, res)=> {
    let raw = fs.readFileSync('planets.json');
    let planets = JSON.parse(raw);
    res.json(planets);
})

/* Hämtar en specifik planet från planets.json */
app.get('/specific/:name', (req, res)=> {
    try{
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);
        planets.forEach(planet => {
            if(planet.name === req.params.name){
                console.log(planet);
                return res.json(planet);
            }
        })
        res.json('No planet with that name exists..');
        
    }catch (error){
        console.log('No planet with that name exists..' + error);
        
    }
})

/* Sparar en ny planet i planets.json */
app.post('/savePlanets', (req, res)=> {
    let raw = fs.readFileSync('planets.json');
    let planets = JSON.parse(raw);
    console.log(planets);
    planets.push(req.body)
    fs.writeFileSync('planets.json', JSON.stringify(planets));
    res.json(planets);
})

/* Raderar en planet, styrs av index i listan */
app.delete('/planets/delete', (req, res)=> {
    let raw = fs.readFileSync('planets.json');
    let planets = JSON.parse(raw);
    planets.splice(req.body.index, 1);
    /* res.json(planets[req.body.index]); */
    fs.writeFileSync('planets.json', JSON.stringify(planets));
    res.json('deleted')
    console.log('deleting')
})

/* Uppdaterar en planet */
app.put('/change/:name', (req, res)=> {
    try{
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);
        planets.forEach( function (planet, i) {
            /* console.log(`This planet is ${planet.name} and index is ${i}`); */

            /* Hämtar ut planeten och dess index mha namnet och en forEach */
            if(planet.name === req.params.name){
                planets.splice(i, 1);
                planets.push(req.body)
                fs.writeFileSync('planets.json', JSON.stringify(planets));
                return res.json('Update success!');
            }
        })
        res.json('No planet with that name exists..');
        
    }catch (error){
        console.log('No planet with that name exists..' + error);
        
    }
})

/* Lyssnar på port 3000 */
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})