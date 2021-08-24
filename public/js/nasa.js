let marsBtn = document.getElementById('mars');
marsBtn.addEventListener('click', connectNasa('mars'));


async function connectNasa(planet) {
    console.log(`Hello from ${planet}`)
}