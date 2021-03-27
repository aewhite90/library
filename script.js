// Declarations //
let myLibrary = [];

const newBook = document.querySelector('#addBook');
const addBook = document.querySelector('#add');
const cancelBook = document.querySelector('#cancel');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const finished = document.querySelector('#bookRead');

// Button Event Listeners //
newBook.addEventListener('click', openForm);
cancel.addEventListener('click', closeForm);
addBook.addEventListener('click', addBookToLibrary);

// Book Entry Form //
function openForm() {
  document.getElementById('newBookForm').style.display = 'block';
}

function closeForm() {
console.log('closeForm() before => ', myLibrary);
  document.getElementById('newBookForm').style.display = 'none';
  title.value = '';
  author.value = '';
  pages.value = '';
  console.log('closeForm() before => ', myLibrary);
}

// Constructor //
function Book(title, author, pages, finished) {
  this.title = title
  this.author = author
  this.pages = pages
  this.finished = finished
}


// Add Books from myLibrary to Display //
function resetGrid() {
  while (cardCatalog.firstChild) {
    cardCatalog.removeChild(cardCatalog.firstChild);
  }
}

function updateLibrary() {
  resetGrid();
  myLibrary.forEach(book => {
    let bookCard = document.createElement('div');
    bookCard.classList = 'card';
    cardCatalog.appendChild(bookCard);

    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');

    h2.textContent = book.title;
    h3.textContent = 'by ' + book.author;
    p1.textContent = book.pages + ' pages';
    p2.textContent = (book.finished) ? 'Finished' : 'Need to Read';

    let readButton = document.createElement('button');
    if (book.finished) {
      readButton.textContent = 'Finished';
      readButton.classList = 'card-green-btn';
    } else {
      readButton.textContent = 'Not Finished';
      readButton.classList = 'card-red-btn';
    }

    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList = 'card-remove-btn';

    bookCard.appendChild(h2);
    bookCard.appendChild(h3);
    bookCard.appendChild(p1);
    bookCard.appendChild(readButton);
    bookCard.appendChild(removeButton);
  })
}

function removeBook(removeThisBook) {
  myLibrary = myLibrary.filter(book => book.title !== removeThisBook);
  updateLibrary();
  storeLocal();
}

function bookFinished(finishThisBook) {
  myLibrary.forEach(book => {
    if (book.title === finishThisBook) {
      book.finished = !book.finished;
    }
  })
  updateLibrary();
  storeLocal();
}

const cardCatalog = document.querySelector('#card-catalog');
cardCatalog.addEventListener('click', cardButtons);

function cardButtons(e) {
  let bookTitle = e.target.parentNode.firstChild.textContent;
  if (e.target.classList.contains('card-remove-btn')) {
    removeBook(bookTitle);
  }
  if (e.target.classList.contains('card-red-btn') || e.target.classList.contains('card-green-btn')) {
      myLibrary.forEach(book => {
        if (book.title === bookTitle) {
          book.finished = !book.finished;
        }
      })
      updateLibrary();
  }
}


function addBookToLibrary() {
  if (title.value == '' || author.value == '' || pages.value == '') {
    alert('Please fill out the form completely');
    return
  }
  bookTitle = title.value;
  bookAuthor = author.value;
  bookPages = pages.value;
  bookFinished = finished.checked;
  if (myLibrary.some(book => bookTitle == book.title)) {
    alert('That book is already in your library.');
    title.value = '';
    author.value = '';
    pages.value = '';
    storeLocal();
    return;
  } else {
    mylibrary = myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookFinished));
    storeLocal();
    closeForm();
    updateLibrary();
  }
}

// Local Storage //
function storeLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLocal() {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  if (myLibrary === null)  myLibrary = [];
  updateLibrary();
}

loadLocal();
