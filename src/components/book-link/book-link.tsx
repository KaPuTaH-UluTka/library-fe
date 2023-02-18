
import {Link} from 'react-router-dom';

import classes from './book-link.module.scss';
import {useAppSelector} from "../../hooks/redux";

export const BookLink = (props: { bookTitle?: string }) => {
    const {currentCategory} = useAppSelector(state => state.categoryReducer);

    return(
    <div className={classes['book-link-wrapper']}>
        <div className={classes['book-link']}>
            <p className={classes['book-link-text']}><Link to={`/books/${currentCategory.path}`}>{currentCategory.name}</Link><span>/</span>{props.bookTitle}</p>
        </div>
        <div className={classes['book-link-background']} />
    </div>
)};
