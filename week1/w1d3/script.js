//Modifying an element
let title = document.querySelector("#title");
title.innerHTML = "Cohort 1 is Awesome!!!";
// title.innerHTML = "<h6>HELLLOOOO</h6>";

//Adding an element
let addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", function () {
  let newItem = document.createElement("li");
  newItem.textContent = "New Item";

  let list = document.querySelector("#list");
  list.appendChild(newItem);
});

//removing an element
let removeBtn = document.querySelector("#removeBtn");
removeBtn.addEventListener("click", function () {
  let list = document.querySelector("#list");
  let lastItem = list.lastElementChild;
  if (lastItem) {
    list.removeChild(lastItem);
  }
});

// Alternate way to write the removeBtn Function:

// function removeBtnEvent() {
//   const list = document.querySelector("#list");
//   const lastItem = list.lastElementChild;
//   if (lastItem) list.removeChild(lastItem);
// }
