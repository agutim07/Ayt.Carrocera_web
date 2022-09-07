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

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import Axios from 'axios';

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

const EventosCard = ({onChange, card}) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [openBorrar, setOpenBorrar] = useState(false);
    const handleCloseBorrar = () => {
        setOpenBorrar(false);
    };
    const handleSubmitBorrar = () => {
        Axios.delete("https://ayuntamientocarrocera.herokuapp.com/api/events/"+card.id).then(() => {
            setOpenBorrar(false);
            onChange("borrar");
        });
    };

    const extractFecha = (date) => {
        let dia;
        if(date.slice(8,9)==='0'){
            dia = date.slice(9,10);
        }else{
            dia = date.slice(8,10);
        }
        let fecha = dia + ' de '  + getMes(date.slice(5,7)) + ', ' + date.slice(0,4);
        return fecha;
    }

    const getMes = (mes) => {
        switch (mes){
            case '01': return "Enero";
            case '02': return "Febrero";
            case '03': return "Marzo";
            case '04': return "Abril";
            case '05': return "Mayo";
            case '06': return "Junio";
            case '07': return "Julio";
            case '08': return "Agosto";
            case '09': return "Septiembre";
            case '10': return "Octubre";
            case '11': return "Noviembre";
            case '12': return "Diciembre";
            default : return "";
        }
    }

    return(
        <div>
        <Card elevation={12} sx={{minWidth:500}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                        <CalendarMonthIcon />
                    </Avatar>
                }
                subheader={extractFecha(card.fecha)}
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
            <CardContent>
                <Typography gutterBottom sx={{fontWeight:'bold',fontSize:{xs:15,sm:18}}} component="div">
                {card.title}
                </Typography>
                {(card.doc !== '') ? (
                <Button2 sx={{mt:1}} onClick={() => window.open(card.doc, '_blank', 'noopener,noreferrer')} variant="contained" startIcon={<PictureAsPdfIcon />} endIcon={<DownloadForOfflineIcon />}>
                    Documento
                </Button2>
                ) : ""}
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CardActions>
                    <Button variant="contained" onClick={() => setOpenBorrar(true)} startIcon={<DeleteIcon />}>Borrar</Button>
                </CardActions>
            </div>
            {(card.content !== '') ? (
                <div>
                <CardActions disableSpacing>
                <Grid container justifyContent="flex-end">
                <Button sx={{color:'white'}} onClick={() => handleExpandClick()} endIcon={expanded ? <ExpandLess sx={{color:'white'}} /> : <ExpandMore sx={{color:'white'}}/>} >
                    LEER MÁS
                </Button>
                </Grid>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography>
                        {card.content}
                    </Typography>
                    </CardContent>
                </Collapse>
                </div>
            ) : ""}
        </Card>

        <Box sx={{ position: "absolute", bottom: 20, right: 20 }} >
        <Dialog fullWidth="300px" sx={{ width: "50" }} open={openBorrar} onClose={handleCloseBorrar} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title"> ¿Estás seguro? </DialogTitle>
            <DialogContent>
                Esta acción no tiene marcha atrás.
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmitBorrar}> <strong>SI</strong> </Button>
                <Button onClick={handleCloseBorrar}> NO </Button>
            </DialogActions>
        </Dialog>
        </Box>
        </div>
    );
}

export default EventosCard;