export function photographerTemplate(data) {
    const { portrait, id, name, city, country, tagline, price, media } = data;

    const picture = `assets/photographers/${portrait}`;

    // Fonction pour créer les paramètres d'URL avec URLSearchParams :
    function createURLWithSearchParams() {
        const params = new URLSearchParams();
        params.set('id', id);
        return params.toString();
    }

    // function filterHighLikesMedia() {
    //     const thresholdLikes = 50;
    //     return media.filter(mediaItem => mediaItem.likes > thresholdLikes);
    // }

    function getUserCardDOM() {
        const article = document.createElement('article');

        // Créer un lien autour de l'article avec les paramètres d'URL :
        const link = document.createElement('a');

        // Appeler la fonction pour obtenir les paramètres d'URL :
        const paramsString = createURLWithSearchParams();
        link.href = `photographer.html?${paramsString}`;

        const profilePic = document.createElement('img');
        profilePic.src = picture;
        profilePic.alt = name;

        const identification = document.createElement('p');
        identification.textContent = id;

        const naming = document.createElement('h2');
        naming.textContent = name;

        const cities = document.createElement('p');
        cities.textContent = city;

        const countries = document.createElement('p');
        countries.textContent = country;

        const description = document.createElement('p');
        description.textContent = tagline;

        const pricing = document.createElement('p');
        pricing.textContent = price;

        // const highLikesMedia = filterHighLikesMedia();

        // highLikesMedia.forEach(mediaItem => {
        //     const mediaElement = document.createElement('div');
        //     mediaElement.textContent = `Media: ${mediaItem.title}, Likes: ${mediaItem.likes}`;
        //     article.appendChild(mediaElement);
        // });

        article.appendChild(profilePic);
        article.appendChild(identification);
        article.appendChild(naming);
        article.appendChild(cities);
        article.appendChild(countries);
        article.appendChild(description);
        article.appendChild(pricing);
        link.appendChild(article);

        // return (article);
        console.log(link);
        return (link);
    }

    return { picture, id, name, city, country, tagline, price, media, getUserCardDOM };
}