export default async function makeRequest(url, method, body) {
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