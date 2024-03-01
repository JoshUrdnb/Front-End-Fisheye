//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographer(id) {
    try {
        // URL du fichier JSON
        const response = await fetch("../../data/photographers.json");
        if (!response.ok) {
            throw new Error('Failed to fecth data');
        }
        const data = await response.json();
        const photographer = data.photographers.find((photographer) => {
            return photographer.id === id;
        });

        // les médias en fonction de l'ID du photographe
        photographer.media = data.media.filter((media) => {
            return media.photographerId === id;
        });

        // les données dans la console
        console.log(data);

        // tableau des photographes une fois récupéré
        return photographer;
    } catch (error) {
        console.error('Error fetching photographers data', error);
    }
}

function photographerDetails(photographer) {
    console.log("Photographer object:", photographer)

    const { name, city, country, tagline, profilePic } = photographer;

    // détails du photographe
    const photographerDetailsHTML = `
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

    // médias du photographe
    const mediaDetailsHTML = photographer.media.map((media) => {
        return `
            <div class="media-item">
                <img src="assets/media/${media.image || media.video}" alt="${media.title}">
                <p>Title: ${media.title}</p>
                <p>Type: ${media.video ? 'Video' : 'Image'}</p>
                <p>Likes: ${media.likes}</p>
                <p>Date: ${media.date}</p>
                <p>Price: ${media.price}</p>
            </div>
        `;
    }).join('');

    // détails dans la vue HTML
    document.getElementById('details').innerHTML = photographerDetailsHTML + `<div class="media-container">${mediaDetailsHTML}</div>`;
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
