/* src/scripts/projects.js */

const overlay = document.getElementById('project-overlay');
const closeBtn = document.getElementById('close-overlay');
const projectCards = document.querySelectorAll('.project-card');

const overlayTitle = document.getElementById('overlay-title');
const overlayImg = document.getElementById('overlay-img');
const overlayDesc = document.getElementById('overlay-desc');
const overlayTech = document.getElementById('overlay-tech');

// To store the state of the main scroll
let scrollContainer = document.querySelector('.snap-container');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // 1. Extract data from card
        const title = card.querySelector('h4').innerText;
        const desc = card.querySelector('p').innerText;
        const img = card.querySelector('img').src;
        const tech = card.querySelector('.project-tech').innerHTML;

        // 2. Inject into overlay
        overlayTitle.innerText = title;
        overlayImg.src = img;
        overlayDesc.innerText = desc + ". This is an expanded description of the project, detailing the challenges faced and the technical solutions implemented during development.";
        overlayTech.innerHTML = tech;

        // 3. Show Overlay
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('active'), 10);
        
        // 4. Disable main page interaction
        if (scrollContainer) scrollContainer.style.overflowY = 'hidden';
    });
});

function closeOverlay() {
    overlay.classList.remove('active');
    setTimeout(() => {
        overlay.classList.add('hidden');
        if (scrollContainer) scrollContainer.style.overflowY = 'scroll';
    }, 300);
}

closeBtn.addEventListener('click', closeOverlay);

// Close on clicking outside the content box
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
});