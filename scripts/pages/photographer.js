//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographer(id) {
    try {
        // URL du fichier JSON
        const response = await fetch("../../data/photographers.json");
        if (!response.ok) {
            throw new Error('Failed to fecth data');
        }
        const data = await response.json();
        const photographer = data.photographers.find((photographer) =>{
            return photographer.id === id
        })
        // Afficher les données dans la console
        console.log(data);

        // Retourne le tableau des photographes une fois récupéré
        return photographer;
    } catch (error) {
        console.error('Error fetching photographers data', error);
    }
}

function photographerDetails(photographer) {
    console.log("Photographer object:", photographer)

    const { name, city, country, tagline, profilePic } = photographer
    console.log("Name:", name)
    console.log("City:", city)
    console.log("Country:", country)
    console.log("Tagline:", tagline)
    console.log("Profile Pic:", profilePic)

    document.getElementById('details').innerHTML +=  `
        <section class="photograph-details">
        <div class="photograph-detail">
            <h2 class="photograph-name">${name}</h2>
            <p class="photograph-location">${city}, ${country}</p>
            <p class="photograph-tagline">${tagline}</p>
        </div>
        <button class="button" id="contactBtn" aria-label="ouverture de la modal de contact">Contactez-moi</button>
        <img class="photograph-img" src="assets/photographers/${profilePic}" alt="Photo de ${name}">
        </section>
    `;
}

async function init() {
    let params = new URLSearchParams(document.location.search);
    let id = parseInt(params.get("id")) 
    console.log(id)
    // Récupère les datas des photographes
    const photographer = await getPhotographer(id);
    photographerDetails(photographer)
}
console.log("salut")

init();