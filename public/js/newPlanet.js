import makeRequest from './logic.js';



let saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', async ()=> {
    let response = await makeRequest('http://localhost:3000/savePlanets', 'POST', {name: "Mars", color: "red"});
    console.log(response)
})