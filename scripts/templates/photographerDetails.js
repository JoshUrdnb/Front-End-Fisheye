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

    async render() { // render param... vide ?
        const { /*id,*/ name, city, country, tagline, portrait /*, media (suppression media...) */ } = this // plus besoin de photographer, instance de this en lieu est place pour la methode render, prend en compte la class

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

        const detailsElement = document.getElementById('details')
        detailsElement.innerHTML = ''
        detailsElement.appendChild(photographerSection)

        const sortTitleButton = document.createElement('button')
        sortTitleButton.textContent = 'Trier par titre'
        sortTitleButton.addEventListener('click', () => {
            this.sortMediaByTitle()
            this.renderMedia(this.media, this.id)
        });

        detailsElement.appendChild(sortTitleButton)

        // Ajout du bouton de tri par likes
        const sortLikesButton = document.createElement('button')
        sortLikesButton.textContent = 'Trier par likes'
        sortLikesButton.addEventListener('click', () => {
            this.sortMediaByLikes() // Trie les médias par likes
            this.renderMedia(this.media, this.id) // Réaffiche les médias triés dans l'interface
        });
        
        detailsElement.appendChild(sortLikesButton)

        const mediaContainerDiv = document.createElement('div')
        detailsElement.appendChild(mediaContainerDiv)
        mediaContainerDiv.className = 'media-container'

        this.renderMedia()
    }

    sortMediaByTitle() {
        this.media.sort((a, b) => {
            const titleA = a.title.toLowerCase()
            const titleB = b.title.toLowerCase()
            if (titleA < titleB) return -1
            if (titleA > titleB) return 1
            return 0
        });
    }

    sortMediaByLikes() {
        this.media.sort((a, b) => {
            return b.likes - a.likes; // Trie les médias par ordre décroissant de likes
        });
    }

    renderMedia() { // idem supp... de media pour ne laisser que id. UPDATE : on supprime id aussi pour prefere l'utilisation de this.id a l'interieur de la methode renderMedia.

        const mediaContainerDiv = document.querySelector('.media-container')
        mediaContainerDiv.innerHTML = ''

        this.media.forEach((media) => { // this. au lieu de photographer
            const mediaItemDiv = document.createElement('div')
            mediaItemDiv.className = 'media-item'
        
            if (media.image) { // methode sort
                // Si c'est pour une image
                const mediaImg = document.createElement('img')
                mediaImg.src = `assets/media/${this.id}/${media.image}`
                mediaImg.alt = media.title;
                mediaItemDiv.appendChild(mediaImg)
            } else if (media.video) {
                // Si c'est pour une vidéo
                const mediaVideo = document.createElement('video')
                mediaVideo.src = `assets/media/${this.id}/${media.video}`
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

            const likeButton = document.createElement('button')
            likeButton.textContent = 'Like'
            likeButton.addEventListener('click', () => {
                media.likes++
                likesParagraph.textContent = `Likes: ${media.likes}`
            });
        
            const dateParagraph = document.createElement('p')
            dateParagraph.textContent = `Date: ${media.date}`
        
            const priceParagraph = document.createElement('p')
            priceParagraph.textContent = `Price: ${media.price}`
        
            mediaItemDiv.appendChild(titleParagraph)
            mediaItemDiv.appendChild(typeParagraph)
            mediaItemDiv.appendChild(likesParagraph)
            mediaItemDiv.appendChild(dateParagraph)
            mediaItemDiv.appendChild(priceParagraph)
            mediaItemDiv.appendChild(likeButton)
            mediaContainerDiv.appendChild(mediaItemDiv)
        });
    }
}