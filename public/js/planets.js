import makeRequest from './logic.js';


let showBtn = document.getElementById('showBtn');
showBtn.addEventListener('click', showPlanets);



async function showPlanets() {
    let mainDiv = document.getElementById('demo');
    mainDiv.innerHTML = '';
    let response = await makeRequest('http://localhost:3000/showPlanets', 'GET');
    console.log(response)
    let arrayNumber = 0;
    response.map(i=> {
        let planetNumber = arrayNumber++;
        
        let title = document.createElement('h2');
        title.innerText = i.name;
        
        let description = document.createElement('p');
        description.innerText = i.description;

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete this planet'
        deleteBtn.addEventListener('click', async ()=> {
            console.log(`Delete planet number ${planetNumber}`);
            let response = await makeRequest('http://localhost:3000/planets/delete', "DELETE", { index: planetNumber });
            console.log(response);
            showPlanets();

        })

        mainDiv.append(title, description, deleteBtn);
    })
}