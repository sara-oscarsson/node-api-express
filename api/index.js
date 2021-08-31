const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const { exit } = require('process');


/* Middleware that converts all requests into json, regardless of method or path */
app.use(express.json());
/* This middleware serves static files */
app.use(express.static('../public'));

/* This endpoint shows all planets in the json file */
app.get('/showPlanets', (req, res, next)=> {
    try {
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);
        res.json(planets);
    } catch(err) {
        next(err);
    }
})

/* Endpoint that retrieves a specific object from the json file */
app.get('/specific/:name', (req, res, next)=> {
    try{
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);
        let planetFound = planets.find(planet => {
            return planet.name === req.params.name;
        })
        if(planetFound){
            res.json(planetFound);
            return;
        }
        res.send('No planet exist with that name!');
        
    } catch (err){
        next(err);       
    }
})

/* This function generates a random id for every planet */
function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/* POST endpoint where you can save a new planet */
app.post('/savePlanets', (req, res, next)=> {
    try {
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);

        req.body.id = generateID();
    
        planets.push(req.body)
        fs.writeFileSync('planets.json', JSON.stringify(planets));
        res.json('Planet was saved!');
        return;
    } catch(err) {
        next(err);
    }

})

/* DELETE endpoint, send in id */
app.delete('/planets/delete/:id', (req, res, next)=> {
    try {
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);

        let foundPlanet;
        planets.forEach( function (planet, i) {
            if(planet.id === req.params.id){
                foundPlanet = true;
                planets.splice(i, 1);
            }
        })
        if(foundPlanet) {
            fs.writeFileSync('planets.json', JSON.stringify(planets));
            res.json('Deleted');
            return;
        }
        res.json('No planet with this id was found...');
        return;
    } catch(err) {
        next(err);
    }    
})

/* Here you can UPDATE a planet in the list */
app.put('/change/:id', (req, res, next)=> {
    try{
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);

 /* Searching for planet with the right id */       
        let foundPlanet;
        planets.forEach( function (planet, i) {
            if(planet.id === req.params.id){
                foundPlanet = true;
                planet.name = req.body.name;
                planet.description = req.body.description;
                fs.writeFileSync('planets.json', JSON.stringify(planets));
            }
        })
        if(foundPlanet){
            res.json('Planet was successfully updated!');
            return;
        }
        res.json('No planet with that name exists..');   
    } catch (err){
        next(err);   
    }
})

/* Error handling */
app.use((err, req, res)=> {
    console.error(err.stack);
    res.status(500).send('Oh no...');
})

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})