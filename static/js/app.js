//alert('it works');
document.getElementById('cars').addEventListener('click', (ev) => {
    
    if(ev.target.classList.contains('more')) {
        //console.log(ev.target);
        const btn = ev.target;
        const desc = ev.target.parentElement.querySelector('.description');
        if(desc.style.display == 'block') {
            desc.style.display = 'none';
            ev.target.textContent =
             'Show More';
        } else {
            desc.style.display = 'block';
            ev.target.textContent = 'Hide It'
        }
    }
});