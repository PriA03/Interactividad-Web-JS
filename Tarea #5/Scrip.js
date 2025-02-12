const btn = document.getElementById("addToCartBtn");
const notification = document.getElementById("notification");

btn.addEventListener("click", () => {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
});


