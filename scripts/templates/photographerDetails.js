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
        this.likedMedia = []
        this.price = photographer.price
        this.currentIndex = 0 // Ajoutez une propriété pour suivre l'index de l'image actuellement affichée
    }

    async render() {
        const { name, city, country, tagline, portrait } = this

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
        likesElement.textContent = `Likes: ${this.likedMedia.length}`

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

    renderTotalLikes() {
        const likesElement = document.getElementById('likes')
        const totalLikes = this.media.reduce((total, media) => total + media.likes, 0)
        likesElement.textContent = `Total Likes: ${totalLikes}, Prix: ${this.price}`
    }

    // methode open & close
    openModal() {
        const lightbox = document.getElementById('lightbox')
        if (lightbox) {
            lightbox.style.display = 'flex'
            lightbox.style.justifyContent = 'center'
            lightbox.style.alignItems = 'center'

            // Ajoutez des boutons pour la navigation entre les images
            const previousButton = document.createElement('button');
            previousButton.textContent = 'Previous';
            previousButton.addEventListener('click', () => this.previousImage());
            lightbox.appendChild(previousButton);

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => this.nextImage());
            lightbox.appendChild(nextButton);
        }
    }

    closeModal() {
        const lightbox = document.getElementById('lightbox')
        if (lightbox) {
            lightbox.style.display = 'none'
        }
    }

    // Méthode pour afficher l'image précédente
    previousImage() {
        if (this.currentIndex > 0) {
            this.currentIndex--; // Diminue l'index
            this.loadCurrentImage(); // Charge l'image actuelle
        }
    }

    // Méthode pour afficher l'image suivante
    nextImage() {
        if (this.currentIndex < this.media.length - 1) {
            this.currentIndex++; // Augmente l'index
            this.loadCurrentImage(); // Charge l'image actuelle
        }
    }

    // Méthode pour charger l'image actuelle dans la lightbox
    loadCurrentImage() {
        const media = this.media[this.currentIndex];
        if (media && media.image) {
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = ''; // Efface le contenu actuel
            const mediaImg = document.createElement('img');
            mediaImg.src = `assets/media/${this.id}/${media.image}`;
            mediaImg.alt = media.title;
            mediaImg.style.maxHeight = '300px';
            mediaImg.style.maxWidth = '300px';
            modalContent.appendChild(mediaImg);
        }
    }

    renderMedia() {
        const mediaContainerDiv = document.querySelector('.media-container')
        mediaContainerDiv.innerHTML = ''

        this.media.forEach((media) => {
            const mediaItemDiv = document.createElement('div')
            mediaItemDiv.className = 'media-item'
        
            if (media.image) {
                const mediaImg = document.createElement('img')
                mediaImg.src = `assets/media/${this.id}/${media.image}`
                mediaImg.alt = media.title;
                mediaItemDiv.appendChild(mediaImg)

                //modal lightbox
                mediaImg.addEventListener('click', ()=> {
                    this.openModal()
                    this.currentIndex = this.media.indexOf(media); // Met à jour l'index de l'image actuelle
                    this.loadCurrentImage(); // Charge l'image actuelle
                        const modalContent = document.getElementById('modalContent')
                        modalContent.innerHTML = ''
                        const mediaImg2 = document.createElement('img')
                        mediaImg2.src = `assets/media/${this.id}/${media.image}`
                        mediaImg2.alt = media.title
                        mediaImg2.style.maxHeight = '300px'
                        mediaImg2.style.maxWidth = '300px'
                        modalContent.appendChild(mediaImg2)
                });
                
            } else if (media.video) {
                const mediaVideo = document.createElement('video')
                mediaVideo.src = `assets/media/${this.id}/${media.video}`
                mediaVideo.alt = media.title;
                mediaVideo.controls = true;
                mediaItemDiv.appendChild(mediaVideo)
            }

            // EventListener pour fermer la lightbox, bouton de fermeture est cliqué
            const closeModalBtn = document.getElementById('closeModalBtn')
            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', () => this.closeModal())
            }

            const titleParagraph = document.createElement('p')
            titleParagraph.textContent = `Title: ${media.title}`
        
            const typeParagraph = document.createElement('p')
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