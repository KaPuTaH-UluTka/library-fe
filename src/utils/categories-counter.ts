import {BookInterface} from '../types/book';

export const countCategories = (books: BookInterface[]) => {
    const allCategories: string[] = [];

    books.forEach(book => {
        book.categories.forEach(category => allCategories.push(category))
    })

    return allCategories.reduce((acc: { [key: string]: number }, el) => {
        acc[el] = (acc[el] || 0) + 1;

        return acc;
    }, {});

}
