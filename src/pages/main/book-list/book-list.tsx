import {BookCard} from '../../../components/book-card/book-card';
import {BookNotExist} from '../../../components/book-not-exist/book-not-exist';
import {DataTestId} from '../../../types/constants/data-test-id';

import {ListSettings} from './list-settings/list-settings';
import {useBookList} from './use-book-list';

import classes from './book-list.module.scss';

export const BookList = () => {
    const {sortOrder, searchValue, setSearchValue, cardView, correctBooks} = useBookList();

    return (
        <div className={classes.bookListWrapper}>
            <ListSettings sortOrder={sortOrder} searchValue={searchValue}
                          setSearchValue={setSearchValue}/>
            <div className={cardView ? classes.windowStyle : classes.listStyle}
                 data-test-id={DataTestId.Content}>
                {correctBooks && correctBooks.map(el => <BookCard cardView={cardView} book={el}
                                                                  key={el.id}
                                                                  searchValue={searchValue}/>)}
            </div>
            {correctBooks && correctBooks.length === 0 && searchValue &&
                <BookNotExist templateToShow={false}/>}
            {correctBooks && correctBooks.length === 0 && !searchValue &&
                <BookNotExist templateToShow={true}/>}
        </div>
    );
};
