export default class MediaFactory {
    constructor(media, id) {
        // console.log(media)
        if (media && media.image) {
            return new ImageFactory(media, id)
        } else if (media && media.video) {
            return new VideoFactory(media, id)
        }
    }
}

class ImageFactory {
    constructor(media, id) {
        // console.log(media)
        this.media = media
        this.id = id
    }

    render() {
        const mediaImg = document.createElement('img')
        mediaImg.src = `assets/media/${this.id}/${this.media.image}`
        // mediaImg.src = this.media.image
        // console.log(this.media.image)
        // console.log(this.media.id)
        mediaImg.alt = this.media.title
        mediaImg.title = this.media.title
        mediaImg.setAttribute('aria-label', `Image: ${this.media.title}`)
        mediaImg.style.maxHeight = '300px'
        mediaImg.style.maxWidth = '300px'
        return mediaImg
    }
}

class VideoFactory {
    constructor(media, id) {
        // console.log(media)
        this.media = media
        this.id = id
    }

    render() {
        const mediaVideo = document.createElement('video')
        mediaVideo.src = `./assets/media/${this.id}/${this.media.video}`
        // mediaVideo.src = this.media.video
        mediaVideo.alt = this.media.title
        mediaVideo.title = this.media.title
        mediaVideo.setAttribute('aria-label', `Video: ${this.media.title}`)
        mediaVideo.controls = true
        return mediaVideo
    }
}