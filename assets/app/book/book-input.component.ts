import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";


import { Book } from "./book.model";
import { BookService } from "./book.service";

@Component({
    selector: 'app-book-input',
    templateUrl: './book-input.component.html'
})
export class BookInputComponent implements OnInit {
    book: Book;

    constructor(private bookService: BookService) {}

    onSubmit(form: NgForm) {
        if (this.book) {
            //edit 
            this.book.Name = form.value.name;
            this.book.Author = form.value.author;
            this.book.Description = form.value.description;
            this.book.Price = form.value.price;
            this.book.Genre = form.value.genre;

            this.bookService.updateMessage(this.book)
                .subscribe(
                    result => console.log(result)
                );
            this.book = null;
        }
        else{
            //create
            const book = new Book(form.value.name,form.value.author,form.value.description,form.value.price,form.value.genre);
            this.bookService.addBook(book)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.book = null;
        form.resetForm();
    }

    ngOnInit() {
        this.bookService.bookIsEdit.subscribe(
            (book: Book) => this.book = book
        );
    }
}