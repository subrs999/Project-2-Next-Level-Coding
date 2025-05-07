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
    const countries = ['Israel', 'Palestine', 'Saudi', 'Iran'];

    container.innerHTML = '';

    for (let i = 0; i < numBoxes; i++) {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];

        // Create USA background span
        const usa = document.createElement('span');
        usa.classList.add('usa');
        usa.textContent = `${getRandomWord(usaText)}`;

        // Create the box
        const box = document.createElement('div');
        box.classList.add('Box', randomCountry);

        // Place both at the same position
        const wrapper = document.createElement('div');
        wrapper.classList.add('box-wrapper');
        wrapper.appendChild(usa);
        wrapper.appendChild(box);

        container.appendChild(wrapper);

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
    box.style.zIndex = `${Math.floor(Math.random() * 3)}`;
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
    const usas = document.querySelectorAll('.usa');

    boxes.forEach(box => {
        const rect = box.getBoundingClientRect();
        const boxCenterX = rect.left + rect.width / 2;
        const boxCenterY = rect.top + rect.height / 2;
        
        const distance = getDistance(mouseX, mouseY, boxCenterX, boxCenterY);

        // Calculate scale based on distance (closer = smaller)
        // Min scale = 0.5, Max scale = 1
        const maxDistance = 1300/2.5; // Maximum distance for full scale
        const minScale = 0;
        const maxScale = 1.5;
        
        // Scale formula: Closer = Smaller
        let scale = maxScale - ((maxScale - minScale) * (1 - Math.min(distance / maxDistance, 1)));

        box.style.transform = `scale(${scale})`;

        if (distance < 400/2.5) {
            box.style.transform = 'scale(0.0)';
        }
    });

    usas.forEach(usa => {
        const rect = usa.getBoundingClientRect();
        const boxCenterX = rect.left + rect.width / 2;
        const boxCenterY = rect.top + rect.height / 2;  
        
        const distance = getDistance(mouseX, mouseY, boxCenterX, boxCenterY);

        usa.style.transform = `scale(0.0) translate(-50%, -50%)`;

        if (distance < 400/2.5) {
            usa.style.transform = 'scale(1.0) translate(-50%, -50%)';
        }
    });

}

// Event listener for mouse movemen
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    updateBoxScales(mouseX, mouseY);
});