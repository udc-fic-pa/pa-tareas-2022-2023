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

const isoDate = date => date.toISOString().split("T")[0];

DateSelector.propTypes = {
    selectProps: PropTypes.object
};

export default DateSelector;
