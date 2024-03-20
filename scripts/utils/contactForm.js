function validate (event) {
    event.preventDefault()
    console.log('envoyé')

    // inserer ici message erreurs avec alert
}

export function displayModal(name) {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block';

    const naming = document.getElementById('contactFormName');
    naming.textContent = name;

    const closing = document.getElementById('contact_button')
    closing.addEventListener('submit', validate)
}

export function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
}