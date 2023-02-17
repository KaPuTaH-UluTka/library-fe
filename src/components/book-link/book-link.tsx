
import {Link} from 'react-router-dom';

import classes from './book-link.module.scss';

export const BookLink = (props: { bookTitle?: string, category: string }) => (
    <div className={classes['book-link-wrapper']}>
        <div className={classes['book-link']}>
            <p className={classes['book-link-text']}><Link to={`/books/${props.category}`}>{props.category}</Link><span>/</span>{props.bookTitle}</p>
        </div>
        <div className={classes['book-link-background']} />
    </div>
);
