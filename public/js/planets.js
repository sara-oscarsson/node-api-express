import makeRequest from './logic.js';


let showBtn = document.getElementById('showBtn');
showBtn.addEventListener('click', async ()=> {
    let response = await makeRequest('http://localhost:3000/showPlanets', 'GET');
    console.log(response)
})