type Question = { text: string; correctAnswer: string };
type QuestionList = Array<Question>;

class Exercise {
  public questionNodes: Array<HTMLLIElement> = [];
  private exerciseWrapper: HTMLDivElement;
  private exerciseBody: HTMLUListElement;
  private exerciseBtn: HTMLButtonElement;
  private exerciseFooter: HTMLDivElement;
  private exerciseAnswers: HTMLDivElement;
  private exerciseAnswersCorrect: number = 0;
  private exerciseTotal: number;
  private exerciseTitle: HTMLElement;
  private exerciseSubTitle: HTMLElement;
  constructor(
    public questionList: QuestionList,
    public rootId: string,
    public title: string,
    public subTitle?: string
  ) {}

  private checkAnswers() {
    const exercisesInput = this.exerciseBody.querySelectorAll('input');
    const flag = Array.from(exercisesInput).every(
      (input) => input.value !== ''
    );
    if (!flag) {
      return;
    }
    this.exerciseBtn.setAttribute('disabled', 'true');
    exercisesInput.forEach((input) => {
      const inputCorrectAnswer = input.getAttribute('data-correct-answer');
      if (inputCorrectAnswer === input.value) {
        input.classList.add('correct');
        this.exerciseAnswersCorrect++;
      }
      if (inputCorrectAnswer !== input.value && input.value !== '') {
        input.classList.add('wrong');
      }
      const parentLi = input.parentElement as HTMLElement;
      parentLi.innerHTML = `${parentLi.innerHTML} <br/> <span class='blue'>Richtige Antwort: ${inputCorrectAnswer}</span>`;
    });
    const correctPoints = this.exerciseAnswers.querySelector(
      'span'
    ) as HTMLSpanElement;
    correctPoints.innerText = String(this.exerciseAnswersCorrect);
  }
  createQuestionNodes() {
    this.questionList.forEach((question) => {
      const formattedQuestion = question.text.replace(
        '$i',
        `<input type="text" class='exercise__input' data-correct-answer=${question.correctAnswer}>`
      );
      const liQuestion: HTMLLIElement = document.createElement('li');
      liQuestion.innerHTML = formattedQuestion;
      liQuestion.classList.add('exercise__question');
      this.questionNodes.push(liQuestion);
    });
    this.exerciseTotal = this.questionNodes.length;
  }
  createExercise() {
    this.exerciseWrapper = document.createElement('div');
    this.exerciseBody = document.createElement('ul');
    this.exerciseFooter = document.createElement('div');
    this.exerciseBtn = document.createElement('button');
    this.exerciseAnswers = document.createElement('div');
    this.exerciseTitle = document.createElement('h1');
    this.exerciseSubTitle = document.createElement('h2');

    this.exerciseWrapper.classList.add('exercise');
    this.exerciseBody.classList.add('exercise__body');
    this.exerciseFooter.classList.add('exercise__footer');
    this.exerciseTitle.innerText = this.title;
    if (this.subTitle) {
      this.exerciseSubTitle.innerText = this.subTitle;
    }
    this.exerciseBtn.innerText = 'Prüfen';

    this.exerciseAnswers.insertAdjacentHTML(
      'afterbegin',
      `<span id='correctAnswers'>${this.exerciseAnswersCorrect}</span> / <span>${this.exerciseTotal}</span/>`
    );
    this.exerciseBody.append(...this.questionNodes);
    this.exerciseFooter.append(this.exerciseBtn, this.exerciseAnswers);
    this.exerciseWrapper.append(
      this.exerciseTitle,
      this.exerciseSubTitle,
      this.exerciseBody,
      this.exerciseFooter
    );

    this.exerciseBtn.addEventListener('click', this.checkAnswers.bind(this));
  }
  render() {
    const root = document.getElementById(this.rootId);
    this.createQuestionNodes();
    this.createExercise();
    root?.append(this.exerciseWrapper);
  }
}

const questions: QuestionList = [
  {
    text: '1. Der Eilzug fuhr einen schönen Fluss $i .',
    correctAnswer: 'entlang',
  },
  { text: '2. Die Erde bewegt sich $i die Sonne.', correctAnswer: 'um' },
  {
    text: '3. Halle liegt $i Leipzig und Halberstadt.',
    correctAnswer: 'zwischen',
  },
  {
    text: '4. Die Jacke hängt $i dem Stuhl.',
    correctAnswer: 'über',
  },
  {
    text: '5. Jetzt sitzen wir wirklich $i den Stühlen.',
    correctAnswer: 'zwischen',
  },
  {
    text: '6. Die Serviette ist $i den Stuhl gefallen.',
    correctAnswer: 'unter',
  },
  { text: '7. $i der Heimat ist es am schönsten.', correctAnswer: 'In' },
  {
    text: '8. Sie können ihren Wagen $i dem Parkplatz stellen.',
    correctAnswer: 'auf',
  },
  { text: '9. $i dem Fenster blühen schöne Blumen.', correctAnswer: 'Vor' },
  { text: '10. $i dem Haus liegt ein Geschäft.', correctAnswer: 'Neben' },
];

const ex1 = new Exercise(
  questions,
  'ex1',
  'Übung 1. Ordnen Sie Präpositionen!',
  ' entlang, zwischen, um, unter, auf, neben, in, zwischen, über, vor'
);
const questions2: QuestionList = [
  {
    text: '1. Anna geht in $i Garten.',
    correctAnswer: 'den',
  },
  {
    text: '2. Die Kinder laufen auf $i Wiese.',
    correctAnswer: 'der',
  },
  {
    text: '3. Wir fahren an $i Meer.',
    correctAnswer: 'das',
  },
  {
    text: '4. Ich gehe in $i Kino.',
    correctAnswer: '',
  },
  {
    text: '5. Die Kinder spielen auf $i Hof. ',
    correctAnswer: 'dem',
  },
  {
    text: '6. Wir verbringen den Sommer an $i Meer.',
    correctAnswer: 'dem',
  },
  {
    text: '7. Der Teddy sitzt unter $i Tisch.',
    correctAnswer: 'das',
  },
  {
    text: '8. Der Schüler legt den Kuli neben $i Heft. (wohin) das',
    correctAnswer: 'der',
  },
  {
    text: '9. Der Teppich liegt vor $i Tür.',
    correctAnswer: 'die',
  },
  {
    text: '10. Der Vater stellt den Stuhl zwischen $i Stehlampe und … Fenster. (Wohin?)',
    correctAnswer: 'das',
  },
];
const ex2 = new Exercise(
  questions2,
  'ex2',
  'Übung 2. Setzen Sie den nötigen Artikel in der richtigen Form ein.'
);
ex1.render();
ex2.render();
