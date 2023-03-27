import React from 'react';

import {BookCard} from '../../../components/book-card/book-card';
import {Plug} from '../../../components/plug/plug';
import {useAppSelector} from '../../../hooks/redux';
import {DataTestId} from '../../../types/constants/data-test-id';
import {PlugMessages} from '../../../types/constants/messages';
import {isDateExpired} from '../../../utils/date-utils';

import classes from './profile-handed.module.scss';

export const ProfileHanded = () => {

    const {user} = useAppSelector(state => state.userReducer);

    const IsDateExpired = user && isDateExpired(user.delivery.dateHandedTo);

    return (
        <div className={classes.profileHanded}>
            {user?.delivery.book ?
                <BookCard cardView={false} book={user.delivery.book} searchValue=""
                          bookingId={user.booking.id} handedIssue={user.delivery.dateHandedTo}/> :
                <Plug title={PlugMessages.currentBookTitle} dataTestId={DataTestId.EmptyBlueCard}/>}
            {IsDateExpired && <Plug error={true} title={PlugMessages.handedExpiredTitle}
                  description={PlugMessages.handedExpiredDescription} dataTestId={DataTestId.Expired}/> }
        </div>
    );
};
