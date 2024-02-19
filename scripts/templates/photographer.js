export function photographerTemplate(data) {
    const { portrait, id, name, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    // Fonction pour créer les paramètres d'url avec URLSearchParams :
    function createURLWithSearchParams() {
        const params = new URLSearchParams();
        params.set('id', id);
        return params.toString();
    }

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

    return { picture, id, name, city, country, tagline, price, getUserCardDOM };
}

function photographerDetails() {
    const photographer = photographerTemplate()
    console.log("Photographer object:", photographer)

    const { name, city, country, tagline, profilePic } = photographer
    console.log("Name:", name)
    console.log("City:", city)
    console.log("Country:", country)
    console.log("Tagline:", tagline)
    console.log("Profile Pic:", profilePic)

    document.getElementById('details').innerHTML +=  `
      <section class="photograph-details">
        <div class="photograph-detail">
          <h2 class="photograph-name">${name}</h2>
          <p class="photograph-location">${city}, ${country}</p>
          <p class="photograph-tagline">${tagline}</p>
        </div>
        <button class="button" id="contactBtn" aria-label="ouverture de la modal de contact">Contactez-moi</button>
        <img class="photograph-img" src="assets/photographers/${profilePic}" alt="Photo de ${name}">
      </section>
    `;

    // Ajout du lien
    const userCardDOM = photographer.getUserCardDOM()
    console.log("User Card DOM:", userCardDOM)

    document.getElementById('main').appendChild(userCardDOM)
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("ok ça fonctionne")
    photographerDetails()
});