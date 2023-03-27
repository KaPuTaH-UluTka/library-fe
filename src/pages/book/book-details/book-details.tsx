import React from 'react';

import {BookInterface} from '../../../types/book';

import classes from './book-details.module.scss';

export const BookDetails = (props: { book: BookInterface }) => (
        <div className={classes.detailedInfo}>
            <h5 className={classes.title}>Подробная информация</h5>
            <table className={classes.tableWrapper}>
                <tbody className={classes.table}>
                <tr className={classes.tableTr}>
                    <td className={classes.tdItem}>Издательство
                    </td>
                    <td className={classes.tdItem}>Год
                        издания
                    </td>
                    <td className={classes.tdItem}>Страниц
                    </td>
                    <td className={classes.tdItem}>Переплёт
                    </td>
                    <td className={classes.tdItem}>Формат
                    </td>
                </tr>
                <tr className={classes.tableTr}>
                    <td className={classes.tdItem}>
                        <span>{props.book.publish}</span>
                    </td>
                    <td className={classes.tdItem}>
                        <span>{props.book.issueYear}</span></td>
                    <td className={classes.tdItem}>
                        <span>{props.book.pages}</span>
                    </td>
                    <td className={classes.tdItem}>
                        <span>{props.book.cover}</span>
                    </td>
                    <td className={classes.tdItem}>
                        <span>{props.book.format}</span>
                    </td>
                </tr>
                </tbody>
                <tbody className={classes.table}>
                <tr className={classes.tableTr}>
                    <td className={classes.tdItem}>Жанр
                    </td>
                    <td className={classes.tdItem}>Вес
                    </td>
                    <td className={classes.tdItem}>ISBN
                    </td>
                    <td className={classes.tdItem}>Изготовитель
                    </td>
                </tr>
                <tr className={classes.tableTr}>
                    <td className={classes.tdItem}>
                        <span>{props.book.categories.map(el => el)}</span>
                    </td>
                    <td className={classes.tdItem}>
                        <span>{`${props.book.weight} г.`}</span>
                    </td>
                    <td className={classes.tdItem}>
                        <span>{props.book.ISBN}</span>
                    </td>
                    <td className={classes.tdItem}>
                        <span>{props.book.producer}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
