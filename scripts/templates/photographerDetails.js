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

        const likesElement = document.getElementById('likes')
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
        dropdownMenu.setAttribute('aria-label', 'Trier par :')

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
            return new Date(b.date) - new Date(a.date)
        });
    }

    renderTotalLikes() {
        const likesElement = document.getElementById('likes')
        const totalLikes = this.media.reduce((total, media) => total + media.likes, 0)
        likesElement.textContent = `Total Likes: ${totalLikes}, Prix: ${this.price}`
    }

    openModal() {
        const lightbox = document.getElementById('lightbox')
        if (lightbox) {
            lightbox.style.display = 'flex'
            lightbox.style.justifyContent = 'center'
            lightbox.style.alignItems = 'center'

            document.addEventListener('keydown', this.handleKeyDown)

            const previousButton = document.createElement('button')
            previousButton.textContent = 'Previous'
            previousButton.addEventListener('click', () => this.previousImage())
            lightbox.appendChild(previousButton)

            const nextButton = document.createElement('button')
            nextButton.textContent = 'Next'
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
            mediaImg.style.maxHeight = '300px'
            mediaImg.style.maxWidth = '300px'
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
                mediaLink.href = '#'

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

                const titleParagraph = document.createElement('p')
                titleParagraph.textContent = `Title: ${media.title}`
    
                const typeParagraph = document.createElement('p')
                typeParagraph.textContent = `Type: ${media.video ? 'Video' : 'Image'}`
    
                const likesParagraph = document.createElement('p')
                likesParagraph.textContent = `Likes: ${media.likes}`
    
                const likeButton = document.createElement('button')
                likeButton.textContent = 'Like'
                likeButton.addEventListener('click', () => {
                    if (!this.likedMedia.includes(media)) {
                        media.likes++
                        likesParagraph.textContent = `Likes: ${media.likes}`
                        this.likedMedia.push(media)
                        likeButton.disabled = true
                        this.renderTotalLikes()
                    }
                });
    
                const dateParagraph = document.createElement('p')
                dateParagraph.textContent = `Date: ${media.date}`
    
                const priceParagraph = document.createElement('p')
                priceParagraph.textContent = `Price: ${media.price}`

                mediaLink.appendChild(renderedMedia)
                mediaItemDiv.appendChild(renderedMedia)
                mediaItemDiv.appendChild(titleParagraph)
                mediaItemDiv.appendChild(typeParagraph)
                mediaItemDiv.appendChild(likesParagraph)
                mediaItemDiv.appendChild(dateParagraph)
                mediaItemDiv.appendChild(priceParagraph)
                mediaItemDiv.appendChild(likeButton)
                mediaContainerDiv.appendChild(mediaItemDiv)
            }
        });
    }
}