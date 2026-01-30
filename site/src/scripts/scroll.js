// src/scripts/scroll.js

const container = document.querySelector('.snap-container');
const sections = document.querySelectorAll('.screen-section');
const dots = document.querySelectorAll('.dot');
const backToTopBtn = document.getElementById('back-to-top');


// Only run if the container exists on the page
if (container) {
    let currentIndex = 0;
    let isScrolling = false;

    // Helper: Update the view (Scroll + Dots)
    const updateView = (index = 0) => {
        if (sections[index]) {
            sections[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update Dots
            dots.forEach(d => d.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }
    };

    // --- 1. MOUSE WHEEL LOGIC ---
    container.addEventListener('wheel', (event) => {
        // Ensure this is a wheel event before checking properties
        if (event instanceof WheelEvent) {
            event.preventDefault(); // Stop default browser scroll

            if (isScrolling) return; // Cooldown check

            const direction = event.deltaY > 0 ? 1 : -1;
            const nextIndex = Math.min(
                Math.max(currentIndex + direction, 0),
                sections.length - 1
            );

            // If nowhere to go, stop
            if (nextIndex === currentIndex) return;

            // Execute Move
            isScrolling = true;
            currentIndex = nextIndex;
            updateView(currentIndex);

            // Cooldown reset
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }, { passive: false });

    // --- 2. CLICK DOT LOGIC ---
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            if (isScrolling) return;

            const indexStr = dot.getAttribute('data-index');
            if (!indexStr) return;

            const targetIndex = parseInt(indexStr);

            if (targetIndex !== currentIndex) {
                isScrolling = true;
                currentIndex = targetIndex;
                updateView(currentIndex);

                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            if (isScrolling) return;

            isScrolling = true;
            currentIndex = 0;
            updateView(currentIndex);

            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        });
    }
}