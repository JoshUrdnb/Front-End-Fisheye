async function getPhotographer(id) {
    try {
        const response = await fetch("../../data/photographers.json");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const photographer = data.photographers.find((photographer) => {
            return photographer.id === id;
        });

        photographer.media = data.media.filter((media) => {
            return media.photographerId === id;
        });

        console.log(data);

        return photographer;
    } catch (error) {
        console.error('Error fetching photographers data', error);
    }
}

function photographerDetails(photographer) {
    const { id, name, city, country, tagline, portrait } = photographer;

    const photographerSection = document.createElement('section');
    photographerSection.className = 'photograph-details';

    const detailDiv = document.createElement('div');
    detailDiv.className = 'photograph-detail';

    const nameHeading = document.createElement('h2');
    nameHeading.className = 'photograph-name';
    nameHeading.textContent = name;

    const locationParagraph = document.createElement('p');
    locationParagraph.className = 'photograph-location';
    locationParagraph.textContent = `${city}, ${country}`;

    const taglineParagraph = document.createElement('p');
    taglineParagraph.className = 'photograph-tagline';
    taglineParagraph.textContent = tagline;

    detailDiv.appendChild(nameHeading);
    detailDiv.appendChild(locationParagraph);
    detailDiv.appendChild(taglineParagraph);

    const contactButton = document.createElement('button');
    contactButton.className = 'contact_button';
    contactButton.id = 'contactBtn';
    contactButton.setAttribute('aria-label', 'ouverture de la modal de contact');
    contactButton.textContent = 'Contactez-moi';

    const imgElement = document.createElement('img');
    imgElement.className = 'photograph-img';
    imgElement.src = `assets/photographers/${portrait}`;
    imgElement.alt = `Photo de ${name}`;

    photographerSection.appendChild(detailDiv);
    photographerSection.appendChild(contactButton);
    photographerSection.appendChild(imgElement);

    const mediaContainerDiv = document.createElement('div');
    mediaContainerDiv.className = 'media-container';

    photographer.media.forEach((media) => {
        const mediaItemDiv = document.createElement('div');
        mediaItemDiv.className = 'media-item';
    
        if (media.image) {
            // Si c'est pour une image
            const mediaImg = document.createElement('img');
            mediaImg.src = `assets/media/${id}/${media.image}`;
            mediaImg.alt = media.title;
    
            mediaItemDiv.appendChild(mediaImg);
        } else if (media.video) {
            // Si c'est pour une vidéo
            const mediaVideo = document.createElement('video');
            mediaVideo.src = `assets/media/${id}/${media.video}`;
            mediaVideo.alt = media.title;
            mediaVideo.controls = true; // les contrôles pour la lecture sont ajoutés
    
            mediaItemDiv.appendChild(mediaVideo);
        }

        // Ancien morceau de code pour comparaison :
        // const mediaImg = document.createElement('img');
        // mediaImg.src = `assets/media/${id}/${media.image || media.video}`;
        // mediaImg.alt = media.title;
    
        const titleParagraph = document.createElement('p');
        titleParagraph.textContent = `Title: ${media.title}`;
    
        const typeParagraph = document.createElement('p');
        typeParagraph.textContent = `Type: ${media.video ? 'Video' : 'Image'}`;
    
        const likesParagraph = document.createElement('p');
        likesParagraph.textContent = `Likes: ${media.likes}`;
    
        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = `Date: ${media.date}`;
    
        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `Price: ${media.price}`;
    
        mediaItemDiv.appendChild(titleParagraph);
        mediaItemDiv.appendChild(typeParagraph);
        mediaItemDiv.appendChild(likesParagraph);
        mediaItemDiv.appendChild(dateParagraph);
        mediaItemDiv.appendChild(priceParagraph);
    
        mediaContainerDiv.appendChild(mediaItemDiv);
    });

    const detailsElement = document.getElementById('details');
    detailsElement.innerHTML = '';
    detailsElement.appendChild(photographerSection);
    detailsElement.appendChild(mediaContainerDiv);
}

function displayModal() {
    const modal = document.getElementById('contact_button');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('contact_button');
    modal.style.display = 'none';
}

async function init() {
    let params = new URLSearchParams(document.location.search);
    let id = parseInt(params.get("id"));
    console.log(id);
    const photographer = await getPhotographer(id);
    photographerDetails(photographer);
}

init();

// //Mettre le code JavaScript lié à la page photographer.html

// async function getPhotographer(id) {
//     try {
//         // URL du fichier JSON
//         const response = await fetch("../../data/photographers.json");
//         if (!response.ok) {
//             throw new Error('Failed to fecth data');
//         }
//         const data = await response.json();
//         const photographer = data.photographers.find((photographer) => {
//             return photographer.id === id;
//         });

//         // les médias en fonction de l'ID du photographe
//         photographer.media = data.media.filter((media) => {
//             return media.photographerId === id;
//         });

//         // les données dans la console
//         console.log(data);

//         // tableau des photographes une fois récupéré
//         return photographer;
//     } catch (error) {
//         console.error('Error fetching photographers data', error);
//     }
// }

// function photographerDetails(photographer) {
//     console.log("Photographer object:", photographer)

//     const { id, name, city, country, tagline, portrait } = photographer;

//     console.log(photographer)

//     // détails du photographe
//     const photographerDetailsHTML = `
//         <section class="photograph-details">
//             <div class="photograph-detail">
//                 <h2 class="photograph-name">${name}</h2>
//                 <p class="photograph-location">${city}, ${country}</p>
//                 <p class="photograph-tagline">${tagline}</p>
//             </div>
//             <button class="button" id="contactBtn" aria-label="ouverture de la modal de contact">Contactez-moi</button>
//             <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
//         </section>
//     `;

//     // médias du photographe
//     const mediaDetailsHTML = photographer.media.map((media) => {
//         return `
//             <div class="media-item">
//                 <img src="assets/media/${id}/${media.image || media.video}" alt="${media.title}">
//                 <p>Title: ${media.title}</p>
//                 <p>Type: ${media.video ? 'Video' : 'Image'}</p>
//                 <p>Likes: ${media.likes}</p>
//                 <p>Date: ${media.date}</p>
//                 <p>Price: ${media.price}</p>
//             </div>
//         `;
//     }).join('');

//     // détails dans la vue HTML
//     document.getElementById('details').innerHTML = photographerDetailsHTML + `<div class="media-container">${mediaDetailsHTML}</div>`;
// }

// async function init() {
//     let params = new URLSearchParams(document.location.search);
//     let id = parseInt(params.get("id")) 
//     console.log(id)
//     // Récupère les datas des photographes
//     const photographer = await getPhotographer(id);
//     photographerDetails(photographer)
// }

// init();
