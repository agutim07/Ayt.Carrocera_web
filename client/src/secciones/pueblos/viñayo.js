import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Chip2 from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SpeedDial from '@mui/material/SpeedDial';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Cancel';
import CardMedia from '@mui/material/CardMedia';
import PeopleIcon from '@mui/icons-material/People';
import Divider from '@mui/material/Divider';
import PlaceIcon from '@mui/icons-material/Place';
import WebIcon from '@mui/icons-material/Language';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CottageIcon from '@mui/icons-material/Cottage';

import {viñayo0} from '../../data.js';

const Chip = styled(Chip2)({
    borderColor: 'black',
    "& .MuiChip-icon": {
        color: 'black'
    },
    "& .MuiChip-iconSmall": {
        color: 'black'
    }
});

const Viñayo = () => {

    function redirect(to){
        if(to==="location"){window.open("https://goo.gl/maps/B8H31DmFgXa2B2abA", '_blank', 'noopener,noreferrer');}
        if(to==="web"){window.open("https://vinayo.wordpress.com/", '_blank', 'noopener,noreferrer');}
    }

    const images = ['/images/viñayo0.jpg', '/images/viñayo1.jpg', '/images/viñayo2.jpg']

    const [image, setImage] = React.useState(0);
    const [img, setImg] = React.useState(images[0]);
    
    function nextImage(move){
        let newNum;
        if(move==="up"){
            newNum = image+1;
            if(newNum>=images.length) newNum = 0;
        }else if(move==="down"){
            newNum = image-1;
            if(newNum<0) newNum = (images.length-1);
        }
        setImage(newNum);
        setImg(images[newNum]);
    }

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}><Box sx={{width:"100%", mb:3}}>
                <Grid container spacing={0} sx={{mt:2}} direction="row" alignItems="center" justifyContent="center">
                    <Typography sx={{color: 'orange', fontWeight: 'bold', fontSize: 45}}>VIÑAYO</Typography>
                </Grid>
                <Grid container spacing={0.5} sx={{mt:1}} direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={6} sm={4.5} align="right" alignItems="center" justifyContent="right" alignText="right">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', alignText: 'right', flexWrap: 'wrap'}}>
                        <PeopleIcon sx={{ mr:1, fontSize: "30px" }}/>
                        <Typography display="inline" align="right">
                            43 habitantes
                        </Typography>
                    </div>
                    </Grid>
                    <Grid item xs={3.5} sm={3} align="center" alignText="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignText: 'center', flexWrap: 'wrap'}}>
                        <Divider sx={{mr: { xs: 1, sm: 3 }, bgcolor:"black"}} orientation="vertical" variant="middle" flexItem />
                        <IconButton sx={{mr:1}} onClick={() => redirect("location")}> 
                        <PlaceIcon sx={{ fontSize: "30px", color: 'black' }}/>
                        </IconButton>
                        <Typography sx={{ display: { xs: 'none', md: 'inline' }}} display="inline" align="center">
                            Localización
                        </Typography>
                        <Divider sx={{ml: { xs: 0, sm: 3 }, bgcolor:"black"}} orientation="vertical" variant="middle" flexItem />
                    </div>
                    </Grid> 
                    <Grid item xs={2.5} sm={4.5}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <IconButton sx={{mr:1}} onClick={() => redirect("web")}> 
                        <WebIcon sx={{ fontSize: "30px", color: 'black' }}/>
                        </IconButton>
                        <Typography sx={{ display: { xs: 'none', md: 'inline' }}} display="inline" align="left">
                            Web
                        </Typography>
                    </div>
                    </Grid> 
                </Grid>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignText: 'center', flexWrap: 'wrap'}}>
                <Paper elevation={6} sx={{backgroundSize: "cover", backgroundImage: `url(${img})`, mt:2 , width: "80%", height:{xs: 200, sm:300, md:400}}} >
                        <IconButton sx={{justifyContent:"flex-end"}} onClick={() => nextImage("down")}> 
                            <ChevronLeftIcon sx={{ fontSize: "30px", color: 'black' }}/>
                        </IconButton>
                        <IconButton sx={{justifyContent:"flex-end"}} onClick={() => nextImage("up")}> 
                            <ChevronRightIcon sx={{ fontSize: "30px", color: 'black' }}/>
                        </IconButton>
                </Paper>
                <Box sx={{mt:2, width:"80%"}}>
                <Typography variant="subtitle1">
                    {viñayo0}
                </Typography>
                </Box> 
                </div>
                <Grid container sx={{mt:3}} direction="row" justifyContent="center" alignItems="center">
                <Card sx={{ backgroundImage: "linear-gradient(180deg, rgba(41,212,87,100) 20%, rgba(255,209,0,0.2945553221288515) 58%)",maxWidth: "80%", m:2 , border:1, borderColor: 'black',  borderRadius: '9px'}}>
                    <CardContent display="flex" justifyContent="center">
                        <Typography align="center" gutterBottom variant="h5" component="div">
                        <Box sx={{ fontWeight: 'bold'}}>Fiestas</Box>
                        </Typography>
                        <Typography align="center" variant="subtitle1">
                        Octava de Corpus, Miércoles siguiente al día de Corpus.
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
            </Box>
        </Box>
    );
}

export default Viñayo;