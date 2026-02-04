/* Validation rule */

const EMAIL_ERR_MSG = 'Valid email required';

const validator = new window.JustValidate('#form');

validator
    .addField('#email', [
        {
            rule: 'required',
            errorMessage: EMAIL_ERR_MSG,
        },
        {
            rule: 'maxLength',
            value: 255,
            errorMessage: EMAIL_ERR_MSG,
        },
        {
            rule: 'email',
            errorMessage: EMAIL_ERR_MSG,
        }
    ], {
        errorFieldCssClass: ['is-error'],
        errorLabelCssClass: ['error-msg'],
        errorLabelStyle: {},
    })
    .onSuccess(handleSubmit);

/* Submit & Dismiss logic */

const VISIBLE_CLASS = 'is-visible';

const formCard = document.querySelector('.card');
const successCard = document.querySelector('.card-success');

const showSuccessCard = () => {
    formCard.classList.remove(VISIBLE_CLASS);
    successCard.classList.add(VISIBLE_CLASS);
}
const showFormCard = () => {
    formCard.classList.add(VISIBLE_CLASS);
    successCard.classList.remove(VISIBLE_CLASS);
}

const emailSuccess = document.querySelector(".card-success__email");

function handleSubmit(e) {
    // This callback does not submit the form.
    // Ref: https://just-validate.dev/docs/methods/onSuccess
    const data = Object.fromEntries(new FormData(e.target));
    emailSuccess.textContent = data.email?.trim();

    showSuccessCard();
    validator.form.reset();
    // Refresh the whole form - fields settings, clear errors messages/styles/classes.
    // Ref: https://just-validate.dev/docs/methods/refresh
    validator.refresh();
}

const dismissBtn = document.querySelector('.card-success__dismiss-btn');
dismissBtn.addEventListener('click', showFormCard);