export default class MediaFactory {
    constructor() {} 

    createMediaFactory(media) {
        // console.log(media)
        if (media && media.image) {
            return new ImageFactory(media)
        } else if (media && media.video) {
            return new VideoFactory(media)
        }
    }
}

class ImageFactory {
    constructor(media) {
        // console.log(media)
        this.media = media;
    }

    render() {
        const mediaImg = document.createElement('img')
        // mediaImg.src = `../assets/media/${this.media.id}/${this.media.image}`
        mediaImg.src = this.media.image
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
    constructor(media) {
        // console.log(media)
        this.media = media
    }

    render() {
        const mediaVideo = document.createElement('video')
        // mediaVideo.src = `../assets/media/${this.media.id}/${this.media.video}`
        mediaVideo.src = this.media.video
        mediaVideo.alt = this.media.title
        mediaVideo.title = this.media.title
        mediaVideo.setAttribute('aria-label', `Video: ${this.media.title}`)
        mediaVideo.controls = true
        return mediaVideo
    }
}