import React from 'react'

import classes from './search-highlight.module.scss'

export const Highlight = (props: { filter: string; title: string }) => {
    const {filter, title} = props;

    const i = title.toLowerCase().indexOf(filter.toLowerCase());
    const lightText = title.substring(i,i + filter.length)
    const firstPart = i !== 0 ? title.slice(0, i) : '';
    const secondPart = i + filter.length === title.length ? '' : title.slice(i + filter.length);


    return <React.Fragment>{firstPart}<span
        className={classes.highlight} data-test-id='highlight-matches'
    >{lightText}</span>{secondPart}</React.Fragment>
}
