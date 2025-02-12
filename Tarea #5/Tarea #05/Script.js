const btn = document.getElementById("addToCartBtn");
const notification = document.getElementById("notification");


/* --- Modified ---*/
let count = 0;

btn.addEventListener("click", () => {

  if (count === 0) {

    notification.classList.add("show");

    setTimeout(() => {

      count++;
      notification.textContent = `Productos añadidos: ${count}`;

    }, 1000);
    

  } else {

    notification.classList.add("show");
    let counter = setInterval(() => {

      count++;
      notification.textContent = `Productos añadidos: ${count}`;

      clearInterval(counter);

    }, 0.5);

  }


  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);

});





/* --- New ---*/

btn.addEventListener("mouseover", () => {
  btn.classList.add("transLeft");

  setTimeout(() => {
    btn.classList.remove("transLeft");
  }, 1000);
});


