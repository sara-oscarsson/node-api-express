let sunBtn = document.getElementById('sun');
let mercuryBtn = document.getElementById('mercury');
let venusBtn = document.getElementById('venus');
let earthBtn = document.getElementById('earth');
let marsBtn = document.getElementById('mars');
let jupiterBtn = document.getElementById('jupiter');
let saturnBtn = document.getElementById('saturn');
let uranusBtn = document.getElementById('uranus');
let neptuneBtn = document.getElementById('neptune');
let plutoBtn = document.getElementById('pluto');

sunBtn.addEventListener('click', ()=> {
    connectNasa('sun')
});
mercuryBtn.addEventListener('click', ()=> {
    connectNasa('planet mercury')
});
venusBtn.addEventListener('click', ()=> {
    connectNasa('planet venus')
});
earthBtn.addEventListener('click', ()=> {
    connectNasa('earth')
});
marsBtn.addEventListener('click', ()=> {
    connectNasa('planet mars')
});
jupiterBtn.addEventListener('click', ()=> {
    connectNasa('jupiter')
});
saturnBtn.addEventListener('click', ()=> {
    connectNasa('saturn')
});
uranusBtn.addEventListener('click', ()=> {
    connectNasa('uranus')
});
neptuneBtn.addEventListener('click', ()=> {
    connectNasa('neptune')
});
plutoBtn.addEventListener('click', ()=> {
    connectNasa('planet pluto')
});

async function connectNasa(planet) {
    let mainDiv = document.getElementById('demo');
    mainDiv.innerHTML = '';

    let response = await fetch(`https://images-api.nasa.gov/search?q=${planet}&media_type=image`);
    let result = await response.json();
    
    let listOfImages = result.collection.items
    let shortListOfImages = listOfImages.slice(0, 8);

    console.log(shortListOfImages)

    shortListOfImages.map(i => {
        console.log(i.links[0].href)
        /* create img wrapper */
        let imgWrapper = document.createElement('div');
        imgWrapper.classList.add('imgWrapper');

        /* create img */
        let image = document.createElement('img');
        image.src = i.links[0].href;

        /* append */
        imgWrapper.appendChild(image)
        mainDiv.appendChild(imgWrapper)
    })
}

