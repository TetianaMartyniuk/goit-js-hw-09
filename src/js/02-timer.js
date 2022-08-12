import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

const refs = {
    timerWrapper: document.querySelector(".timer"),
    timeField: document.querySelectorAll(".field"),

    picker: document.querySelector("#datetime-picker"),
    btnStart: document.querySelector("button[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]")
}

refs.btnStart.disabled = true;
let endDate = null
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        endDate = Date.parse(selectedDates);
        if (selectedDates[0] <= Date.now()) {
            Notify.failure("Please choose a date in the future")
            return
        } else {
            refs.btnStart.disabled = false;
            refs.btnStart.addEventListener("click", timerStart)
            }
  },
};

function timerStart() {
    setInterval(() => {
                    const deltaTime = endDate - Date.parse(new Date());
                    console.log(deltaTime);
                    changeTimer(convertMs(deltaTime));
        }, 1000)
}

function changeTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds)
    
}

function addLeadingZero(value) {
   return `${value}`.padStart(2, "0")
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


const fpCalendar = flatpickr(refs.picker, options)

