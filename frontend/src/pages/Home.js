import { Box, Container, Typography } from "@mui/material";
import QuiltedImageList from "../components/ImageCollage";

const Home = () => 

     <Container sx={{ width:800}}>
     <Typography marginTop={3} variant="h3" component="h1">Welcome to Tami-me</Typography>
     <Box marginTop={3} sx={{display:"flex" }} >
        <img src="/images/Quelted/AI14.jpeg" alt="tour" height={365} width={365} />
        
   
   <QuiltedImageList/>
     </Box>
     <Box>
<Typography variant="h4" component={"h2"} marginTop={3} marginBottom={2}>
About Tami-me
</Typography>

<Typography variant="paragraph" component={"p"}>
At Tame-me, we harness the transformative power of AI to revolutionize the way you work and live. Our mission is to empower you with intelligent solutions that seamlessly integrate into your daily routines, elevating efficiency and clarity. Imagine an assistant that not only understands your commands but also anticipates your needs—this is the magic of Tame-me.

Our state-of-the-art semantic search bar is the beating heart of our application, designed to comprehend and process your queries with unprecedented accuracy. Gone are the days of sifting through endless data; Tame-me swiftly navigates through complex databases to bring you the information you need with the precision of a seasoned expert.

Join us on this exhilarating journey as we unveil a world where technology and human ambition converge, creating a synergy that propels you towards achieving your fullest potential. Welcome to Tame-me, where your aspirations are met with our innovative spirit.
</Typography>



     </Box>
  
     </Container>
      



export default Home;