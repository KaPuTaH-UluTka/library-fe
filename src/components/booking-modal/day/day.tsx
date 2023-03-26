import classNames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'

import {DataTestId} from '../../../types/constants/data-test-id';
import { isCurrentDay, isCurrentOrNextDay, isWeekend } from '../../../utils/dayjs'

import classes from './day.module.scss'

type DayProps = {
    day: Dayjs;
    row: number;
    monthIndex: number;
    changeSelectedDay: (day: Dayjs) => void;
    selectedDay?: dayjs.Dayjs | null;
}

export const Day = ({ day, monthIndex, row, changeSelectedDay, selectedDay }: DayProps) => {
    const clickHandler = (dayForCheck: Dayjs) => {
        if (isCurrentOrNextDay(day)) {
            changeSelectedDay(dayForCheck);
        }
    }

    return (
        <div
            className={classNames(classes.dayWrapper)}
            onClick={() => clickHandler(day)}
            role='presentation'
            data-test-id={DataTestId.DayButton}
        >
            {row === 0 && <span className={classes.dayWeek}>{day.format('dd').toUpperCase()}</span>}
            <span
                className={classNames(classes.number, {
                    [classes.selectable]: isCurrentOrNextDay(day),
                    [classes.weekend]: isWeekend(day, monthIndex),
                    [classes.currentDay]: isCurrentDay(day),
                    [classes.selectedDay]: day.format('DD/MM/YYYY') === selectedDay?.format('DD/MM/YYYY'),
                })}
            >
        {day.format('DD')}
      </span>
        </div>
    )
}
