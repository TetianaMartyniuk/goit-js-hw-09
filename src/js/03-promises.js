import Notiflix, { Notify } from "notiflix";
const refs = {
  form: document.querySelector(".form"),
  delay: document.querySelector("input[name='delay']"),
  step: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
  btnStart: document.querySelector("button[type='submit']")
}
let count = 1;
const key = "add-new-promise-data";
refs.form.addEventListener("submit", setPromise)

function setPromise(e) {
  e.preventDefault();
  const data = e.currentTarget.elements;
  const promiseObj = {
    position: Number(data.amount.value),
    delay: Number(data.delay.value),
    step: Number(data.step.value)
  }
  console.log(promiseObj);
  
  setTimeout(() => {
    const interval = setInterval(() => {
      promiseResult(promiseObj);
      count += 1;
      if (count > promiseObj.position) {
        clearInterval(interval);
        count = 1;
      }
      console.log(count);
    }, promiseObj.step);
  }, promiseObj.delay)
  
  
}
function createPromise({position, delay, step}) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
    // Fulfill
      resolve(`✅ Fulfilled promise ${count} in ${delay + step * count}ms`);
  } else {
    // Reject
      reject(`❌ Rejected promise ${count} in ${delay + step * count}ms`);
  }
  })
  return promise
}

function promiseResult(obj) {
  createPromise(obj).then((resolve) => {
    Notify.success(resolve);
  })
  .catch((reject) => {
    Notify.failure(reject);
  }).finally(() => {
    
  });
}

// function startPromises() {
//     setTimeout(() => {
//     const interval = setInterval(() => {
//       promiseResult(promiseObj);
//       count += 1;
//       if (count > Number(promiseObj.position)) {
//         clearInterval(interval);
//       }
//       console.log(count);
//     }, promiseObj.step);
//   }, promiseObj.delay)
// }

// function addDataToStorage(obj) {
//     let dataObj = {};
//     console.log(dataObj);
//     dataObj.delay = obj.delay.value;
//     dataObj.amount = obj.position.value;
//     dataObj.step = obj.step.value;
//     localStorage.setItem(key, JSON.stringify(dataObj))

// }

// createPromise(2, 1500)
  // .then(({ position, delay }) => {
  //   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  // })
  // .catch(({ position, delay }) => {
  //   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  // });





