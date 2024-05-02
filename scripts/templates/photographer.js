export function photographerTemplate(data) {
    const { portrait, id, name, city, country, tagline, price, media } = data

    const picture = `assets/photographers/${portrait}`

    // Fonction pour créer les paramètres d'URL avec URLSearchParams :
    function createURLWithSearchParams() {
        const params = new URLSearchParams()
        params.set('id', id)
        return params.toString()
    }

    // Afficher les prix avec les centimes dans une devise precise :
    const formatToCurrency = (price, money, country) => {
    return new Intl.NumberFormat(country, {
        style: 'currency',
        currency: money,
    }).format(price / 1)
    }

    function getUserCardDOM() {
        const article = document.createElement('article')
    
        // Créer un lien autour de l'article avec les paramètres d'URL :
        const link = document.createElement('a')
    
        // Appeler la fonction pour obtenir les paramètres d'URL :
        const paramsString = createURLWithSearchParams()
        link.href = `photographer.html?${paramsString}`
    
        const profilePic = document.createElement('img')
        profilePic.src = picture
        profilePic.alt = name
    
        const identification = document.createElement('p')
        identification.textContent = id
    
        const naming = document.createElement('h2')
        naming.textContent = name
    
        // Ma nouvelle div pour englober les éléments <p>
        const articleWrapper = document.createElement('div')

        const location = document.createElement('p')
        location.textContent = `${city}, ${country}`
    
        const description = document.createElement('p')
        description.textContent = tagline

        const pricing = document.createElement('p')
        pricing.textContent = `${formatToCurrency(price, 'EUR', 'fr-FR')}`
    
        // Ajouter les éléments à la div
        article.appendChild(profilePic)
        article.appendChild(naming)
        article.appendChild(articleWrapper) // Ajouter la nouvelle div à l'article
        // articleWrapper.appendChild(identification) // Pour afficher l'id du photographe
        articleWrapper.appendChild(description)
        articleWrapper.appendChild(location)
        articleWrapper.appendChild(pricing)
        link.appendChild(article)
    
        // return (article);
        console.log(link)
        return link
    }
    
    return { picture, id, name, city, country, tagline, price, media, getUserCardDOM }
}