import classNames from 'classnames';

import {DataTestId} from '../../../types/constants/data-test-id';
import {BtnType, BtnVariant, Size} from '../../../types/custom-element';

import classes from './custom-button.module.scss'

type ButtonProps = {
    type: BtnType;
    text: string;
    clickHandler: () => void;
    variant?: BtnVariant;
    size?: Size;
    isDisabled?: boolean;
    dataTestId?: DataTestId;
    className?: string;
}

export const CustomButton = ({
                           type = BtnType.button,
                           text,
                           clickHandler,
                           variant = BtnVariant.primary,
                           size = Size.small,
                           isDisabled = false,
                           dataTestId,
                           className,
                       }: ButtonProps) => (
    <button
        className={classNames(classes.btn, className && classes[className],{
            [classes.primary]: variant === BtnVariant.primary,
            [classes.secondary]: variant === BtnVariant.secondary,
            [classes.big]: size === Size.big,
            [classes.small]: size === Size.small,
        })}
        type={type === BtnType.button ? 'button' : 'submit'}
        onClick={e => {
            if (type === BtnType.button) {
                e.preventDefault();
            }
            clickHandler();
        }}
        disabled={isDisabled}
        data-test-id={dataTestId ? dataTestId : ''}
    >
        {text}
    </button>
)
