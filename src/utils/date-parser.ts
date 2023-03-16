export const dateParser = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const filter = (value: number) => value.toString().length === 1 ? 0 + value.toString() : value;

    return  `${filter(day)}.${filter(month)}`;
}
