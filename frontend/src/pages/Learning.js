import {  Grid, Typography } from "@mui/material";
import CourseCard from "../components/CourseCard";
import courses from "../data.json";
import React from "react";
import Box from "@mui/material/Box";


const Learning = () => (
  <Box   component="main" marginLeft={'500'}
  sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, }}>


 
        {" "}
        {/*The Container component centres the content horizontally */}
        {courses.map((course) => (
          <>
        
            <Typography
              variant="h4"
              component="h2"
              marginTop={0}
              marginBottom={3}
            >
              Top {course.type} Courses
            </Typography>
            <Grid container spacing={4} marginBottom={18} marginTop={0}>
              {course.course_list.map((course, index) => 
                <CourseCard  course={course} key={index} />
              )}
            </Grid>
          </>
        ))}
    </Box>
);
export default Learning;