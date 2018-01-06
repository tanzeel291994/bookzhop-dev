import { Component, OnInit } from "@angular/core";
import { Book } from "./book.model";
import { BookService } from "./book.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-book-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-book
                   [book]="book"
                    *ngFor="let book of books"></app-book>
        </div>
    `
})
export class BookListComponent implements OnInit {
    books: Book[];
  //[new Book("A game of throne","R R Martin","A story that revolves around 7 kingdoms",12,"Fiction")]
    constructor(private bookService: BookService, private router: Router) {}

    ngOnInit() {
        this.bookService.getBooks()
            .subscribe(
                (books: Book[]) => {
                    this.books = books;
                },
                error => {
                    this.router.navigateByUrl['/login'];
                }
            );
    }
}