console.log("Halloj!")

let showBtn = document.getElementById('showBtn');
showBtn.addEventListener('click', async ()=> {
    let response = await makeRequest('http://localhost:3000/showPlanets', 'GET');
    console.log(response)
})

let saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', async ()=> {
    let response = await makeRequest('http://localhost:3000/savePlanets', 'POST', {name: "Mars", color: "red"});
    console.log(response)
})







async function makeRequest(url, method, body) {
    try{
        let response = await fetch(url, 
            {
                headers: {"Content-Type": "application/json"},
                method,
                body: JSON.stringify(body)
            });
        let result = await response.json();
        return result;
    } catch(error){
        console.log(error)
    }
}