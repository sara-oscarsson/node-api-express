import makeRequest from './logic.js';

let showBtn = document.getElementById('showBtn');
showBtn.addEventListener('click', showPlanets);

async function showPlanets() {
    let mainDiv = document.getElementById('demo');
    mainDiv.innerHTML = '';
    let response = await makeRequest('http://localhost:3000/showPlanets', 'GET');
    console.log(response)
    if(response.length == 0){
        mainDiv.innerHTML = 'No planets...';
        mainDiv.style.marginTop = '15px';
        return
    }
    showBtn.style.display = 'none';

    response.map(i=> {
        let planetBorder = document.createElement('div');
        planetBorder.classList.add('planetBorder');

        console.log(`Id planet has is ${i.id}`);
        
        let title = document.createElement('h2');
        title.innerText = i.name;
        title.classList.add('planetAnimation');
        
        let description = document.createElement('div');
        description.innerText = i.description;
        description.classList.add('planetAnimation');

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete this planet'
        deleteBtn.classList.add('planetAnimation');
        deleteBtn.addEventListener('click', async ()=> {
            let response = await makeRequest(`http://localhost:3000/planets/delete/${i.id}`, "DELETE");
            console.log(response);
            showPlanets();
        })
        planetBorder.append(title, description, deleteBtn);
        mainDiv.append(planetBorder)
    })
}