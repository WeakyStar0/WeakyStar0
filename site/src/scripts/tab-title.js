// src/scripts/tab-title.js

const originalTitle = "Weaky";
let index = originalTitle.length;
let isRemoving = true;
let delay = 300; 

function animateTitle() {
    // 1. Update the title
    document.title = originalTitle.substring(0, index);

    // 2. Logic to change the index
    if (isRemoving) {
        index--;
        
        // FIX: Stop at 1 instead of 0
        // This ensures the "W" stays visible so the URL doesn't pop up
        if (index <= 1) {
            isRemoving = false;
        }
    } else {
        index++;
        
        // If we reach the full name, start removing again
        if (index >= originalTitle.length) {
            isRemoving = true;
        }
    }
}

setInterval(animateTitle, delay);