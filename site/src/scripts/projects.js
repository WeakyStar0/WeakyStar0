/* src/scripts/projects.js */

const overlay = document.getElementById('project-overlay');
const closeBtn = document.getElementById('close-overlay');
const projectCards = document.querySelectorAll('.project-card');

const track = document.getElementById('carousel-track');
const dotsNav = document.getElementById('carousel-dots');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let currentSlide = 0;
let totalSlides = 0;

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // 1. Get Data
        const title = card.querySelector('h4').innerText;
        const desc = card.querySelector('p').innerText;
        const tech = card.querySelector('.project-tech').innerHTML;
        const images = card.getAttribute('data-images').split(',');

        // 2. Reset and Build Carousel
        currentSlide = 0;
        totalSlides = images.length;
        track.innerHTML = '';
        dotsNav.innerHTML = '';
        
        images.forEach((imgUrl, index) => {
            // Create Image
            const img = document.createElement('img');
            img.src = imgUrl;
            track.appendChild(img);
            
            // Create Dot
            const dot = document.createElement('div');
            dot.classList.add('c-dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            dotsNav.appendChild(dot);
        });

        // 3. Update Text Content
        document.getElementById('overlay-title').innerText = title;
        document.getElementById('overlay-desc').innerText = desc;
        document.getElementById('overlay-tech').innerHTML = tech;

        // 4. Show Overlay
        updateSlidePosition();
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('active'), 10);
        document.querySelector('.snap-container').style.overflowY = 'hidden';
    });
});

function moveToSlide(index) {
    currentSlide = index;
    updateSlidePosition();
}

function updateSlidePosition() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update Dots
    const dots = document.querySelectorAll('.c-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
});

// Close logic
function closeOverlay() {
    overlay.classList.remove('active');
    setTimeout(() => {
        overlay.classList.add('hidden');
        document.querySelector('.snap-container').style.overflowY = 'scroll';
    }, 300);
}

closeBtn.addEventListener('click', closeOverlay);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay(); });