import makeRequest from './logic.js';



let saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', async ()=> {
    let nameInput = document.getElementById('nameInput').value;
    let descriptionInput = document.getElementById('colorInput').value;
    console.log(`Name: ${nameInput} Description: ${descriptionInput}`)
    let response = await makeRequest('http://localhost:3000/savePlanets', 'POST', {name: `${nameInput}`, description: `${descriptionInput}`});
    console.log(response)
})