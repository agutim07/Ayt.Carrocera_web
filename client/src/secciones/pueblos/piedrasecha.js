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
import FacebookIcon from '@mui/icons-material/Facebook';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CastleIcon from '@mui/icons-material/Castle';
import CottageIcon from '@mui/icons-material/Cottage';
import HikingIcon from '@mui/icons-material/Hiking';

import {piedrasecha0, calderones0, calderones1, calderones2, calderones3, calderones4} from '../../data.js';

const Chip = styled(Chip2)({
    borderColor: 'black',
    "& .MuiChip-icon": {
        color: 'black'
    },
    "& .MuiChip-iconSmall": {
        color: 'black'
    }
});

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const ButtonHover = styled(Button)({
    '&:hover': {
        backgroundColor: 'white',
        color: 'black'
    }
});

export const Calderones = () => {
    return(
        <Card sx={{ maxWidth: "80%", m:2, border:1, borderColor: 'black'}}>
            <CardMedia
                component="img"
                image="/images/calderones0.jpg"
            />
            <CardContent display="flex" justifyContent="center">
                <Typography align="center" gutterBottom variant="h5" component="div">
                <Box sx={{ fontWeight: 'bold'}}>Ruta de los calderones</Box>
                </Typography>
                <Typography align="center" variant="subtitle1">
                {calderones0}
                </Typography>
                <Grid container sx={{my:2}} direction="row" justifyContent="center" alignItems="center">
                <Box component="img" sx={{ objectFit: 'cover', borderRadius: '16px', maxWidth: "90%"}} src="/images/calderones1.jpg"/>
                </Grid>
                <Typography align="center" variant="subtitle1">
                {calderones1}
                </Typography>
                <Grid container sx={{my:2}} direction="row" justifyContent="center" alignItems="center">
                <Box component="img" sx={{ objectFit: 'cover', borderRadius: '16px', maxWidth: "90%"}} src="/images/calderones2.jpg"/>
                </Grid>
                <Typography align="center" variant="subtitle1">
                {calderones2}
                </Typography>
                <Grid container sx={{my:2}} direction="row" justifyContent="center" alignItems="center">
                <Box component="img" sx={{ objectFit: 'cover', borderRadius: '16px', maxWidth: "90%"}} src="/images/calderones3.jpg"/>
                </Grid>
                <Typography align="center" variant="subtitle1">
                {calderones3}
                </Typography>
                <Grid container sx={{my:2}} direction="row" justifyContent="center" alignItems="center">
                <Box component="img" sx={{ objectFit: 'cover', borderRadius: '16px', maxWidth: "90%"}} src="/images/calderones4.jpg"/>
                </Grid>
                <Typography align="center" variant="subtitle1">
                {calderones4}
                </Typography>
                <Grid container spacing={0} sx={{mt:3, mb:2}} direction="row" alignItems="center" justifyContent="center">
                    <ButtonHover onClick={() => window.open("https://es.wikiloc.com/rutas-senderismo/piedrasecha-cueva-de-las-palomas-y-ermita-del-manadero-desfiladero-de-los-calderones-santa-marta-co-14815290", '_blank', 'noopener,noreferrer')} sx={{ bgcolor:"#298A08"}} variant="contained" startIcon={<HikingIcon />}>
                        Mapa de la Ruta 
                    </ButtonHover>
                </Grid>
            </CardContent>
        </Card>
    );
}

const Piedrasecha = () => {

    function redirect(to){
        if(to==="location"){window.open("https://goo.gl/maps/LVET9uSJfrJArJvK8", '_blank', 'noopener,noreferrer');}
    }

    const images = ['/images/piedrasecha0.jpg', '/images/piedrasecha1.jpg', '/images/piedrasecha2.jpg', '/images/piedrasecha3.jpg', '/images/piedrasecha4.jpg']

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
                    <Typography sx={{color: 'orange', fontWeight: 'bold', fontSize: {xs:35,sm:45}}}>PIEDRASECHA</Typography>
                </Grid>
                <Grid container spacing={0.5} sx={{mt:1}} direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={6} sm={5.5} align="right" alignItems="center" justifyContent="right" alignText="right">
                    <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'right', alignText: 'right', flexWrap: 'wrap'}}>
                        <PeopleIcon sx={{ mr:1, fontSize: "30px" }}/>
                        <Typography display="inline" align="right">
                            12 habitantes
                        </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={3.5} sm={6.5} align="center" alignText="center">
                    <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', alignText: 'left', flexWrap: 'wrap'}}>
                        <Divider sx={{ml:{ xs: 1, sm: 3 }, mr: { xs: 1, sm: 3 }, bgcolor:"black"}} orientation="vertical" variant="middle" flexItem />
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <IconButton sx={{mr:1}} onClick={() => redirect("location")}> 
                        <PlaceIcon sx={{ fontSize: "30px", color: 'black' }}/>
                        </IconButton>
                        <Typography sx={{ display: { xs: 'none', md: 'inline' }}} display="inline" align="left">
                            Localización
                        </Typography>
                        </div>
                    </div>
                    </Grid>  
                </Grid>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignText: 'center', flexWrap: 'wrap'}}>
                <Paper elevation={6} sx={{backgroundSize: "cover", backgroundImage: `url(${img})`, mt:2 , width: "80%", height:{xs: 200, sm:300, md:400}}} >
                        <IconButton sx={{justifyContent:"flex-end"}} onClick={() => nextImage("down")}> 
                            <ChevronLeftIcon sx={{ fontSize: "30px", color: 'white' }}/>
                        </IconButton>
                        <IconButton sx={{justifyContent:"flex-end"}} onClick={() => nextImage("up")}> 
                            <ChevronRightIcon sx={{ fontSize: "30px", color: 'white' }}/>
                        </IconButton>
                </Paper>
                <Box sx={{mt:2, width:"80%"}}>
                <Typography variant="subtitle1">
                    {piedrasecha0}
                </Typography>
                </Box> 
                </div>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                <ThemeProvider theme={darkTheme}>
                <Calderones />
                </ThemeProvider>
                </Grid>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                <Card sx={{ backgroundImage: "linear-gradient(180deg, rgba(41,212,87,100) 20%, rgba(255,209,0,0.2945553221288515) 58%)", maxWidth: "80%", m:2 , border:1, borderColor: 'black',  borderRadius: '9px'}}>
                    <CardContent display="flex" justifyContent="center">
                        <Typography align="center" gutterBottom variant="h5" component="div">
                        <Box sx={{ fontWeight: 'bold'}}>Fiestas</Box>
                        </Typography>
                        <Typography align="center" variant="subtitle1">
                        Santos Justo y Pastor, último fin de semana de Agosto. 
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
            </Box>
        </Box>
    );
}

export default Piedrasecha;