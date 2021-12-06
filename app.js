// book list constructor
function Book(title,author,ISBN){
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;

}

function UI(){}

UI.prototype.addToList = function(book){
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
UI.prototype.showalert = function(message, className){
// create a new div element to show or message
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
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}



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
    // show alert
    ui.showalert('Book Removed!','success')
    e.preventDefault();
})
