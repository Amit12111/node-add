let burger = window.document.querySelector(".burger");
let navlinks = window.document.querySelector(".nav-links");
let li = navlinks.querySelectorAll("li");
burger.addEventListener("click", function () {
  if (navlinks.classList.contains("nav-active")) {
    navlinks.classList.remove("nav-active");
    burger.classList.remove("toggle");
  } else {
    navlinks.classList.add("nav-active");
    burger.classList.add("toggle");
  }
  li.forEach(function (element, index) {
    if (element.style.animation) {
      element.style.animation = ``;
    } else {
      element.style.animation = `navlinkfade 3s ease-in-out forwards ${
        index / 7
      }s`;
    }
  });
});

setcard();
let addbtn = document.querySelector("#addbtn");
let addtext = document.querySelector("#addtxt");
addtext.addEventListener("click", function () {
  addtext.value = "";
});
addbtn.addEventListener("click", function () {
  let notes = JSON.parse(localStorage.getItem("notes"));
  if (notes == null) {
    notes = [];
  }
  notes.push(addtext.value);
  localStorage.setItem("notes", JSON.stringify(notes));
  addtext.value = "example text";
  setcard();
});

function setcard() {
  let cardarea = document.querySelector(".cardarea");
  let notes = JSON.parse(localStorage.getItem("notes"));
  let div = "";
  if (notes == null) {
    div+=`<div class="alert alert-warning alert-dismissible fade show" role="alert" style="text-align:center;">
    <strong>Helllooooooo</strong> Your notes list is empty.
  </div>`;
  } 
  else {
    notes.forEach(function (text, index) {
      div += `<div class="card cardX" style="width: 18rem; margin: 1rem;background-color: #D3E4CD;">
            <div class="card-body">
              <h5 class="card-title" style="font-family: 'Poppins', sans-serif;">Note ${index + 1}</h5>
              <p class="card-text">${text}</p>
              <button class="btn" id="deletebtn" onClick="deletecard(${index})" style="background-color: #99A799;">Delete</button>
            </div>
          </div>`;
    });
}
cardarea.innerHTML = div;
}
function deletecard(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notes));
    setcard();
}
let search =document.querySelector("#search");
search.addEventListener('input',function () {
    let cards=document.querySelectorAll(".cardX");
    cards=Array.from(cards);
    cards.forEach(function (element) {
        let text= element.querySelector(".card-text").innerText;
        if (text.includes(search.value)) {
            element.style.display='block';
        }
        else{
            element.style.display='none';
        }
    })
})