import { AccessTime } from "@mui/icons-material";
import { Grid, Paper, Typography, Box,  } from "@mui/material";

const CourseCard = ({course}) => {
  return (
    
    <Grid item xs={4} >
      <Paper elevation={3} variant="elevation">
        <img src={course.image} alt="course" className="img" />
        <Box padding={1}>
          
          <Typography variant="subtitle1" component="h2">
            {course.name}
          </Typography>
        </Box>
        <Box padding={1} sx={{display:"flex"}} >
        <AccessTime sx={{width:"12.5"}}/>
            <Typography variant="body2" component="p" marginLeft={0.5}>
                {course.duration} hours
            </Typography>
        </Box>
       
        
      </Paper>
    </Grid>
  

    );

};
export default CourseCard;
