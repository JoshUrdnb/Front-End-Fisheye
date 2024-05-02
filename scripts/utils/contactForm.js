function validate (event) {
    event.preventDefault()
    console.log('envoyé')

    const form = event.target;
    const first = form.querySelector('#first').value
    const last = form.querySelector('#last').value
    const email = form.querySelector('#email').value
    const message = form.querySelector('#newField').value

    let error = false

    if (first.trim() === '') {
        error = true
    }

    if (last.trim() === '') {
        error = true
    }

    if (email.trim() === '') {
        error = true
    }

    if (message.trim() === '') {
        error = true
    }

    if (error) {
        alert('Veuillez remplir tous les champs du formulaire.')
        return false
    }
}

export function displayModal(name) {
    const modal = document.getElementById('contact_modal')
    modal.style.display = 'block'

    const naming = document.getElementById('contactFormName')
    naming.textContent = name

    const closing = document.getElementById('contact_button')
    closing.addEventListener('submit', validate)
}

export function closeModal() {
    const modal = document.getElementById('contact_modal')
    modal.style.display = 'none'
}