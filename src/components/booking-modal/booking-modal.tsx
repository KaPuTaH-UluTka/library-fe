import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import dayjs, {Dayjs} from 'dayjs';

import ArrowDown from '../../assets/calendar/arrowDown.svg';
import ArrowUp from '../../assets/calendar/arrowUp.svg';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {libraryApi} from '../../store/api/library-api';
import {
    setBookingCancelResponseErrorTrue,
    setBookingCancelResponseSuccessTrue,
    setBookingCreateResponseErrorTrue,
    setBookingCreateResponseSuccessTrue, setBookingUpdateResponseErrorTrue,
    setBookingUpdateResponseSuccessTrue,
    setLoadingFalse,
    setLoadingTrue
} from '../../store/reducers/request-status-reducer';
import {BookInterface} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
import {
    BookingRequest,
} from '../../types/booking';
import {DataTestId} from '../../types/constants/constants';
import {getMonthMatrix, getYear} from '../../utils/dayjs';
import {BookModalLayout} from '../book-modal-layout/book-modal-layout';

import {Day} from './day/day';

import classes from './booking-modal.module.scss'

interface CalendarProps {
    selectedBook: BookInterface | BookCardInterface;
    setIsModalOpen: (isModalOpen: boolean) => void;
}

export const BookingModal = ({selectedBook, setIsModalOpen}: CalendarProps) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.userReducer);
    const {isRequestFetching} = useAppSelector(state => state.requestStatusReducer);

    const [createBooking, {
        isLoading: createIsLoading,
        isError: createIsError,
        isSuccess: createIsSuccess
    }] = libraryApi.useCreateBookingMutation();
    const [updateBooking, {
        isLoading: updateIsLoading,
        isError: updateIsError,
        isSuccess: updateIsSuccess
    }] = libraryApi.useUpdateBookingMutation();
    const [cancelBooking, {
        isLoading: cancelIsLoading,
        isError: cancelIsError,
        isSuccess: cancelIsSuccess
    }] = libraryApi.useCancelBookingMutation();

    const isBookedByUser = selectedBook?.booking?.customerId === user?.id;

    const [currentMonth, setCurrentMonth] = useState(getMonthMatrix());
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [selectedDay, setSelectedDay] = useState(
        isBookedByUser ? dayjs(selectedBook?.booking?.dateOrder).locale('ru') : null
    );

    const changeSelectedDay = (day: Dayjs) => {
        setSelectedDay(day);
    }

    const upMonthIndex = () => {
        setMonthIndex(monthIndex + 1);
    }
    const downMonthIndex = () => {
        setMonthIndex(monthIndex - 1);
    }

    const submitBookingHandler = () => {
        const requestData: BookingRequest = {
            data: {
                book: selectedBook.id,
                customer: user!.id.toString(),
                dateOrder: selectedDay!.format(),
                order: true,
            },
        }

        if (isBookedByUser) {
            const bookingId = selectedBook.booking!.id.toString();

            updateBooking({bookingId, data: requestData});
        } else {
            createBooking(requestData);
        }
    }

    const cancelBookingHandler = () => {
        cancelBooking(selectedBook.booking!.id.toString());
    }

    const closeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsModalOpen(false);
    }

    useEffect(() => {
        if (createIsSuccess && !isRequestFetching) {
            dispatch(setBookingCreateResponseSuccessTrue());
            setIsModalOpen(false);
        }
        if (createIsError && !isRequestFetching) {
            dispatch(setBookingCreateResponseErrorTrue());
            setIsModalOpen(false);
        }
        if (updateIsSuccess && !isRequestFetching) {
            dispatch(setBookingUpdateResponseSuccessTrue());
            setIsModalOpen(false);
        }
        if (updateIsError && !isRequestFetching) {
            dispatch(setBookingUpdateResponseErrorTrue());
            setIsModalOpen(false);
        }
        if (cancelIsSuccess && !isRequestFetching) {
            dispatch(setBookingCancelResponseSuccessTrue());
            setIsModalOpen(false);
        }
        if (cancelIsError && !isRequestFetching) {
            dispatch(setBookingCancelResponseErrorTrue());
            setIsModalOpen(false);
        }
        if (createIsLoading || updateIsLoading || cancelIsLoading) {
            dispatch(setLoadingTrue());
        } else {
            dispatch(setLoadingFalse());
        }
        setCurrentMonth(getMonthMatrix(monthIndex));
    }, [cancelIsError, cancelIsLoading, cancelIsSuccess, createIsError,
        createIsLoading, createIsSuccess, dispatch, isRequestFetching, monthIndex,
        setIsModalOpen, updateIsError, updateIsLoading, updateIsSuccess])

    return (
        <BookModalLayout clickEvent={closeHandler}
                         wrapperTestId={DataTestId.BookingModal}>
            <div className={classes.bookingModal}>
                <h2 className={classes.title} data-test-id={DataTestId.ModalTitle}>
                    {isBookedByUser ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}
                </h2>
                <div className={classes.calendar} data-test-id={DataTestId.Calendar}>
                    <nav className={classes.navigation}>
                        <div className={classes.selectMonth} data-test-id={DataTestId.MonthSelect}>
                            {getYear(monthIndex)}
                        </div>
                        <div className={classes.changeMonthWrapper}>
                            <img
                                src={ArrowUp}
                                alt='up'
                                role='presentation'
                                onClick={downMonthIndex}
                                data-test-id={DataTestId.ButtonPrevMonth}
                            />
                            <img
                                src={ArrowDown}
                                alt='down'
                                role='presentation'
                                onClick={upMonthIndex}
                                data-test-id={DataTestId.ButtonNextMonth}
                            />
                        </div>
                    </nav>

                    <div className={classes.dayMatrix}>
                        {currentMonth.map((row: Dayjs[], i: number) => (
                            <React.Fragment key={Math.random() + 1}>
                                {row.map((day: Dayjs) => (
                                    <Day
                                        day={day}
                                        key={Math.random() + 1}
                                        row={i}
                                        monthIndex={monthIndex}
                                        changeSelectedDay={changeSelectedDay}
                                        selectedDay={selectedDay}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <button type="submit"
                        onClick={submitBookingHandler}
                        className={classes.submitBtn}
                        disabled={
                            !selectedDay ||
                            (selectedDay.isSame(dayjs(selectedBook?.booking?.dateOrder).locale('ru')) &&
                                isBookedByUser)
                        }
                        data-test-id={DataTestId.BookingButton}
                >Забронировать
                </button>
                {isBookedByUser && (
                    <button type="submit"
                            onClick={cancelBookingHandler}
                            className={classNames(classes.submitBtn, classes.cancelBooking)}
                            data-test-id={DataTestId.BookingCancelButton}
                    >Отменить бронь</button>
                )}
            </div>
        </BookModalLayout>
    )
}
