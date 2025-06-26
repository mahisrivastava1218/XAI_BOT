import {Box,Grid,Stack, Typography, useMediaQuery,IconButton} from "@mui/material";
import Slider from "../Slider/Slider";
import CommunicationSider from "./CommunicationSlider";
import { useOutletContext } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Navbar(){
    const isMobile = useMediaQuery('(max-width:800px');
    const { handleMobileMenu } = useOutletContext();
    const {toggleTheme,mode}=useOutletContext();
    return(
        <Stack component={'header'} style={{padding:{
            xs:2,
            md:3
        }}} justifyContent={'space-between'} direction={'row'} alignItems={'center'} spacing={2}>
           <Stack direction={'row'}  alignItems={'center'} spacing={2} >
              {isMobile && (
                <MenuIcon onClick={()=>handleMobileMenu((prev)=>!prev)} />
              )
              } 
              <Link to={'/'} style={{textDecoration:"none"}}>
              <Typography variant="h1" component={'h1'}>
                Bot AI
              </Typography>
              </Link>
            </Stack>
              <Stack alignItems={'center'} gap={0.2} direction={'row'}>
                 <Typography variant="h4">
                {mode === "Light" ? "Light" : "Dark"}   
              <IconButton onClick={toggleTheme} color="inherit">
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
             </IconButton>
              </Typography>
             </Stack>
        </Stack>
    )
}