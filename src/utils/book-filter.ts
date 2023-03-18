import {BookCardInterface} from '../types/book-card';
import { BookCategoryInterface } from '../types/book-category';

export const bookFilter = (books: BookCardInterface[] | undefined, currentCategory: BookCategoryInterface, sortOrder: boolean, searchValue: string) => {

    if (books && currentCategory.name) {
        let filteredBooks;

        if (currentCategory.path === 'all') {
            filteredBooks = books;
        } else {
            filteredBooks = books.filter(el => currentCategory.name ? el.categories.includes(currentCategory.name) : null);
        }
        let sortedBooks;
        const booksForSort = [...filteredBooks];

        if (sortOrder) {
            sortedBooks = booksForSort.sort((a, b) => a.rating - b.rating);
        } else {
            sortedBooks = booksForSort.sort((a, b) => b.rating - a.rating);
        }

        if (searchValue) {
            return sortedBooks.filter(el => el.title.slice(0, 54).toLowerCase().includes(searchValue.toLowerCase()));
        }

        return sortedBooks;

    }

    return books;
}
