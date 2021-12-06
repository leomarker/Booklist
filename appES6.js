class Book {
    constructor(title,author,ISBN){
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
    }
}

class UI {

    addToList(book){
        const list = document.getElementById('Book-list');
// create a new element 
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.ISBN}</td>
    <td><a herf="#" class="delete">X</td>`
 //------- the <td> tag represents the one cell of a tabel data -------
    list.appendChild(row);
    }

    showalert(message,className){
        // create a new div element to show the  message
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
// insert our div element before our form 
    container.insertBefore(div,form);
// a time out function to make our div element disappear after 3 seconds 
    setTimeout(function(){
    document.querySelector('.alert').remove();}
    ,3000)
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
            }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
}

}

// add to local storage
class Storage{

    static getbooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

   static displaybooks(){
        const books = Storage.getbooks();
        
        books.forEach(function(book){
            const ui = new UI;
            
            ui.addToList(book);
        });
    }

   static addbook(book){
        const books = Storage.getbooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
     
    static removebook(isbn){
        const books = Storage.getbooks();

        books.forEach(function(book,index){
            if(book.ISBN === isbn){
                books.splice(index,1)
            }
        })
         localStorage.setItem('books',JSON.stringify(books));
    }
}

//DOM content load
document.addEventListener('DOMContentLoaded',Storage.displaybooks);

// event listner
document.getElementById('book-form').addEventListener('submit',
function(e){
// get values from input
    const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         ISBN = document.getElementById('isbn').value;                 
   
// create a new book object every time the submit event is fired
    const book = new Book(title,author,ISBN);
// creating the new instance to the ui 
    const ui = new UI();
// validation event 
    if (title === '' || author === '' || ISBN ===''){
        ui.showalert('please fill in all fields','error');
    } else {
// send the book list to the ui object    
    ui.addToList(book);
// add book to local storage
    Storage.addbook(book);    
//Shoe success alert
    ui.showalert('Book added!','success')
// clear fields
    ui.clearFields();
    }

    e.preventDefault();
})


// event for delete item
document.getElementById('Book-list').addEventListener('click',
function(e){
    const ui = new UI();
    // call the UI function to delete tr element 
    ui.deleteBook(e.target);
    // remove from local storage
    Storage.removebook(e.target.parentElement.previousElementSibling.textContent)
    // show alert
    ui.showalert('Book Removed!','success')
    e.preventDefault();
})
