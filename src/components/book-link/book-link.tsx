
import {Link} from 'react-router-dom';

import {useAppSelector} from '../../hooks/redux';

import classes from './book-link.module.scss';

export const BookLink = (props: { bookTitle?: string }) => {
    const {currentCategory} = useAppSelector(state => state.categoryReducer);

    return(
    <div className={classes['book-link-wrapper']}>
        <div className={classes['book-link']}>
            <p className={classes['book-link-text']}><Link data-test-id='breadcrumbs-link' to={`/books/${currentCategory.path}`}>{currentCategory.name}</Link><span className={classes['book-link-text-slash']}>/</span><span data-test-id='book-name'>{props.bookTitle}</span></p>
        </div>
        <div className={classes['book-link-background']} />
    </div>
)};
