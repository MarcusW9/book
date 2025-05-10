console.log("JavaScript is ready to run")

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
    }
}

Book.prototype.toggleReadStatus = function() {
    this.read = (this.read === "Read") ? "Not Read" : "Read"
}

const gameOfThrones = new Book("Game of thrones", "George RR", 309, "Not Read");

console.log(gameOfThrones.info())


let myLibrary = []

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    myLibrary.push(new Book(title, author, pages, read));
  }

function displayLibrary(arr) {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = ""

    for (let i = 0; i < arr.length; i++) {
        const book = arr[i]
        const bookDiv = document.createElement("div")
        bookDiv.classList.add("book")
        bookDiv.textContent = book.info()

        const buttonContainer = document.createElement("div")
        buttonContainer.classList.add("button-container")

        bookDiv.setAttribute("data-id", book.id)
        const removeButton = document.createElement("button")
        removeButton.classList.add("remove-button")
        removeButton.textContent = "Remove"
        removeButton.addEventListener("click", () => {
            const idToremove = book.id;
            myLibrary = myLibrary.filter(b => b.id !== idToremove);
        displayLibrary(myLibrary)
        })

        const toggleReadButton = document.createElement("button")
        toggleReadButton.textContent = "Toggle Read"
        toggleReadButton.classList.add("toggle-read-button")
        toggleReadButton.addEventListener("click", () => {
            book.toggleReadStatus()
        displayLibrary(myLibrary)
        })

        bookDiv.append(buttonContainer)
        buttonContainer.append(toggleReadButton);
        buttonContainer.append(removeButton);
        libraryDiv.appendChild(bookDiv)
    }
}

const bookForm = document.getElementById("book-dialog")
const addBookButton = document.getElementById("add-book-button")
const bookDialog = document.getElementById("book-dialog");
const cancelButton = document.getElementById("cancel-button")

cancelButton.addEventListener("click", () => {
    bookDialog.close()
})

addBookButton.addEventListener("click", () => {
    bookDialog.showModal();
})

const newBookForm = document.getElementById("new-book-form")
newBookForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;
    addBookToLibrary(title, author, pages, read)
    displayLibrary(myLibrary)
    bookDialog.close();
})

addBookToLibrary("Game of thrones", "George RR", 309, "Not read")
addBookToLibrary("Lord of the Rings", "Tolkien", 598, "Read")
displayLibrary(myLibrary)

