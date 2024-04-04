import {displayModal} from "../utils/contactForm.js"

export default class PhotographerDetails {
    constructor(photographer) {
        this.id = photographer.id
        this.name = photographer.name
        this.city = photographer.city
        this.country = photographer.country
        this.tagline = photographer.tagline
        this.portrait = photographer.portrait
        this.media = photographer.media
    }

    async render(photographer) {
        const { id, name, city, country, tagline, portrait } = this

    const photographerSection = document.createElement('section')
    photographerSection.className = 'photograph-details'

    const detailDiv = document.createElement('div')
    detailDiv.className = 'photograph-detail';

    const nameHeading = document.createElement('h2')
    nameHeading.className = 'photograph-name'
    nameHeading.textContent = name;

    const locationParagraph = document.createElement('p')
    locationParagraph.className = 'photograph-location'
    locationParagraph.textContent = `${city}, ${country}`

    const taglineParagraph = document.createElement('p')
    taglineParagraph.className = 'photograph-tagline'
    taglineParagraph.textContent = tagline;

    detailDiv.appendChild(nameHeading)
    detailDiv.appendChild(locationParagraph)
    detailDiv.appendChild(taglineParagraph)

    const contactButton = document.createElement('button')
    contactButton.className = 'contact_button'
    contactButton.id = 'contactBtn'
    contactButton.setAttribute('aria-label', 'ouverture de la modal de contact')
    contactButton.onclick = () => displayModal(name)
    contactButton.textContent = 'Contactez-moi'

    const imgElement = document.createElement('img')
    imgElement.className = 'photograph-img'
    imgElement.src = `assets/photographers/${portrait}`
    imgElement.alt = `Photo de ${name}`

    photographerSection.appendChild(detailDiv)
    photographerSection.appendChild(contactButton)
    photographerSection.appendChild(imgElement)

    const mediaContainerDiv = document.createElement('div')
    mediaContainerDiv.className = 'media-container'

    photographer.media.forEach((media) => {
        const mediaItemDiv = document.createElement('div')
        mediaItemDiv.className = 'media-item'
    
        if (media.image) {
            // Si c'est pour une image
            const mediaImg = document.createElement('img')
            mediaImg.src = `assets/media/${id}/${media.image}`
            mediaImg.alt = media.title;
            mediaItemDiv.appendChild(mediaImg)
        } else if (media.video) {
            // Si c'est pour une vidéo
            const mediaVideo = document.createElement('video')
            mediaVideo.src = `assets/media/${id}/${media.video}`
            mediaVideo.alt = media.title;
            mediaVideo.controls = true;
            mediaItemDiv.appendChild(mediaVideo);
        }
    
        const titleParagraph = document.createElement('p')
        titleParagraph.textContent = `Title: ${media.title}`
    
        const typeParagraph = document.createElement('p');
        typeParagraph.textContent = `Type: ${media.video ? 'Video' : 'Image'}`
    
        const likesParagraph = document.createElement('p')
        likesParagraph.textContent = `Likes: ${media.likes}`
    
        const dateParagraph = document.createElement('p')
        dateParagraph.textContent = `Date: ${media.date}`
    
        const priceParagraph = document.createElement('p')
        priceParagraph.textContent = `Price: ${media.price}`
    
        mediaItemDiv.appendChild(titleParagraph)
        mediaItemDiv.appendChild(typeParagraph)
        mediaItemDiv.appendChild(likesParagraph)
        mediaItemDiv.appendChild(dateParagraph)
        mediaItemDiv.appendChild(priceParagraph)
    
        mediaContainerDiv.appendChild(mediaItemDiv)
    });

    const detailsElement = document.getElementById('details')
    detailsElement.innerHTML = ''
    detailsElement.appendChild(photographerSection)
    detailsElement.appendChild(mediaContainerDiv)
    }
}