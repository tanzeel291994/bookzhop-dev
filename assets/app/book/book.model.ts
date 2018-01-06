export class Book {
    constructor(public Name: string,
                public Author: string,
                public Description : string,
                public Price: number,
                public Genre:string,
                public BookId?:number) {}
}