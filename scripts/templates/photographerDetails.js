import { displayModal } from "../utils/contactForm.js"
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
        contactButton.setAttribute('tabindex', 2)
        contactButton.id = 'contactBtn'
        contactButton.setAttribute('aria-label', 'ouverture de la modal de contact')
        contactButton.onclick = () => displayModal(name)
        contactButton.textContent = 'Contactez-moi'

        const dropdownButton = document.querySelector('.dropbtn')
        dropdownButton.addEventListener('click', () => {
            document.getElementById('myDropdown').classList.toggle('show')
        })
        
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

        const mediaDivContainer = document.createElement('div')
        mediaDivContainer.className = 'mediaDivContainer'
        detailsElement.appendChild(mediaDivContainer)

        const mediaContainerDiv = document.createElement('div')
        mediaDivContainer.appendChild(mediaContainerDiv)
        mediaContainerDiv.className = 'media-container'

        this.renderMedia()
        this.renderTotalLikes()
        this.sortMediaButton()
        this.setDefaultSortButtonText()
    }

    sortMediaButton() {
        const dropdownLinks = document.querySelectorAll('.dropdown-content a')
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                const sortType = link.getAttribute('data-sort')
                dropdownLinks.forEach(link => link.classList.remove('active'))
                link.classList.add('active')
                if (sortType === 'title') {
                    this.sortMediaByTitle()
                } else if (sortType === 'likes') {
                    this.sortMediaByLikes()
                } else if (sortType === 'date') {
                    this.sortMediaByDate()
                }
                this.renderMedia()
                this.renderTotalLikes()
                this.updateSortButtonText()
                document.getElementById('myDropdown').classList.remove('show')
            });
        });
    }

    setDefaultSortButtonText() {
        const defaultSortLink = document.querySelector('.dropdown-content a:first-child')
        const dropdownButton = document.querySelector('.dropbtn')
        dropdownButton.textContent = defaultSortLink.textContent
    }
    
    updateSortButtonText() {
        const activeLink = document.querySelector('.dropdown-content a.active')
        const dropdownButton = document.querySelector('.dropbtn')
        dropdownButton.textContent = activeLink.textContent
    }

    sortMediaByTitle() {
        this.media.sort((a, b) => {
            const titleA = a.title.toLowerCase()
            const titleB = b.title.toLowerCase()
            if (titleA < titleB) return -1
            if (titleA > titleB) return 1
            return 0
        })
    }

    sortMediaByLikes() {
        this.media.sort((a, b) => {
            return b.likes - a.likes
        })
    }

    sortMediaByDate() {
        this.media.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
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
        const lightboxContainer = document.getElementById('lightbox-container')
        if (lightbox) {
            document.addEventListener('keydown', this.handleKeyDown)
            lightbox.style.display = 'block'

            const previousButton = document.createElement('button')
            previousButton.classList.add('lightbox-button', 'remove-button', 'fa-solid', 'fa-chevron-left', 'left-lightbox-button')
            previousButton.addEventListener('click', () => this.previousImage())
            lightboxContainer.appendChild(previousButton)

            const nextButton = document.createElement('button')
            nextButton.classList.add('lightbox-button', 'remove-button', 'fa-solid', 'fa-chevron-right')
            nextButton.addEventListener('click', () => this.nextImage())
            lightboxContainer.appendChild(nextButton)

            this.loadCurrentImage()
        }
    }

    closeModal() {
        const lightbox = document.getElementById('lightbox')
        if (lightbox) {
            lightbox.style.display = 'none'
            document.removeEventListener('keydown', this.handleKeyDown)
            lightbox.querySelectorAll('.remove-button').forEach(button => button.remove())
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

        if (media) {
            const mediaFactory = new MediaFactory(media, this.id)
            const renderedMedia = mediaFactory.render('lightbox-media')
            modalContent.appendChild(renderedMedia)
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

                const mediaLink = document.createElement('button')
                mediaLink.classList.add('media-link')

                const renderedMedia = mediaFactory.render('imgGallery')

                mediaLink.addEventListener('click', (e) => {
                    e.preventDefault()
                    this.openModal()
                    this.currentIndex = this.media.indexOf(media)
                    this.loadCurrentImage()
                })

                mediaLink.appendChild(renderedMedia)

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

                const heartDiv = document.createElement('div')
                heartDiv.classList.add('heartDiv')

                const likesParagraph = document.createElement('span')
                likesParagraph.textContent = `${media.likes}`

                const heartButton = document.createElement('button')
                heartButton.classList.add('heart-button')

                const heartIcon = document.createElement('i')
                heartIcon.classList.add('fas', 'fa-heart')

                heartButton.addEventListener('click', () => {
                    if (!this.likedMedia.includes(media)) {
                        media.likes++
                        likesParagraph.textContent = `${media.likes}`
                        this.likedMedia.push(media)
                        // heartIcon.disabled = true
                        this.renderTotalLikes()
                    }
                })

                heartButton.appendChild(heartIcon)
                heartDiv.appendChild(likesParagraph)
                heartDiv.appendChild(heartButton)

                infoContainerDiv.appendChild(titleParagraph)
                infoContainerDiv.appendChild(heartDiv)

                mediaInfoDiv.appendChild(infoContainerDiv)

                mediaItemDiv.appendChild(mediaLink)
                mediaItemDiv.appendChild(mediaInfoDiv)

                // mediaItemDiv.appendChild(mediaLink)
                mediaContainerDiv.appendChild(mediaItemDiv)
            }
        })
    }
}