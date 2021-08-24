import makeRequest from './logic.js';



let saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', async ()=> {
    let nameInput = document.getElementById('nameInput').value;
    let colorInput = document.getElementById('colorInput').value;
    console.log(`Name: ${nameInput} Color: ${colorInput}`)
    let response = await makeRequest('http://localhost:3000/savePlanets', 'POST', {name: `${nameInput}`, color: `${colorInput}`});
    console.log(response)
})