import React from 'react';

import classes from './book-not-exist.module.scss';

export const BookNotExist = (props: {templateToShow: boolean}) => {
    const templates = {
        emptyCategory: 'В этой категории книг ещё нет',
        noMatches :'По запросу ничего не найдено'
    }

    const testId = {
        emptyCategory: 'empty-category',
        noMatches :'search-result-not-found'
    }

    return (
        <div className={classes['book-empty']} data-test-id={props.templateToShow ? testId.emptyCategory : testId.noMatches}>
            <h2 className={classes['book-empty-title']}>{props.templateToShow ? templates.emptyCategory : templates.noMatches}</h2>
        </div>
    );
};
