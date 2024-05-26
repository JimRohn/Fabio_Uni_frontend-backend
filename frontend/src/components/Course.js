import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Get the current date
  const currentDate = new Date().toLocaleDateString("en-GB", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src="/images/avatars/avatar1.jpg" // Path to your avatar image
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="AI Course for Lawyers"
        subheader={currentDate}
      />
      <CardMedia
        component="img"
        height="194"
        image="/images/courses/AI_Law.jpeg"
        alt="AI Course"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Progress
        </Typography>
        <LinearProgress variant="determinate" value={50} sx={{ marginBottom: 2 }} />
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          50%
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="outlined" size="small" sx={{ marginRight: 'auto' }}>Start Over</Button>
        <Button variant="contained" size="small">Continue</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Course Overview:</Typography>
          <Typography paragraph>
            This AI course for lawyers aims to provide legal professionals with an understanding of artificial intelligence and its applications in the legal field. The course covers topics such as AI ethics, legal AI tools, and the impact of AI on the legal profession.
          </Typography>
          <Typography paragraph>
            <strong>Course Content:</strong>
            <ul>
              <li>Introduction to AI and Machine Learning</li>
              <li>AI Ethics and Legal Implications</li>
              <li>AI Tools for Legal Research</li>
              <li>Case Studies: AI in Practice</li>
              <li>Future Trends in Legal AI</li>
            </ul>
          </Typography>
          <Typography paragraph>
            <strong>Learning Outcomes:</strong>
            <ul>
              <li>Understand the basics of AI and its applications</li>
              <li>Recognize ethical considerations related to AI</li>
              <li>Utilize AI tools for enhanced legal research</li>
              <li>Analyze real-world AI applications in the legal field</li>
              <li>Anticipate future trends and their potential impact on law</li>
            </ul>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
