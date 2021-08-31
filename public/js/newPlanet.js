import makeRequest from './logic.js';

let saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', async ()=> {
    let nameInput = document.getElementById('nameInput').value;
    let descriptionInput = document.getElementById('colorInput').value;
    let response = await makeRequest('http://localhost:3000/savePlanets', 'POST', {name: `${nameInput}`, description: `${descriptionInput}`});
    console.log(response);
    document.getElementById('nameInput').value = '';
    document.getElementById('colorInput').value = '';
});

let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', async ()=> {
    let searchName = document.getElementById('searchName').value;
    if (searchName == '') {
        return;
    }
    let response = await makeRequest(`http://localhost:3000/specific/${searchName}`, 'GET');
    console.log(response);
    document.getElementById('searchName').value = '';
    showPlanetToUpdate(response);
});

async function showPlanetToUpdate(planet) {
    let updateWrapper = document.getElementById('updateWrapper');
    updateWrapper.innerHTML = '';
    let planetId = planet.id;
    if(planet == 'No planet with that name exists..') {
        updateWrapper.innerText = planet;
    } else {
        let name = document.createElement('input');
        name.value = planet.name;
    
        let description = document.createElement('textarea');
        description.value = planet.description;
    
        let changeBtn = document.createElement('button');
        changeBtn.innerText = 'Save Changes';
        changeBtn.addEventListener('click', async ()=> {
            let response = await makeRequest(`http://localhost:3000/change/${planetId}`, 'PUT', { name: name.value, description: description.value });
            console.log(response);
            updateWrapper.innerHTML = '';
        })
        updateWrapper.append(name, description, changeBtn);
    }
};