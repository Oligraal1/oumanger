async function handleSubmit() {
    // Charger les données du fichier JSON
    const response = await fetch('choices.json');
    const restaurants = await response.json();
    
    // Extraire les styles uniques des restaurants
    const styles = new Set(restaurants.map(restaurant => restaurant.style));
    
    // Mettre à jour les options dans la balise select
    const selectElement = document.getElementById('style');
    const noneOption = document.createElement('option');
    noneOption.value = "none";
    noneOption.textContent = "Aucune idée";
    selectElement.appendChild(noneOption);
    styles.forEach(style => {
        const option = document.createElement('option');
        option.value = style;
        option.textContent = style;
        selectElement.appendChild(option);
    });
}

function displayResult(selectedRestaurant) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = "<p>Aujourd'hui, vous mangerez <span>"+ selectedRestaurant.style +"</span> chez : <span>" + selectedRestaurant.nom + "</span> que vous trouverez au niveau " + selectedRestaurant.niveau +" du centre commercial Westfield La Défense.</p>";
}


document.getElementById('choice-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const style = document.getElementById('style').value;
    const response = await fetch('choices.json');
    const restaurants = await response.json();
    
    if(style === "none") {
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        const selectedRestaurant = restaurants[randomIndex];
        displayResult(selectedRestaurant);
    } else {
        const restaurantsByStyle = restaurants.filter(restaurant => restaurant.style === style);
 
    if (restaurantsByStyle.length > 0) {
        const randomIndex = Math.floor(Math.random() * restaurantsByStyle.length);
        const selectedRestaurant = restaurantsByStyle[randomIndex];
        displayResult(selectedRestaurant);
    } else {
        displayResult('Aucun restaurant trouvé pour ce style.');
    }
    }
    
});

function processData(csvData) {
    const lines = csvData.split('\n');
    const restaurants = [];
    for (let i = 1; i < lines.length; i++) { // Commence à 1 pour ignorer l'en-tête
        const columns = lines[i].split(',');
        if (columns.length >= 2) { // Vérifier si la ligne a au moins 2 colonnes
            const nom = columns[0].trim();
            const style = columns[1].trim();
            const zone = columns[2].trim();
            restaurants.push({ nom, style, zone });
        }
    }
    return restaurants;
}

function findDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const min = date.getMinutes();
    
    const dateElement = document.getElementById('date');
    dateElement.innerHTML = '<p>Bonjour, nous sommes le '+day+"/"+month+"/"+year +". Il est "+ hour+":"+min+".</p>"
}

document.addEventListener('DOMContentLoaded', function() {
    handleSubmit();
    findDate();
});