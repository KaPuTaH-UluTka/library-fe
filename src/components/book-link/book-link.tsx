
import {Link} from 'react-router-dom';

import {useAppSelector} from '../../hooks/redux';
import {DataTestId} from '../../types/constants/constants';

import classes from './book-link.module.scss';

export const BookLink = (props: { bookTitle?: string }) => {
    const {currentCategory} = useAppSelector(state => state.categoryReducer);

    return(
    <div className={classes.bookLinkWrapper}>
        <div className={classes.bookLink}>
            <p className={classes.linkText}><Link data-test-id={DataTestId.BreadcrumbsLink} to={`/books/${currentCategory.path}`}>{currentCategory.name}</Link><span className={classes.breadcrumbsSlash}>/</span><span data-test-id={DataTestId.BookName}>{props.bookTitle}</span></p>
        </div>
        <div className={classes.linkBg} />
    </div>
)};
