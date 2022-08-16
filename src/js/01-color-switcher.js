const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector("body")
};

// const btnStart= document.querySelector('button[data-start]');
// const btnStop= document.querySelector('button[data-stop]');
// const body= document.querySelector("body");
let timerId = null

refs.btnStart.addEventListener("click", changeColor)
refs.btnStop.addEventListener("click", noColor)


function changeColor() {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    refs.btnStart.disabled = true; 
}


function noColor() {
    clearInterval(timerId);
    // refs.body.style.backgroundColor = "transparent";
    refs.btnStart.disabled = false;
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
