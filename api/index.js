const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const { exit } = require('process');


/* Middleware som konverterar alla anrop till json oberoende på path och method */
app.use(express.json());
/* Middleware som tar fram en statisk fil, (index.html i public mappen) */
app.use(express.static('../public'));

/* Hämtar alla planeter från planets.json */
app.get('/showPlanets', (req, res, next)=> {
    try {
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);
        res.json(planets);
    } catch(err) {
        next(err);
    }
})

/* Hämtar en specifik planet med hjälp av namn (sök funktion på sidan) */
app.get('/specific/:name', (req, res, next)=> {
    try{
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);
        /* Om planeten finns i listan fastnar den i find nedan och foundPlanet blir till true
        annars undefined */
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

/* Denna funktionen genererar en random sträng som id */
function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/* Sparar en ny planet i planets.json */
app.post('/savePlanets', (req, res, next)=> {
    try {
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);

        /* Här genereras ett id till planeten */
        req.body.id = generateID();
    
        planets.push(req.body)
        fs.writeFileSync('planets.json', JSON.stringify(planets));
        res.json('Planet was saved!');
        return;
    } catch(err) {
        next(err);
    }

})

/* Raderar en planet, styrs av id */
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

/* Uppdaterar en planet */
app.put('/change/:id', (req, res, next)=> {
    try{
        let raw = fs.readFileSync('planets.json');
        let planets = JSON.parse(raw);

        /* Hämtar ut planeten och dess index mha id och en forEach */
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

/* Error hantering */
app.use((err, req, res)=> {
    console.error(err.stack);
    res.status(500).send('Oh no...');
})

/* Lyssnar på port 3000 */
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})