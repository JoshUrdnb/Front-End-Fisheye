import PhotographerDetails from '../templates/photographerDetails.js'
import {closeModal} from "../utils/contactForm.js"

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

async function init() {
    try {
        let params = new URLSearchParams(document.location.search)
        let id = parseInt(params.get("id"))
        console.log(id)
        const photographer = await getPhotographer(id)
        const photographerDetails = new PhotographerDetails(photographer) // je crée mon instance de PhotographerDetails
        photographerDetails.render() // j'appel mon instance (avec la methode render)

        //      photographerDetails(photographer); // ancienne méthode
        const modalImg = document.getElementById('modal_img')
        modalImg.addEventListener('click', closeModal)
    } catch (error) {
        console.error('Error initializing:', error)
    }
}

init();