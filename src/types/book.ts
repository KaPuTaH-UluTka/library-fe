export interface Book {
    id: number
    name: string,
    images?: string[],
    author: string,
    category: string,
    issueDate: number,
    onBooking: boolean,
    bookingExpires?: string,
    publishing: string,
    about: string,
    pagesCount: number,
    binding: string,
    size: string,
    genre: string,
    weight: string,
    isbn: string,
    producer: string,
    rating?: number,
    reviews?: Review[],
}

export interface Review {
    userId: number,
    userName: string,
    date: string,
    rating: number,
    feedback?: string,
}
