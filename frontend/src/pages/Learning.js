import React from 'react';
import CourseCard from '../components/CourseCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const Learning = () => {
  const courses = [
    {
      title: 'AI Course for Lawyers',
      date: '26 May 2024',
      image: '/images/courses/AI_Law.jpeg',
      progress: 50,
      avatar: '/images/avatar/14.png'
    },
    {
      title: 'Data Management',
      date: '26 May 2024',
      image: '/images/courses/GDPR.jpeg',
      progress: 70,
      avatar: '/images/avatar/14.png'
    },
    {
      title: 'Jira Training',
      date: '26 May 2024',
      image: '/images/courses/JiraCourse.jpeg',
      progress: 30,
      avatar: '/images/avatar/14.png'
    },
    {
      title: 'Office Training',
      date: '26 May 2024',
      image: '/images/courses/MicrosoftOffice.png',
      progress: 90,
      avatar: '/images/avatar/14.png'
    }
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h2" marginTop={0} marginBottom={3}>
          Welcome to your learning dashboard!
        </Typography>
      </Box>
      <Grid container spacing={6} justifyContent="flex-start">
        {courses.map((course, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} sx={{ maxWidth: '100%' }}>
            <CourseCard 
              title={course.title}
              date={course.date}
              image={course.image}
              progress={course.progress}
              avatar={course.avatar}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Learning;
