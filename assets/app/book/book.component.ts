import { Component, Input } from '@angular/core';
import { Book } from './book.model';
import { BookService } from './book.service';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})
export class BookComponent {
    @Input() book: Book;

    constructor(private bookService: BookService) {}

    onEdit() {
        this.bookService.editMessage(this.book);
    }

    onDelete() {
        this.bookService.deleteMessage(this.book)
            .subscribe(
                result => console.log(result)
            );
    }
}