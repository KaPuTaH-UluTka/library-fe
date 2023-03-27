import React from 'react';

import {DataTestId} from '../../types/constants/data-test-id';
import {EmptyBooksMessages} from '../../types/constants/messages';

import classes from './book-not-exist.module.scss';

export const BookNotExist = ({templateToShow}: {templateToShow: boolean}) => (
        <div className={classes.bookEmpty} data-test-id={templateToShow ? DataTestId.EmptyCategory : DataTestId.SearchResultNotFound}>
            <h2 className={classes.bookEmptyTitle}>{templateToShow ? EmptyBooksMessages.emptyCategory : EmptyBooksMessages.noMatches}</h2>
        </div>
    );
