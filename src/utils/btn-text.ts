import {BookInterface} from '../types/book';
import {BookCardInterface} from '../types/book-card';
import {dateParser} from './date-utils';


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

export const registrationBtnText = (registrationStep: number) => {
    switch (registrationStep) {
        case 1:
            return 'Следующий шаг'
        case 2:
            return 'Последний шаг'
        case 3:
            return 'Зарегистрироваться'
        default:
            return 'Следующий шаг'
    }
}
