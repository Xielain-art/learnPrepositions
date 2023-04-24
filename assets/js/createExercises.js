var questions = [
    {
        text: "1. Der Eilzug fuhr einen schönen Fluss … .",
        correctAnswer: "entlang",
    },
    { text: "2. Die Erde bewegt sich … die Sonne.", correctAnswer: "um" },
    {
        text: "3. Halle liegt … Leipzig und Halberstadt.",
        correctAnswer: "zwischen",
    },
    {
        text: "4. Die Jacke hängt … dem Stuhl.",
        correctAnswer: "über",
    },
    {
        text: "5. Jetzt sitzen wir wirklich … den Stühlen.",
        correctAnswer: "zwischen",
    },
    {
        text: "6. Die Serviette ist … den Stuhl gefallen.",
        correctAnswer: "unter",
    },
    { text: "7. … der Heimat ist es am schönsten.", correctAnswer: "In" },
    {
        text: "8. Sie können ihren Wagen … dem Parkplatz stellen.",
        correctAnswer: "auf",
    },
    { text: "9. … dem Fenster blühen schöne Blumen.", correctAnswer: "Vor" },
    { text: "10. … dem Haus liegt ein Geschäft.", correctAnswer: "Neben" },
];
var Exercise = /** @class */ (function () {
    function Exercise(questionList, rootId, title, subTitle) {
        this.questionList = questionList;
        this.rootId = rootId;
        this.title = title;
        this.subTitle = subTitle;
        this.questionNodes = [];
        this.exerciseAnswersCorrect = 0;
    }
    Exercise.prototype.checkAnswers = function () {
        var _this = this;
        var exercisesInput = this.exerciseBody.querySelectorAll("input");
        var flag = Array.from(exercisesInput).every(function (input) { return input.value !== ""; });
        if (!flag) {
            return;
        }
        this.exerciseBtn.setAttribute("disabled", "true");
        exercisesInput.forEach(function (input) {
            var inputCorrectAnswer = input.getAttribute("correct-answer");
            if (inputCorrectAnswer === input.value) {
                input.classList.add("correct");
                _this.exerciseAnswersCorrect++;
            }
            if (inputCorrectAnswer !== input.value && input.value !== "") {
                input.classList.add("wrong");
            }
            console.log(input.parentElement);
            var parentLi = input.parentElement;
            parentLi.innerHTML = "".concat(parentLi.innerHTML, " <br/> <span class='blue'>Richtige Antwort: ").concat(inputCorrectAnswer, "</span>");
        });
        var correctPoints = this.exerciseAnswers.querySelector("span");
        correctPoints.innerText = String(this.exerciseAnswersCorrect);
    };
    Exercise.prototype.createQuestionNodes = function () {
        var _this = this;
        this.questionList.forEach(function (question) {
            var formattedQuestion = question.text.replaceAll("…", "<input type=\"text\" class='exercise__input' correct-answer=".concat(question.correctAnswer, ">"));
            var liQuestion = document.createElement("li");
            liQuestion.innerHTML = formattedQuestion;
            liQuestion.classList.add("exercise__question");
            _this.questionNodes.push(liQuestion);
        });
        this.exerciseTotal = this.questionNodes.length;
    };
    Exercise.prototype.createExercise = function () {
        var _a;
        this.exerciseWrapper = document.createElement("div");
        this.exerciseBody = document.createElement("ul");
        this.exerciseFooter = document.createElement("div");
        this.exerciseBtn = document.createElement("button");
        this.exerciseAnswers = document.createElement("div");
        this.exerciseTitle = document.createElement("h1");
        this.exerciseSubTitle = document.createElement('h2');
        this.exerciseWrapper.classList.add("exercise");
        this.exerciseBody.classList.add("exercise__body");
        this.exerciseFooter.classList.add("exercise__footer");
        this.exerciseTitle.innerText = this.title;
        this.exerciseSubTitle.innerText = this.subTitle;
        this.exerciseBtn.innerText = "Prüfen";
        this.exerciseAnswers.insertAdjacentHTML("afterbegin", "<span id='correctAnswers'>".concat(this.exerciseAnswersCorrect, "</span> / <span>").concat(this.exerciseTotal, "</span/>"));
        (_a = this.exerciseBody).append.apply(_a, this.questionNodes);
        this.exerciseFooter.append(this.exerciseBtn, this.exerciseAnswers);
        this.exerciseWrapper.append(this.exerciseTitle, this.exerciseSubTitle, this.exerciseBody, this.exerciseFooter);
        this.exerciseBtn.addEventListener("click", this.checkAnswers.bind(this));
    };
    Exercise.prototype.render = function () {
        var root = document.getElementById(this.rootId);
        this.createQuestionNodes();
        this.createExercise();
        root === null || root === void 0 ? void 0 : root.append(this.exerciseWrapper);
    };
    return Exercise;
}());
var ex1 = new Exercise(questions, "ex1", "Übung 1. Ordnen Sie Präpositionen!", " entlang, zwischen, um, unter, auf, neben, in, zwischen, über, vor");
ex1.render();
