// Sample arrays for each country
const israelText = ["מְדִינִיוּת", "אֶרֶץ", "הֶבדֵל", "בִּטָחוֹן", "השמצות", "שקרים", "פְּרָאִי", "רוצחים", "תוֹקפָּנוּת", "זוועות"];
const palestineText = ["لنا", "المحتل", "الإبادة الجماعية", "الأنقاض", "الشهداء", "مصاب", "نازح", "يكذب", "حماية", "يتعرف على"];
const saudiText = ["متطرف", "صدمة", "أرض", "عدوان", "الهجمات", "لا يتزعزع", "مستقل", "لا يكل", "صريح", "ظروف"];
const iranText = ["خونریزی", "جنگ ها", "متجاوزان", "نقض شده است", "نادیده گرفته شد", "تبعیض", "نابرابری", "چشم پوشیدن", "طمع", "فقر"];
const usaText = ["diplomacy", "ceasefire", "plan", "innocent", "supportive", "humanitarian", "aid", "security", "negotiations", "mediate"];

// Color schemes for each country
const israelColor = ["#0038b8", "#FFFFFF", "#2A82D7"];
const palestineColor = ["#EE2A35", "#000000", "#FFFFFF", "#009736"];
const saudiColor = ["#005430", "#FFFFFF", "#239F40"];
const iranColor = ["#239F40", "#FFFFFF", "#DA0000"];

var prevEvent, currentEvent;
document.documentElement.onmousemove = function(event){
    currentEvent=event;
}

setInterval(function(){
    if(prevEvent && currentEvent) {
        var movementX = Math.abs(currentEvent.screenX-prevEvent.screenX);
        var movementY = Math.abs(currentEvent.screenY-prevEvent.screenY);
        var movement = Math.sqrt((movementX*movementX) + (movementY*movementY));
        
        var speed = 10*movement;

        if (speed>350) {
            document.getElementById('usa').style.transform = 'scale(0)'
            document.getElementById('usa').style.opacity = '0';
        }
        else{
            document.getElementById('usa').style.transform = 'scale(1)';
            document.getElementById('usa').style.opacity = '1';
        }
    }

    prevEvent=currentEvent;
}, 100);

// Function to get a random word from an array
function getRandomWord(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// Function to get 3 different random colors from an array
function getRandomColors(arr) {
    let colors = [];
    
    // Ensure we get three unique colors
    while (colors.length < 3) {
        const randomColor = arr[Math.floor(Math.random() * arr.length)];
        if (!colors.includes(randomColor)) {
            colors.push(randomColor);
        }
    }

    return colors;
}

// Function to create a random number of boxes in the container
function generateBoxes(numBoxes) {
    const container = document.querySelector('.container');
    const countries = ['Israel', 'Palestine', 'Saudi', 'Iran']; // Array of possible country classes

    // Clear any existing content in the container
    container.innerHTML = '';

    // Loop to create the desired number of boxes
    for (let i = 0; i < numBoxes; i++) {
        // Create a new div with a random country class
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const box = document.createElement('div');
        box.classList.add('Box', randomCountry);

        // Append the box to the container
        container.appendChild(box);

        // Update the content and styles of the box
        updateBoxContentForCountry(box, randomCountry);
    }
}

// Function to update the content and styles of each box based on its country class
function updateBoxContentForCountry(box, country) {
    let randomText = '';
    let randomColors = [];
    
    // Select the appropriate country-specific text and colors
    if (country === 'Israel') {
        randomText = getRandomWord(israelText);
        randomColors = getRandomColors(israelColor);
    } else if (country === 'Palestine') {
        randomText = getRandomWord(palestineText);
        randomColors = getRandomColors(palestineColor);
    } else if (country === 'Saudi') {
        randomText = getRandomWord(saudiText);
        randomColors = getRandomColors(saudiColor);
    } else if (country === 'Iran') {
        randomText = getRandomWord(iranText);
        randomColors = getRandomColors(iranColor);
    }

    // Update the content of the box
    box.innerHTML = `<h1>${randomText}</h1>`;
    box.style.backgroundColor = randomColors[0]; // Set random background color
    box.style.color = randomColors[1]; // Set random text color
    box.style.webkitTextStroke = `0px ${randomColors[2]}`; // Set random text stroke color
    box.style.textShadow = `0px 1px 0px ${randomColors[2]}, 0px 2px 0px ${randomColors[2]}, 0px 3px 0px ${randomColors[2]}, 0px 4px 0px ${randomColors[2]}, 0px 5px 0px ${randomColors[2]}, 0px 6px 0px ${randomColors[2]}`; // Set text shadow
}

// Call the function to generate a certain number of boxes (e.g., 10)
window.onload = function() {
    generateBoxes(340); // Generate 10 boxes on page load
};

// Function to calculate distance between mouse and element
function getDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Function to update the scale of boxes based on mouse distance
function updateBoxScales(mouseX, mouseY) {
    const boxes = document.querySelectorAll('.Box');
    boxes.forEach(box => {
        const rect = box.getBoundingClientRect();
        const boxCenterX = rect.left + rect.width / 2;
        const boxCenterY = rect.top + rect.height / 2;
        
        const distance = getDistance(mouseX, mouseY, boxCenterX, boxCenterY);

        // Calculate scale based on distance (closer = smaller)
        // Min scale = 0.5, Max scale = 1
        const maxDistance = 1000; // Maximum distance for full scale
        const minScale = 0;
        const maxScale = 1.25;
        
        // Scale formula: Closer = Smaller
        let scale = maxScale - ((maxScale - minScale) * (1 - Math.min(distance / maxDistance, 1)));

        box.style.transform = `scale(${scale})`;

        if (distance < 300) {
            box.style.transform = 'scale(0.0)';
        }
    });
}

// Event listener for mouse movement
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    updateBoxScales(mouseX, mouseY);
});

// Get the element with id 'usa'
let cursor = document.getElementById('usa');

// Listen for mouse movement events
document.addEventListener('mousemove', (event) => {
    // Get the mouse coordinates (relative to the viewport)
    const mouseX = event.clientX + window.scrollX; // Add scrollX to account for horizontal scroll
    const mouseY = event.clientY + window.scrollY; // Add scrollY to account for vertical scroll

    // Update the position of the 'usa' element
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    // Get the dimensions of the #usa element
    const usaElement = document.getElementById('usa');
    const usaWidth = usaElement.offsetWidth;
    const usaHeight = usaElement.offsetHeight;

    // Update the position of the 'usa' element
    usaElement.style.left = `${mouseX - usaWidth / 2}px`; // Subtract half the width
    usaElement.style.top = `${mouseY - usaHeight / 2}px`; // Subtract half the height
});