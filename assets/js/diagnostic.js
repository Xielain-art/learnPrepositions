const checkBtn = document.querySelector('.check__answers');
const inputs = document.querySelectorAll('.exercise__input');
const correctAnswers = document.querySelector('.answers__correct');
const totalAnswers = document.querySelector('.answers__total');
const diagnosticOk = document.querySelector('.diagnostic__ok');
const diagnosticBad = document.querySelector('.diagnostic__bad');

totalAnswers.innerText = inputs.length;

const removeClass = function (input, cl) {
  input.classList.remove(cl);
};

let points = 0;

const checkAnswers = function () {
  inputs.forEach((input) => {
    const value = input.getAttribute('data-correct-value');
    const span = input.parentElement.querySelector('span');
    span.innerText = `Richtige Antwort: ${value}`;
    if (value === input.value) {
      input.classList.add('exercise__input_correct');
      removeClass(input, 'exercise__input_gray');
      points++;
    }
    if (input.value === '') {
      input.classList.add('exercise__input_gray');
    }
    if (input.value !== '' && input.value !== value) {
      removeClass(input, 'exercise__input_gray');
      input.classList.add('exercise__input_wrong');
    }
  });
  const flag = Array.from(inputs).every((input) => input.value !== '');
  if (flag) {
    correctAnswers.innerText = points;
    this.setAttribute('disabled', true);
    inputs.forEach((input) =>
      input.parentElement
        .querySelector('span')
        .classList.add('exercise__visible', 'magictime', 'puffIn')
    );
    if (points === inputs.length) diagnosticOk.classList.remove('hidden');
    if (points !== inputs.length) diagnosticBad.classList.remove('hidden');
  }
};

checkBtn.addEventListener('click', checkAnswers);
