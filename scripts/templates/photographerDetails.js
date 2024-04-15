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
        this.likedMedia = []// suivre etat du like, tableau vide
    }

    async render() { // render param... vide ?
        const { /*id,*/ name, city, country, tagline, portrait /*, media (suppression media...) */ } = this // plus besoin de photographer, instance de this en lieu est place pour la methode render, prend en compte la class

        const photographerSection = document.createElement('section')
        photographerSection.className = 'photograph-details'

        const detailDiv = document.createElement('div')
        detailDiv.className = 'photograph-detail'

        const nameHeading = document.createElement('h2')
        nameHeading.className = 'photograph-name'
        nameHeading.textContent = name

        const locationParagraph = document.createElement('p')
        locationParagraph.className = 'photograph-location'
        locationParagraph.textContent = `${city}, ${country}`

        const taglineParagraph = document.createElement('p')
        taglineParagraph.className = 'photograph-tagline'
        taglineParagraph.textContent = tagline

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

        const likesElement = document.getElementById('likes');
        likesElement.textContent = `Likes: ${this.likedMedia.length}`;

        const dropdownMenu = document.createElement('select')
        dropdownMenu.addEventListener('change', (e) => {
            const selectedOption = e.target.value
            if (selectedOption === 'title') {
                this.sortMediaByTitle()
            } else if (selectedOption === 'likes') {
                this.sortMediaByLikes()
            } else if (selectedOption === 'date') {
                this.sortMediaByDate()
            }
            this.renderMedia(this.media, this.id)
            this.renderTotalLikes()
        });

        const options = [
            { label: 'Trier par :' },
            { value: 'title', label: 'Titre' },
            { value: 'likes', label: 'Likes' },
            { value: 'date', label: 'Date' }
        ]

        options.forEach(option => {
            const optionElement = document.createElement('option')
            optionElement.value = option.value
            optionElement.textContent = option.label
            dropdownMenu.appendChild(optionElement)
        });

        detailsElement.appendChild(dropdownMenu)

        const mediaContainerDiv = document.createElement('div')
        detailsElement.appendChild(mediaContainerDiv)
        mediaContainerDiv.className = 'media-container'

        this.renderMedia()
        this.renderTotalLikes()
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
            return b.likes - a.likes
        });
    }

    sortMediaByDate() {
        this.media.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    }

    // renderTotalLikes() {
    //     const likesElement = document.getElementById('likes');
    //     const totalLikes = this.likedMedia.reduce((total, media) => total + media.likes, 0);
    //     likesElement.textContent = `Total Likes: ${totalLikes}`;
    // }

    renderTotalLikes() {
        const likesElement = document.getElementById('likes');
        const totalLikes = this.media.reduce((total, media) => total + media.likes, 0);
        likesElement.textContent = `Total Likes: ${totalLikes}`;
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
                if (!this.likedMedia.includes(media)) { // Vérifie si le média n'a pas déjà été aimé
                    media.likes++
                    likesParagraph.textContent = `Likes: ${media.likes}`
                    this.likedMedia.push(media) // Ajoute le média à la liste des médias aimés
                    likeButton.disabled = true // Désactive le bouton de like après le clic
                    this.renderTotalLikes(); // Mise a jour du nombre total de like par 'like' sur un media
                }
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