// returns NodeList of all elements with "collapsible" class
const collapsibles = document.querySelectorAll(".collapsible");

// returns element of id "clickable"
const togglerArea = document.getElementById("clickable");

// when togglerArea clicked, collapsible--expanded class added to first element of collapsible class
togglerArea.addEventListener("click", function () {
  collapsibles[0].classList.toggle("collapsible--expanded");
});
