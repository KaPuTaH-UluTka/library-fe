import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import dayjs, {Dayjs} from 'dayjs';

import ArrowDown from '../../assets/calendar/arrowDown.svg';
import ArrowUp from '../../assets/calendar/arrowUp.svg';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {libraryApi} from '../../store/api/library-api';
import {BookInterface} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
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

    const [createBooking] = libraryApi.useCreateBookingMutation();
    const [updateBooking] = libraryApi.useUpdateBookingMutation();

    const isBookedByUser = selectedBook?.booking?.customerId === user?.id

    const [currentMonth, setCurrentMonth] = useState(getMonthMatrix());
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [selectedDay, setSelectedDay] = useState(
        isBookedByUser ? dayjs(selectedBook?.booking?.dateOrder).locale('ru') : null
    );
    console.log(selectedDay);
    const {bookId} = useParams();

    const changeSelectedDay = (day: Dayjs) => {
        setSelectedDay(day)
    }

    const upMonthIndex = () => {
        setMonthIndex(monthIndex + 1)
    }
    const downMonthIndex = () => {
        setMonthIndex(monthIndex - 1)
    }

    const selectDayHandler = () => {
        console.log('day');
    }

    const cancelBookingHandler = () => {

    }

    const closeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsModalOpen(false);
    }

    useEffect(() => {
        setCurrentMonth(getMonthMatrix(monthIndex))
    }, [monthIndex])

    return (
        <BookModalLayout clickEvent={(e) => closeHandler(e)}
                         wrapperTestId={DataTestId.ModalRateBook}>
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
                        onClick={selectDayHandler}
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
                            className={classes.submitBtn}
                            data-test-id={DataTestId.BookingCancelButton}
                    >Отменить бронь</button>
                )}
            </div>
        </BookModalLayout>
    )
}
