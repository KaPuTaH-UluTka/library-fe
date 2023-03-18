import {BookInterface} from '../types/book';
import {BookCardInterface} from '../types/book-card';

import {dateParser} from './date-parser';

export const bookingBtnText = (book: BookInterface | BookCardInterface

) => {
    if (book.delivery && book.delivery.dateHandedTo) {
        return `занята до ${dateParser(book.delivery.dateHandedTo)}`
    }
    if (book.booking === null) {
        return 'забронировать'
    }

    return 'забронирована'
}
