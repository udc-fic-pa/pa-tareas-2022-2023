import PropTypes from 'prop-types';
import {FormattedDate} from 'react-intl';

const DateSelector = (selectProps) => {

    const dates = [];
    const currentDate = new Date();
    let index;
    for (index=0; index <7; index++) {
        dates[index] = addDaysToDate(currentDate, index);
    };

    return (
         
        <select {...selectProps}>

            {dates.map(date => 
                <FormattedDate value={date} key={date.getTime()}>
                    {dateAsString => (<option  value={isoDate(date)}>{dateAsString}</option>)}
                </FormattedDate>
            )}

        </select>
    );

}

const addDaysToDate = (date, days) => {
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}

const isoDate = date => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month<10?`0${month}`:`${month}`}-${day<10?`0${day}`:`${day}`}`;
}

DateSelector.propTypes = {
    selectProps: PropTypes.object
};

export default DateSelector;
