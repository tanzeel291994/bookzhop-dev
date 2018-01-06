import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Book } from "./book.model";


@Injectable()
export class BookService {
    private books: Book[] = [];
    bookIsEdit = new EventEmitter<Book>();

    constructor(private http: Http) {}

    addBook(book: Book) {
        const body = JSON.stringify(book);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/book', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                //console.log(JSON.stringify(result));
                //const book = new Book(result.Name,result.Author,result.Description,result.Price,result.Genre);
                const book = JSON.parse(body);
                book.BookId=result.insertId;

                this.books.push(book);
                console.log(book);
                return book;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getBooks() {
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
        return this.http.get('http://localhost:3000/book'+token)
            .map((response: Response) => {
                const books = response.json().obj;
                let transformedBooks: Book[] = [];
                for (let book of books) {
                    transformedBooks.push(new Book(book.Name,book.Author,book.Description,book.Price,book.Genre,book.BookId));
                    console.log(book);
                }
                this.books = transformedBooks;
                return transformedBooks;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editMessage(book: Book) {
        this.bookIsEdit.emit(book);
    }

    updateMessage(book: Book) {
        const body = JSON.stringify(book);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/book/' + book.BookId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMessage(book: Book) {
        this.books.splice(this.books.indexOf(book), 1);
        return this.http.delete('http://localhost:3000/book/' + book.BookId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}