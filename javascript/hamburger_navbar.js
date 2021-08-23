// Hamburger navbar
const hamburger = document.querySelector(".hamburger");
const navlist = document.querySelector("#navbar");

hamburger.addEventListener("click", () => {
  navlist.classList.toggle("show");
});
