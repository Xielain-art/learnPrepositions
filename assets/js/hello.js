const robot = document.querySelector("#robot");
const helloText = document.querySelector(".hello__text");
const helloBtn = document.querySelectorAll(".hello__btn");

const text = helloText.innerText;
let newHtml = "";

for (const letter of text) {
  newHtml += `<span>${letter}</span>`;
}
helloText.innerHTML = newHtml;

let spans = helloText.querySelectorAll("span");
let count = 0;
let timeout = 0;

function typing_text() {
  spans[count].classList.add("visible");
  if (spans[count].innerText === " " || spans[count].innerHTML === " ") {
    timeout = Math.floor(Math.random() * Math.floor(100));
    spans[count].classList.add("cursor");
  } else {
    timeout = 50;
  }
  if (count < text.length - 1) {
    setTimeout(() => {
      spans[count].classList.remove("cursor");
      count++;
      typing_text();
    }, timeout);
  } else {
    helloBtn.forEach((el) =>
      el.classList.add("visible", "magictime", "puffIn")
    );
  }
}

const onLoad = function () {
  robot.classList.add("magictime", "puffIn");
  setTimeout(typing_text, 1000);
};
window.addEventListener("load", onLoad);
