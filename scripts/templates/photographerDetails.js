import {displayModal} from "../utils/contactForm.js"
import MediaFactory from "./mediaFactory.js"

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
        this.currentIndex = 0
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
        nameHeading.classList.add('style-name')

        const locationParagraph = document.createElement('p')
        locationParagraph.className = 'photograph-location'
        locationParagraph.textContent = `${city}, ${country}`
        locationParagraph.classList.add('style-location')

        const taglineParagraph = document.createElement('p')
        taglineParagraph.className = 'photograph-tagline'
        taglineParagraph.textContent = tagline
        taglineParagraph.classList.add('style-tagline')

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

        const dropdownMenu = document.createElement('select')
        dropdownMenu.className = 'dropdown-menu'
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
            // { label: 'Trier par :' },
            { value: 'title', label: 'Titre' },
            { value: 'likes', label: 'Popularité' },
            { value: 'date', label: 'Date' }
        ]

        options.forEach(option => {
            const optionElement = document.createElement('option')
            optionElement.value = option.value
            optionElement.textContent = option.label
            optionElement.className = 'dropdown-option'
            dropdownMenu.appendChild(optionElement)
        });

        detailsElement.appendChild(dropdownMenu)
        dropdownMenu.setAttribute('aria-label', 'Trier par :')

        const mediaDivContainer = document.createElement('div')
        mediaDivContainer.className = 'mediaDivContainer'
        detailsElement.appendChild(mediaDivContainer)

        const mediaContainerDiv = document.createElement('div')
        mediaDivContainer.appendChild(mediaContainerDiv)
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
            return new Date(b.date) - new Date(a.date)
        });
    }

    renderTotalLikes() {
        const likesElement = document.getElementById('likes')
        likesElement.innerHTML = ''
        const totalLikes = this.media.reduce((total, media) => total + media.likes, 0)

        const likedElement = document.createElement('span')
        likedElement.textContent = totalLikes

        const likedElement2 = document.createElement('span')
        likedElement2.classList.add('likedIcon', 'fas', 'fa-heart')

        likedElement.appendChild(likedElement2)

        likesElement.appendChild(likedElement)

        const likedElement3 = document.createElement('span')
        likedElement3.textContent = `${this.price}€ / jour`
        likesElement.appendChild(likedElement3)
    }

    openModal() {
        const lightbox = document.getElementById('lightbox')
        if (lightbox) {
            lightbox.style.display = 'flex'
            lightbox.style.justifyContent = 'center'
            lightbox.style.alignItems = 'center'

            document.addEventListener('keydown', this.handleKeyDown)

            const previousButton = document.createElement('button')
            // previousButton.textContent = 'Previous'
            previousButton.classList.add('lightbox-button','fa-solid', 'fa-chevron-left')
            previousButton.addEventListener('click', () => this.previousImage())
            lightbox.appendChild(previousButton)

            const nextButton = document.createElement('button')
            // nextButton.textContent = 'Next'
            nextButton.classList.add('lightbox-button','fa-solid', 'fa-chevron-right')
            nextButton.addEventListener('click', () => this.nextImage())
            lightbox.appendChild(nextButton)
        }
    }

    closeModal() {
        const lightbox = document.getElementById('lightbox')
        if (lightbox) {
            lightbox.style.display = 'none'
            document.removeEventListener('keydown', this.handleKeyDown)
        }
    }

    handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                this.previousImage()
                break
            case 'ArrowRight':
                this.nextImage()
                break
            case 'Escape':
                this.closeModal()
                break
            default:
                break
        }
    }

    previousImage() {
        if (this.currentIndex > 0) {
            this.currentIndex--
            this.loadCurrentImage()
        }
    }

    nextImage() {
        if (this.currentIndex < this.media.length - 1) {
            this.currentIndex++
        } else {
            this.currentIndex > 0
        }
        this.loadCurrentImage()
    }

    loadCurrentImage() {
        const media = this.media[this.currentIndex]
        const modalContent = document.getElementById('modalContent')
        modalContent.innerHTML = ''

        if (media && media.image) {
            const mediaImg = document.createElement('img')
            mediaImg.src = `assets/media/${this.id}/${media.image}`
            mediaImg.alt = media.title
            modalContent.appendChild(mediaImg)
        }
    }

    renderMedia() {
        const mediaContainerDiv = document.querySelector('.media-container')
        mediaContainerDiv.innerHTML = ''
    
        this.media.forEach((media) => {
            const mediaItemDiv = document.createElement('div')
            mediaItemDiv.className = 'media-item'
    
            const mediaFactory = new MediaFactory(media, this.id)
    
            if (mediaFactory) {
                const renderedMedia = mediaFactory.render('imgGallery')
    
                const mediaLink = document.createElement('a')
    
                renderedMedia.addEventListener('click', (e)=> {
                    e.preventDefault()
                    this.openModal()
                    this.currentIndex = this.media.indexOf(media)
                    this.loadCurrentImage()
                });
    
                const closeModalBtn = document.getElementById('closeModalBtn')
                if (closeModalBtn) {
                    closeModalBtn.addEventListener('click', () => this.closeModal())
                }
    
                const mediaInfoDiv = document.createElement('div')
                mediaInfoDiv.classList.add('media-info')
    
                const infoContainerDiv = document.createElement('div')
                infoContainerDiv.classList.add('info-container')
    
                const titleParagraph = document.createElement('span')
                titleParagraph.textContent = `${media.title}`
    
                const heartButton = document.createElement('div')
                heartButton.classList.add('heartDiv')

                const likesParagraph = document.createElement('span')
                likesParagraph.textContent = `${media.likes}`
    
                const heartIcon = document.createElement('i')
                heartIcon.classList.add('fas', 'fa-heart')
    
                heartIcon.addEventListener('click', () => {
                    if (!this.likedMedia.includes(media)) {
                        media.likes++
                        likesParagraph.textContent = `${media.likes}`
                        this.likedMedia.push(media)
                        // heartIcon.disabled = true
                        this.renderTotalLikes()
                    }
                });
    
                infoContainerDiv.appendChild(titleParagraph)
                infoContainerDiv.appendChild(heartButton)
                heartButton.appendChild(likesParagraph)
                heartButton.appendChild(heartIcon)

                mediaLink.appendChild(renderedMedia)
                mediaInfoDiv.appendChild(infoContainerDiv)
    
                mediaItemDiv.appendChild(mediaLink)
                mediaItemDiv.appendChild(renderedMedia)
                mediaItemDiv.appendChild(mediaInfoDiv);
                mediaContainerDiv.appendChild(mediaItemDiv)
            }
        });
    }
    
}