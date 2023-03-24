import React, {useState} from 'react';
import {A11y, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {Plug} from '../../../components/plug/plug';
import {useAppSelector} from '../../../hooks/redux';
import {DataTestId, PlugMessages} from '../../../types/constants/constants';
import {CommentShort} from '../../../types/review';
import {BookCard} from '../../main/book-list/book-card/book-card';
import {mockedUser} from '../mocked-user';

import classes from './profile-history.module.scss';
import {ReviewModal} from '../../../components/review-modal/review-modal';

export const ProfileHistory = () => {

    // const {user} = useAppSelector(state => state.userReducer);

    const user = mockedUser;

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const newCommentHandler = (bookId?: string | null) => {
        if (bookId) { /* empty */
        }
    };

    const updateCommentHandler = (comment: CommentShort, bookId?: string | null) => {
        if (bookId && comment) { /* empty */
        }
    };

    return (<div className={classes.slider}>
            { user?.history.books ?
            <Swiper
                modules={[A11y,Pagination]}
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
                data-test-id={DataTestId.History}
                watchSlidesProgress={true}
            >
                {user?.history.books.map((book) => {
                    const userComment = user.comments.find((comment) => comment.bookId === book.id);

                    return (
                        <SwiperSlide key={book.id} className={classes.slideItem} data-test-id={DataTestId.HistorySlide}>
                            <BookCard cardView={true} book={user.booking.book} wide={true} setIsReviewModalOpen={setIsReviewModalOpen}/>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            : <Plug title={PlugMessages.history}/>}
            {isReviewModalOpen && <ReviewModal setIsModalOpen={setIsReviewModalOpen}/>}
        </div>
    );
};
