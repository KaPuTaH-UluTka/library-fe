import React, {} from 'react';
import {A11y, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {Plug} from '../../../components/plug/plug';
import {useAppSelector} from '../../../hooks/redux';
import {libraryApi} from '../../../store/api/library-api';
import {DataTestId, PlugMessages} from '../../../types/constants/constants';
import {BookCard} from '../../main/book-list/book-card/book-card';

import classes from './profile-history.module.scss';

export const ProfileHistory = () => {

    const {user} = useAppSelector(state => state.userReducer);

    const {data: allBooks} = libraryApi.useGetAllBooksQuery();
    const {data: categories} = libraryApi.useGetBookCategoriesQuery();

    return (<div className={classes.slider}>
            {user?.history.books ?
            <Swiper
                modules={[A11y, Pagination]}
                pagination={{clickable: true}}
                className={classes.swiperWrapper}
                spaceBetween={30}
                slidesPerView={4}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1110: {
                        slidesPerView: 4,
                    },
                }}
                watchSlidesProgress={true}
            >
                {user?.history.books.map((book) => {
                    const userComment = user.comments.find((comment) => comment.bookId === book.id);

                    return (
                        <SwiperSlide key={book.id} className={classes.slideItem} data-test-id={DataTestId.HistorySlide}>
                            <BookCard cardView={true} book={book} fromHistory={true} userComment={userComment}/>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            : <Plug title={PlugMessages.history} dataTestId={DataTestId.EmptyBlueCard}/>}
        </div>
    );
};
