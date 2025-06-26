import Navbar from "../../components/Navbar/Navbar";
import { Box, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box height={'100vh'} justify-content={'space-between'} background={'blue'} >
     <Navbar background={'green'}/>
    </Box>
  );
}
