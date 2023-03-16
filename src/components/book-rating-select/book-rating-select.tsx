import {useState} from 'react';
import {Control, Controller} from 'react-hook-form';

import EmptyStar from '../../assets/rating-icons/Icon_star.svg';
import FilledStar from '../../assets/rating-icons/Icon_star_filled.svg';
import {DataTestId} from '../../types/constants/constants';

import classes from './book-rating-select.module.scss';

interface RatingProps  {
    control: Control<any>
}
export const BookRatingSelect = ({ control }: RatingProps) => {
    const [rating, setRating] = useState(1);

    return (
        <div className={classes.ratingWrapper} data-test-id={DataTestId.Rating}>
            {[1, 2, 3, 4, 5].map(value => (
                <label key={value} data-test-id={DataTestId.Star}>
                    <Controller
                        name='rating'
                        control={control}
                        defaultValue={1}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <input
                                type='radio'
                                value={value}
                                checked={rating === value}
                                onChange={() => {
                                    setRating(value)
                                    field.onChange(value)
                                }}
                            />
                        )}
                    />
                    {value <= rating ? (
                        <img src={FilledStar} alt='star' data-test-id={DataTestId.StarActive} />
                    ) : (
                        <img src={EmptyStar} alt='empty-star' />
                    )}
                </label>
            ))}
        </div>
    )
}
