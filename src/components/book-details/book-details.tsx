import React from 'react';

import {BookInterface} from '../../types/book';

import classes from './book-details.module.scss';

export const BookDetails = (props: { book: BookInterface }) => (
        <div className={classes['detailed-info']}>
            <h5 className={classes['detailed-info-title']}>Подробная информация</h5>
            <table className={classes['detailed-info-table-wrapper']}>
                <tbody className={classes['detailed-info-table']}>
                <tr className={classes['detailed-info-tr']}>
                    <td className={classes['detailed-info-td-item']}>Издательство
                    </td>
                    <td className={classes['detailed-info-td-item']}>Год
                        издания
                    </td>
                    <td className={classes['detailed-info-td-item']}>Страниц
                    </td>
                    <td className={classes['detailed-info-td-item']}>Переплёт
                    </td>
                    <td className={classes['detailed-info-td-item']}>Формат
                    </td>
                </tr>
                <tr className={classes['detailed-info-tr']}>
                    <td className={classes['detailed-info-td-item']}>
                        <span>{props.book.publish}</span>
                    </td>
                    <td className={classes['detailed-info-td-item']}>
                        <span>{props.book.issueYear}</span></td>
                    <td className={classes['detailed-info-td-item']}>
                        <span>{props.book.pages}</span>
                    </td>
                    <td className={classes['detailed-info-td-item']}>
                        <span>{props.book.cover}</span>
                    </td>
                    <td className={classes['detailed-info-td-item']}>
                        <span>{props.book.format}</span>
                    </td>
                </tr>
                </tbody>
                <tbody className={classes['detailed-info-table']}>
                <tr className={classes['detailed-info-tr']}>
                    <td className={classes['detailed-info-td-item']}>Жанр
                    </td>
                    <td className={classes['detailed-info-td-item']}>Вес
                    </td>
                    <td className={classes['detailed-info-td-item']}>ISBN
                    </td>
                    <td className={classes['detailed-info-td-item']}>Изготовитель
                    </td>
                </tr>
                <tr className={classes['detailed-info-tr']}>
                    <td className={classes['detailed-info-td-item']}>
                        <span>{props.book.categories.map(el => el)}</span>
                    </td>
                    <td className={classes['detailed-info-td-item']}>
                        <span>{`${props.book.weight} г.`}</span>
                    </td>
                    <td className={classes['detailed-info-td-item']}>
                        <span>{props.book.ISBN}</span>
                    </td>
                    <td className={classes['detailed-info-td-item']}>
                        <span>{props.book.producer}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
