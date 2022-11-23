const grid = document.querySelector(".grid");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const isRead = document.querySelector(".isread");
const searchBar = document.querySelector("#default-search");
const button = document.querySelector(".submit");
const addBook = document.querySelector(".addbook");
const addBookForm = document.querySelector(".addbookform");
const overlay = document.querySelector("#overlay");
const closeMenu = document.querySelector(".closeMenu");
const submitNewBook = document.querySelector(".submit");
let formInput = document.querySelectorAll("flexSwitch");
let toggleRead = document.querySelector(".toggleRead");
let closeSpans = document.querySelectorAll(".closeSpan");
let arraySpan = Array.from(closeSpans);
let cards = document.querySelectorAll(".card");
let titles = Array.from(document.querySelectorAll(".titles"));
let titre;
let target;

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleReadStatus = function () {
    if (this.read === true) {
      return (this.read = !this.read);
    } else {
      return (this.read = !this.read);
    }
  };
}

toggleRead.addEventListener("click", () => {
  if (toggleRead.hasAttribute("checked")) {
    toggleRead.removeAttribute("checked");
  } else {
    toggleRead.setAttribute("checked", "");
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("flexSwitch")) {
    let target = e.target.getAttribute("data-key");

    myLibrary[target].toggleReadStatus();
  }
});

function seedBook() {
  let seedBook1 = new Book("The Hobbit", "J.R.R. Tolkien", 368, true);
  let seedBook2 = new Book("Harry Potter", "J.K. Rowland", 355, true);
  let seedBook3 = new Book("Gul'Dan", "Illidan Stormrage", 999, true);
  myLibrary.push(seedBook1);
  myLibrary.push(seedBook2);
  myLibrary.push(seedBook3);
  func();
  menuClose();
  setAttr();
}

seedBook();

searchBar.addEventListener("keyup", () => {
  for (i = 0; i < closeSpans.length; i++) {
    cards = document.querySelectorAll(".card");
    titre = cards[i].getElementsByTagName("h5")[0];
    txtValue = titre.textContent || titre.innerText;
    if (txtValue.toUpperCase().indexOf(searchBar.value.toUpperCase()) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
});

function addBookToLibrary() {
  let newBook = new Book(
    title.value,
    author.value,
    Number(pages.value),
    isRead.hasAttribute("checked")
  );
  myLibrary.push(newBook);
  func();
  menuClose();
  setAttr();
}

addBook.addEventListener("click", () => {
  resetValues();
  addBookForm.classList.remove("invisible");
  overlay.classList.add("overlay");
  closeMenu.classList.remove("invisible");
});

closeMenu.addEventListener("click", () => {
  addBookForm.classList.add("invisible");
  overlay.classList.remove("overlay");
  closeMenu.classList.add("invisible");
});

function menuClose() {
  addBookForm.classList.add("invisible");
  overlay.classList.remove("overlay");
  closeMenu.classList.add("invisible");
}

button.addEventListener("click", addBookToLibrary);

function deleteBook(i) {
  myLibrary.splice(i, 1);
  func();
}

function checkedTrueOrFalse(i) {
  if (i === true) {
    return "checked";
  }
}

function func() {
  grid.innerHTML = "";
  for (let book of myLibrary) {
    let newCard = document.createElement("a");
    let titleCard = document.createElement("h5");
    let authorCard = document.createElement("p");
    let pagesCard = document.createElement("p");
    let isReadToggle = document.createElement("p");
    let closeSpan = document.createElement("span");
    newCard.classList.add("card");
    titleCard.textContent = book.title;
    authorCard.textContent = book.author;
    pagesCard.textContent = `${book.pages} pages`;
    closeSpan.textContent = "x";
    titleCard.classList.add("titleCard");
    titleCard.classList.add("titles");
    authorCard.classList.add("para");
    pagesCard.classList.add("para");
    isReadToggle.innerHTML = `<div class="flex justify-center">
    <div class="form-check form-switch">
    <label class="form-check-label inline-block text-gray-800" for="flexSwitchCheckChecked">Read</label>  
    <input class="flexSwitch form-check-input appearance-none ml-05 w-9 rounded-full h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckChecked" ${checkedTrueOrFalse(
      book.read
    )}>
    </div>
  </div>`;
    closeSpan.classList.add("closeSpan");
    newCard.append(titleCard);
    newCard.append(authorCard);
    newCard.append(pagesCard);
    newCard.append(isReadToggle);
    newCard.append(closeSpan);
    grid.append(newCard);
    setAttr();
  }
}

function resetValues() {
  title.value = "";
  author.value = "";
  pages.value = "";
  isRead.value = false;
}

function setAttr() {
  let i = 0;
  let y = 0;
  closeSpans.forEach((closeSp) => closeSp.setAttribute("data-key", `${i++}`));
  formInput.forEach((form) => form.setAttribute("data-key", `${y++}`));
  formInput = document.querySelectorAll(".flexSwitch");
  closeSpans = document.querySelectorAll(".closeSpan");
  arraySpan = Array.from(closeSpans);
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("closeSpan")) {
    let target = e.target.getAttribute("data-key");
    deleteBook(target);
    setAttr();
  }
});
