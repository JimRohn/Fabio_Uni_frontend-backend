import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DateCalendarViews from '../components/DateCalendarViews';
import EventCard from '../components/EventCard';
import dayjs from 'dayjs';

const events = {
  '2024-07-30': [
    {
      title: 'Case ABC Court Hearing',
      location: 'London Crown Court Magistrates, Holloway Road',
      description: 'A court hearing for case ABC.',
    },
  ],
  // Add more events if needed
};

function Events() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    if (date.month() === 6 && date.year() === 2024) { // July is month 6 (0-indexed)
      setSelectedDate(date);
    }
  };

  const renderEvents = (date) => {
    const dateString = date.format('YYYY-MM-DD');
    if (events[dateString]) {
      return events[dateString].map((event, index) => (
        <EventCard key={index} event={event} />
      ));
    }
    return (
      <EventCard
        event={{
          title: 'No Events',
          location: '',
          description: 'No events planned today.',
        }}
      />
    );
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="flex-start" minHeight="100vh" padding={2}>
      <Box flex="1" maxWidth="400px">
        <Typography variant="h4" gutterBottom>
             Events Calendar
        </Typography>
        <DateCalendarViews onDateClick={handleDateClick} />
      </Box>
      <Box flex="2" paddingLeft={4} display="flex" flexDirection="column" alignItems="center">
        {selectedDate && (
          <>
            <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>
              Events for {selectedDate.format('MMMM D, YYYY')}
            </Typography>
            <Box>{renderEvents(selectedDate)}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Events;
