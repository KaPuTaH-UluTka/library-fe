import classNames from 'classnames';

import {DataTestId} from '../../../../types/constants/data-test-id';
import {RegistrationErrorMessages} from '../../../../types/constants/messages';

import classes from './hint-highlight.module.scss';

type HintHighlightProps = {
    dataTestId: DataTestId
    errors: string[]
    hintType: string
    isShowError: boolean
    isFullColorError?: boolean
}

export const HintHighlight = ({
                              dataTestId,
                              errors,
                              hintType,
                                  isShowError,
                                  isFullColorError,
                          }: HintHighlightProps) => (
    <>
        {hintType === 'username' && (
            <p
                className={classNames(classes.hint, { [classes.fullColor]: isFullColorError })}
                data-test-id={dataTestId}
            >
                Используйте для логина{' '}
                <span
                    className={classNames(classes.highlight, {
                        [classes.active]: errors.includes('латинский алфавит') && isShowError,
                    })}
                >
          латинский алфавит
        </span>{' '}
                и{' '}
                <span
                    className={classNames(classes.highlight, {
                        [classes.active]: errors.includes('цифры') && isShowError,
                    })}
                >
          цифры
        </span>
            </p>
        )}
        {hintType === 'password' && (
            <p
                className={classNames(classes.hint, { [classes.fullColor]: isFullColorError })}
                data-test-id={dataTestId}
            >
                Пароль{' '}
                <span
                    className={classNames(classes.highlight, {
                        [classes.active]:
                        errors.includes(RegistrationErrorMessages.atLeastEightCharacters) && isShowError,
                    })}
                >
          {RegistrationErrorMessages.atLeastEightCharacters}
        </span>
                ,{' '}
                <span
                    className={classNames(classes.highlight, {
                        [classes.active]: errors.includes(RegistrationErrorMessages.withUpperLetter) && isShowError,
                    })}
                >
          {RegistrationErrorMessages.withUpperLetter}
        </span>{' '}
                и{' '}
                <span
                    className={classNames(classes.highlight, {
                        [classes.active]: errors.includes(RegistrationErrorMessages.withNumber) && isShowError,
                    })}
                >
          {RegistrationErrorMessages.withNumber}
        </span>
            </p>
        )}
    </>
)
