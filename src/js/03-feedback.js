import _ from 'lodash';
const inputEvent = document.querySelector('input');
const textAreaEvent = document.querySelector('textarea');
const THROTTLE_TIME = 500;
const dataForm = {
  email: '',
  message: '',
};
const throttledSaveToLocalStorage = _.throttle(
  saveToLocalStorage,
  THROTTLE_TIME
);
const feedbackForm = document.querySelector('.feedback-form');

inputEvent.addEventListener('input', function (event) {
  const currentEmailValue = event.target.value;
  dataForm.email = currentEmailValue;
  throttledSaveToLocalStorage();
});

textAreaEvent.addEventListener('input', function (event) {
  const currentTextMessageValue = event.target.value;
  dataForm.message = currentTextMessageValue;
  throttledSaveToLocalStorage();
});
function saveToLocalStorage() {
  localStorage.setItem('feedback-form-state', JSON.stringify(dataForm));
}
function loadFromLocalStorage() {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    inputEvent.value = parsedState.email;
    textAreaEvent.value = parsedState.message;
    Object.assign(dataForm, parsedState);
  }
}

window.addEventListener('load', loadFromLocalStorage);

feedbackForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!dataForm.email || !dataForm.message) {
    alert('Both email and message fields are required.');
  } else {
    console.log('Dane wysłane:', dataForm);
    localStorage.removeItem('feedback-form-state');
    inputEvent.value = '';
    textAreaEvent.value = '';
    dataForm.email = '';
    dataForm.message = '';
  }
});
