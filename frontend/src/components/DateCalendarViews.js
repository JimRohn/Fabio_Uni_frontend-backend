import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function DateCalendarViews({ onDateClick }) {
    const handleDateChange = (date) => {
        if (onDateClick) {
            onDateClick(date);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                defaultValue={dayjs('2024-07-10')}
                views={['year', 'month', 'day']}
                onChange={handleDateChange}
            />
        </LocalizationProvider>
    );
}
