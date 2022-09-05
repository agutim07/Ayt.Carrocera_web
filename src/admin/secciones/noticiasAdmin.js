import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
import ButtonGroup from '@mui/material/ButtonGroup';
import {useNavigate} from 'react-router-dom';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { orange,green } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';

import BungalowIcon from '@mui/icons-material/Bungalow';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Divider from '@mui/material/Divider';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

import { pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from "react-router-dom";

const Button2 = styled(Button)({
    backgroundColor: '#e53935',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white'
    },
    fontFamily: [
        'BlinkMacSystemFont',
    ].join(','),
});

const NoticiasAdmin = () => {
    const eventos = [
        {id:0, title: 'faFffSff', loc:'Santiago de las Villas', fecha:'9 de Septiembre, 2022', image: '/santiago3.jpg', doc:'', content: `En honor al patrón del pueblo`},
        {id:1, title: 'Fiesta de Piedrasecha', loc:'', fecha:'16 de Septiembre, 2022', image: '', doc:'/Publicación_Bando_BANDO SUBVENCIÓN MATERIAL ESCOLAR 2022_2023.pdf', content: ``}
    ]

    const [expanded, setExpanded] = React.useState([]);
    for(let i=0; i<eventos.length && expanded.length<eventos.length; i++){
        expanded.push(false);
    }

    const handleExpandClick = (num) => {
        let newEvents = expanded;
        if(!newEvents[num]){
            newEvents[num] = true;
        }else{
            newEvents[num] = false;
        }

        setExpanded([...newEvents]);
    };
    
    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
        <Grid container rowSpacing={2} columnSpacing={2} padding={1} direction="row" sx={{mt:1, mb:2}} alignItems="center">
        {eventos.map((card) => (
            <Grid item key={card.id} xs={12} sm={6}>
                <Card elevation={12}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                            <CalendarMonthIcon />
                        </Avatar>
                    }
                    subheader={card.fecha}
                />
                {(card.loc !== '') ? (
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                            <LocationOnIcon />
                        </Avatar>
                    }
                    subheader={card.loc}
                />
                ) : ""}
                {(card.image !== '') ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignText: 'center', flexWrap: 'wrap'}}>
                <CardMedia
                    sx={{width:"90%"}}
                    component="img"
                    image={card.image}
                    alt="imagen de noticia"
                /> 
                </div>) : ""}
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight:'bold',fontSize:{xs:15,sm:18}}} component="div">
                    {card.title}
                    </Typography>
                    {(card.doc !== '') ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignText: 'center', flexWrap: 'wrap'}}>
                    <Link to={card.doc} style={{ textDecoration: 'none' }} target="_blank" download>
                    <Button2 sx={{mt:1}} variant="contained" startIcon={<PictureAsPdfIcon />} endIcon={<DownloadForOfflineIcon />}>
                        Documento
                    </Button2>
                    </Link>
                    </div>
                    ) : ""}
                </CardContent>
                {(card.content !== '') ? (
                    <div>
                    <CardActions disableSpacing>
                    <Grid container justifyContent="flex-end">
                    <Button sx={{color:'black'}} onClick={() => handleExpandClick(card.id)} endIcon={expanded[card.id] ? <ExpandLess sx={{color:'black'}} /> : <ExpandMore sx={{color:'black'}}/>} >
                        LEER MÁS
                    </Button>
                    </Grid>
                    </CardActions>
                    <Collapse in={expanded[card.id]} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography>
                            {card.content}
                        </Typography>
                        </CardContent>
                    </Collapse>
                    </div>
                ) : ""}
                </Card>
            </Grid>
        ))}
        </Grid>
        </Box>
    );
}

export default NoticiasAdmin;